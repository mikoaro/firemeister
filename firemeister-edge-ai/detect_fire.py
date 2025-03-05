from flask import Flask, Response, request, jsonify
import requests
import cv2 as cv
import os
import supervision as sv
from ultralytics import YOLO
from detector import Detector
from aws import test_aws_access
from timeit import default_timer as timer

app = Flask(__name__)

box_annotator = sv.BoxAnnotator()
label_annotator = sv.LabelAnnotator()

camera = cv.VideoCapture(0)


def load_model():
    modelpath = "best.pt"

    # Load a trained YOLOv10n model
    model = YOLO(modelpath)
    return model


model = load_model()


def run_detection():
    if not camera.isOpened():
        print("Cannot open camera")
        exit()

    # Before getting started, make sure the connection to aws is set up correctly
    # if not test_aws_access():
    #     raise "Cannot access AWS!"

    # Instantiate a new object of type `Detector`
    detector = Detector()

    # Run custom YOLOv11 detection!
    while True:

        # Capture frame-by-frame in camera
        ret, frame = camera.read()

        # if the frame is read correctly ret is True
        if not ret:
            print("Can't receive frame (stream end?), Exiting ...")
            break

        # Perform your ML processing here on 'frame'
        results = model(frame,  conf=0.7)[0]
        detections = sv.Detections.from_ultralytics(results)

        annotated_image = box_annotator.annotate(scene=frame, detections=detections)
        annotated_image = label_annotator.annotate(
            scene=annotated_image, detections=detections
        )

        if len(detections) > 0:
            print("Objects detected!")
            on_objects_detected = detector.detect_fire(results, frame)
        else:
            print("No objects detected.")

        # cv.imshow('Webcam', annotated_image)  # Display the annotated image

        ret, buffer = cv.imencode(".jpg", annotated_image)
        frame = buffer.tobytes()

        yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")

    # When everything is done, release the capture
    camera.release()
    cv.destroyAllWindows()


def generate_frames():
    pass


@app.route("/")
def video():
    return Response(
        run_detection(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
