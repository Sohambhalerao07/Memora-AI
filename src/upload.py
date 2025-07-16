from flask import Flask, request, jsonify
import boto3
import os
import uuid
import cv2
import numpy as np
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from flask_cors import CORS
from deepface import DeepFace
import firebase_admin
from firebase_admin import credentials, db

# Load .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Cloudflare R2 Config
s3 = boto3.client(
    's3',
    endpoint_url=os.getenv("R2_ENDPOINT_URL"),
    aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY")
)

# Firebase Admin Init
cred = credentials.Certificate("serviceAccountKey.json")  # 🔁 replace with your actual JSON path
firebase_admin.initialize_app(cred, {
    'databaseURL': os.getenv("FIREBASE_DB_URL")  # 🔁 add to your .env
})


@app.route("/upload", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Get gallery name from form
    gallery_name = request.form.get("galleryName", "Faces Code")

    try:
        # Read file into OpenCV image for DeepFace
        img_bytes = file.read()
        image_np = np.frombuffer(img_bytes, np.uint8)
        image_cv2 = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

        # Face detection
        detections = DeepFace.extract_faces(img_path=image_cv2, enforce_detection=False)
        print(f"🔍 Detected {len(detections)} face(s)")

        # Rewind file to upload to R2
        file.stream.seek(0)
        original_filename = secure_filename(file.filename)
        file_ext = os.path.splitext(original_filename)[1]
        unique_filename = f"{uuid.uuid4().hex}{file_ext}"
        object_key = f"uploads/{unique_filename}"

        s3.upload_fileobj(file, os.getenv("R2_BUCKET_NAME"), object_key)
        public_url = f"{os.getenv('R2_PUBLIC_URL')}/{object_key}"

        # Save to Firebase
        gallery_ref = db.reference(f"user_galleries/{gallery_name}/faces")
        
        for detection in detections:
            face_id = str(uuid.uuid4())  # ⚠️ TEMPORARY: you can later match embeddings to reuse IDs
            person_ref = gallery_ref.child(face_id)
            existing = person_ref.get()

            if existing and 'photoUrls' in existing:
                urls = existing['photoUrls']
                urls.append(public_url)
            else:
                urls = [public_url]

            person_ref.set({
                'photoUrls': urls
            })
            

        return jsonify({
            "url": public_url,
            "faces": len(detections)
        }), 200

    except Exception as e:
        print("❌ Error during upload or recognition:", e)
        return jsonify({"error": "Upload or face recognition failed", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
