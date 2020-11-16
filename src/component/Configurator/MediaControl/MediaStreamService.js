import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MediaStreamService(props) {
  const [captureInterval, setCaptureInterval] = useState(undefined);
  const mediaRef = useRef();

  useEffect(() => {
    if (!mediaRef.current) return undefined;
    if (!!captureInterval) clearInterval(captureInterval);
    setCaptureInterval(
      setInterval(() => {
        const screenCapture = mediaRef.current.getScreenshot();
        props.setCaptureBase64(screenCapture);
        props.originalImageRef.current.src = screenCapture;
      }, 1000) //TODO: can change interval in settings
    );
    return () => {
      clearInterval(captureInterval);
    };
  }, [mediaRef.current]);

  return (
    <React.Fragment>
      <Webcam
        style={{ visibility: "hidden", position: "absolute", top: 0, left: 0 }}
        audio={false}
        width="100%"
        ref={mediaRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: props.isCameraSideIsUser ? "user" : "environment",
        }}
      />
      <img ref={props.originalImageRef} width="100%" />
    </React.Fragment>
  );
}
