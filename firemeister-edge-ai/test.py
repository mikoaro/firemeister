from ultralytics import YOLO

# Load a pre-trained YOLOv8 model
model = YOLO("yolov10n.pt")

# Run inference on an image
results = model("moon.png")

# Access the detected objects
for result in results:
    boxes = result.boxes
    for box in boxes:
        # Get the label and confidence score
        label = result.names[int(box.cls)]
        confidence = float(box.conf)

        print(f"Label: {label}, Confidence: {confidence}")