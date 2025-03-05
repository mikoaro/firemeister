import base64
import requests


# def test_metagraph_access() -> bool:
#     return True

# def save_file(file_path, content_type='image/jpeg'):
#     """Save a file to our ipfs (file storage in PINATA) because we wanted to include an image in the text"""

#     # Read the image file
#     with open(file_path, 'rb') as image_file:
#         encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

#     # Send the image data to the Node.js server
#     data = {'image': encoded_string}
#     response = requests.post('http://localhost:30000/upload', json=data)


#     # """Save a file to our ipfs (file storage in PINATA) because we wanted to include an image in the text"""
#     # client = boto3.client('s3')
#     # client.upload_file(file_path, 'bus-detector', file_path,
#     #                    ExtraArgs={'ACL': 'public-read', 'ContentType': content_type})
#     # return f'https://bus-detector.s3.amazonaws.com/{file_path}'

# def send_message():
#         pass