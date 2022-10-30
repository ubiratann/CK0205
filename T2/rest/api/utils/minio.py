import base64
from datetime import timedelta
import json
import os 
from minio import Minio

MINIO_HOST       = os.environ.get('MINIO_HOST')
MINIO_HOST_PORT  = os.environ.get('MINIO_HOST_PORT')
MINIO_ACCESS_KEY = os.environ.get('MINIO_ACCESS_KEY')
MINIO_SECRET_KEY = os.environ.get('MINIO_SECRET_KEY')
minio_client = Minio(endpoint=f"{MINIO_HOST}:{MINIO_HOST_PORT}", access_key=MINIO_ACCESS_KEY, secret_key=MINIO_SECRET_KEY, secure=False)

def create_local_temp_file(base64_string, filename, owner_id):

    extension, b64 = base64_string.split(',')
    image_code = base64.b64decode(b64 + '==')
    
    file_path = f"{owner_id}/{filename}"
    os.makedirs(os.path.dirname(f"/tmp/{file_path}"), exist_ok=True)

    with open(f"/tmp/{file_path}", "wb") as fh:
        fh.write(image_code)

    return file_path

def delete_local_temp_file(file_path):
    os.remove(f"/tmp/{file_path}")

def create_bucket(bucket_name):
    if not minio_client.bucket_exists(bucket_name):
        minio_client.make_bucket(bucket_name=bucket_name)

        with open('api/utils/bucket-policy.json', 'r') as file:
            minio_client.set_bucket_policy(bucket_name=bucket_name, policy=json.dumps(json.load(file)))

def upload_file(object_name, bucket_name):
    minio_client.fput_object(bucket_name=bucket_name, object_name=object_name, file_path=f"/tmp/{object_name}")
    return f"{MINIO_HOST}/{bucket_name}/{object_name}"

def delete_file(bucket, object_name):
    minio_client.remove_object(bucket_name=bucket, object_name=object_name)