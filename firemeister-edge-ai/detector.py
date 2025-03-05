from timeit import default_timer as timer
from datetime import datetime
import os
import cv2 as cv
import time
import aws
import requests


class Detector:
    """Detects fires in a frame of a video stream and returns whether any objects were detected."""

    """Class manages notifications and messages sent to service endpoints."""

    num_seconds_between_messages = 30
    confidence_threshold = 0.6
    last_message = timer()

    def __init__(self):
        print("Detector: Ready for fire detection ...")
        if not os.path.exists("images"):
            os.mkdir("images")

    def detect_fire(self, results, frame):
        """Detects fires in a frame of a video stream. Called when any objects are detected by our model."""

        # Access the detected objects
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get the label and confidence score
                label = result.names[int(box.cls)]
                confidence = float(box.conf)

                break
        print(f"Label: {label}, Confidence: {confidence}")

        confident_object = list((label, confidence))

        # If it has been long enough since the last message, send another notification
        now = timer()
        if (now - self.last_message) > self.num_seconds_between_messages:
            self.last_message = now
            # self.send_notification(confident_object, frame)


    def send_notification(self, obj, frame):
        """Notify users that to review an alert, hazard or object detected!"""
        print("Sending notification!")

        # Get a string of the current timestamp
        now = datetime.now()
        timestamp = now.strftime("%m-%d-%Y_%H-%M-%S-%f")

        # Write the opencv `frame` to a file
        filename = f"images/{timestamp}_{obj[0]}.jpg"
        cv.imwrite(filename, frame)

        # Save the image file to aws s3 file storage
        img_url = aws.save_file(filename)

        # Send the url data to the Node.js server
        data = {"nftUri": img_url}
        response = requests.post("http://localhost:30000/mintcollectionnft", json=data)
