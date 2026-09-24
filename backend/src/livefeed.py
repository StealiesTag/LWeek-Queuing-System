import cv2
import requests

cap = cv2.VideoCapture('video_test/video.mp4')

while True:
    ret, frame = cap.read()
    if not ret:
        break

    ret, buffer = cv2.imencode(".jpg", frame)
    frame_bytes = buffer.tobytes()
    response = requests.post("http://localhost:3000/api/live", data=frame_bytes, headers={"Content-Type": "image/jpeg"})

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
