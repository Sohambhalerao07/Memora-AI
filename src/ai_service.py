import os
from flask import Flask, request, jsonify
import cv2
import numpy as np
import requests
from dotenv import load_dotenv
from flask_cors import CORS
from deepface import DeepFace

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/extract_faces", methods=["POST"])
def extract_faces():
    data = request.json
    image_url = data.get("image_url")

    if not image_url:
        return jsonify({"error": "No image_url provided"}), 400

    try:
        # Download the image from the URL (which points to R2)
        response = requests.get(image_url)
        response.raise_for_status()
        img_bytes = response.content
        
        # Read file into OpenCV image for DeepFace
        image_np = np.frombuffer(img_bytes, np.uint8)
        image_cv2 = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

        # Face detection
        # Note: In production, you might also want enforce_detection=True or False depending on use-case
        # We'll use extract_faces to find the bounding boxes, or represent to get vectors
        # Getting embeddings using 'represent'
        try:
            representations = DeepFace.represent(img_path=image_cv2, model_name="VGG-Face", enforce_detection=False)
        except ValueError as e:
            # DeepFace raises ValueError if no face is found and enforce_detection is True
            representations = []
            
        print(f"🔍 Detected {len(representations)} face(s)")

        # Prepare response
        faces = []
        for rep in representations:
            faces.append({
                "embedding": rep["embedding"],
                "facial_area": rep["facial_area"],
                "confidence": rep.get("face_confidence", 0)
            })

        return jsonify({
            "faces": faces,
            "count": len(faces)
        }), 200

    except Exception as e:
        print("Error during face extraction:", e)
        return jsonify({"error": "Face extraction failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
