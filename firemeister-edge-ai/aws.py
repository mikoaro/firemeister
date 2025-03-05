import os

import boto3

def test_aws_access() -> bool:
    """
    We only try to use aws on detection, so I call this on startup to make sure credentials
    are working and everything.
    https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sts.html#STS.Client.get_caller_identity
    """
    try:
        resp = boto3.client('sts').get_caller_identity()
        print(f'AWS credentials working.')
        return True
    except Exception as e:
        print(f'Failed to validate AWS authentication: {e}')
        return False
    
def save_file(file_path, content_type='image/jpeg'):
    """Save a file to our s3 bucket (file storage in AWS) because we wanted to include an image in the text"""
    client = boto3.client('s3')
    client.upload_file(file_path, 'fire-detector', file_path,
                       ExtraArgs={'ContentType': content_type})
    return f'https://fire-detector.s3.amazonaws.com/{file_path}'