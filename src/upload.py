from flask import Flask, request, jsonify, abort # Import abort
import boto3
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)

s3 = boto3.client(
    's3',
    endpoint_url=os.getenv("R2_ENDPOINT_URL"),
    aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY")
)

@app.route("/upload", methods=["POST"])
def upload_file():
    # 1. Check if 'file' is in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400 # Bad request

    file = request.files['file']

    # 2. Check if a filename is provided
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400 # Bad request

    if file:
        filename = secure_filename(file.filename)
        bucket_name = os.getenv("R2_BUCKET_NAME")

        # Optional: Add uniqueness to filename to prevent overwrites
        # import uuid
        # unique_filename = f"{uuid.uuid4()}_{filename}"
        # print(f"Uploading {unique_filename} to bucket {bucket_name}") # For logging

        try:
            # 3. Attempt S3 upload
            s3.upload_fileobj(file, bucket_name, filename) # Use filename or unique_filename
            file_url = f"{os.getenv('R2_ENDPOINT_URL')}/{bucket_name}/{filename}" # Use filename or unique_filename
            return jsonify({"url": file_url}), 200 # OK

        except Exception as e:
            # 4. Handle S3 upload errors
            print(f"Error uploading file to S3: {e}") # Log the full error
            return jsonify({"error": "Failed to upload file to storage", "details": str(e)}), 500 # Internal Server Error

    # Fallback for unexpected cases (should ideally be caught by checks above)
    return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == "__main__":
    # In production, change debug=False and use a production-ready WSGI server like Gunicorn
    app.run(debug=True, port=5000)