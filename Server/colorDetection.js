function detectColor(frame) {
  // Convert to HSV, apply masks, count pixels
  let video = document.getElementById('video');
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let cap = new cv.VideoCapture(video);
    cap.read(src);

    let hsv = new cv.Mat();
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

    // Define color range (e.g., blue shirt)
    let lowerBlue = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [100, 150, 0, 0]);
    let upperBlue = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [140, 255, 255, 255]);

    let mask = new cv.Mat();
    cv.inRange(hsv, lowerBlue, upperBlue, mask);

    // Count pixels to confirm dominant color
    let bluePixels = cv.countNonZero(mask);
}