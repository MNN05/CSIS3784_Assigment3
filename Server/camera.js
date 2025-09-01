//import e = require("express");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    document.getElementById('video').srcObject = stream;
  });

  function detectColor(frame) {
  // Convert to HSV, apply masks, count pixels
  let video = document.getElementById('video');
  let canvas = document.getElementById('canvasOutput');
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let cap = new cv.VideoCapture(video);


    function processing(){
    cap.read(src);

    let hsv = new cv.Mat();
    let results = new cv.Mat(); 
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

    // Define color range (e.g., blue shirt)
    let lowerBlue = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [100, 150, 0, 0]);
    let upperBlue = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [140, 255, 255, 255]);

    let mask = new cv.Mat();
    cv.inRange(hsv, lowerBlue, upperBlue, mask);
    
    //Apply mask
    cv.bitwise_and(src, src, results, mask);
    cv.imshow('canvasOutput', results);

    requestAnimationFrame(processing);
    if(cv.getBuildInformation){
        onOpenCvReady();
    }
    else{
        cv['onRuntimeInitialized']=onOpenCvReady;
    }

    // Count pixels to confirm dominant color
    //let bluePixels = cv.countNonZero(mask);
    }
}