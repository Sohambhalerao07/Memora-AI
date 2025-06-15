from flask import Flask, request, jsonify
import boto3
import os
import uuid
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)

# Setup R2 Client
s3 = boto3.client(
    's3',
    endpoint_url=os.getenv("R2_ENDPOINT_URL"),
    aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY")
)

@app.route("/upload", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Ensure filename is unique
        original_filename = secure_filename(file.filename)
        file_ext = os.path.splitext(original_filename)[1]
        unique_filename = f"{uuid.uuid4().hex}{file_ext}"

        bucket_name = os.getenv("R2_BUCKET_NAME")
        object_key = f"uploads/{unique_filename}"  # Optional: store in 'uploads/' folder

        try:
            s3.upload_fileobj(file, bucket_name, object_key)

            # ✅ Construct Public URL (assuming public access is enabled on R2 bucket)
            public_url = f"{os.getenv('R2_PUBLIC_URL')}/{object_key}"
            return jsonify({"url": public_url}), 200

        except Exception as e:
            print("Upload error:", e)
            return jsonify({"error": "Upload failed", "details": str(e)}), 500

    return jsonify({"error": "Unexpected error"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
