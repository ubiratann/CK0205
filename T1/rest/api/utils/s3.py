import logging
import boto3
import base64
import random
import subprocess
import os 

from botocore.exceptions import ClientError

def create_local_temp_file(base64_string, filename, username):

    image_code = base64.b64decode(base64_string.split(",")[1] + '==')
    
    file_path = f"{username}/{filename}"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(f"/tmp/{file_path}", "wb") as fh:
        fh.write(image_code)

    return file_path

def delete_local_temp_file(file_path):
    os.remove(f"/tmp/{file_path}")

def create_bucket(bucket_name, region=None):
    """Create an S3 bucket in a specified region

    If a region is not specified, the bucket is created in the S3 default
    region (us-east-1).

    :param bucket_name: Bucket to create
    :param region: String region to create bucket in, e.g., 'us-west-2'
    :return: True if bucket created, else False
    """

    # Create bucket
    try:
        if region is None:
            s3_client = boto3.client('s3')
            s3_client.create_bucket(Bucket=bucket_name)
        else:
            s3_client = boto3.client('s3', region_name=region)
            location = {'LocationConstraint': region}
            s3_client.create_bucket(Bucket=bucket_name,
                                    CreateBucketConfiguration=location)
    except ClientError as e:
        raise e
    return True


def upload_file(file_name, bucket, object_name):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # Upload the file
    s3_client = boto3.client('s3')
    
    try:
        s3_client.upload_file(f"/tmp/{file_name}", bucket, file_name)
        return f"https://{bucket}.s3.amazonaws.com/{file_name.replace(' ' , '+')}"
    except ClientError as e:
        print(e)