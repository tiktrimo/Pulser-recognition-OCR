import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import Webcam from "react-webcam";
import { createWorker } from "tesseract.js";

const videoConstraints = {
  facingMode: "user",
};
const worker = createWorker();

export default function WebcamService(props) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  console.log(webcamRef);
  const [webcamCapture, setWebcamCapture] = useState(undefined);
  const [dragboxInfo, setDragboxInfo] = useState({
    x: 150,
    y: 205,
    width: 500,
    height: 190,
  });
  console.log(dragboxInfo);
  useEffect(() => {
    (async () => {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
    })();
    return () => {
      worker.terminate();
    };
  }, []);

  useEffect(() => {
    if (!webcamCapture) return undefined;
    console.time("test");
    worker.recognize(webcamCapture).then((data) => {
      console.log(data);
      console.timeEnd("test");
    });
  }, [webcamCapture]);

  return (
    <React.Fragment>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: "solid 1px #000000" }}
      ></canvas>
      <img ref={imageRef} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Webcam
          audio={false}
          height="100%"
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <Rnd
          default={dragboxInfo}
          bounds="window"
          onDrag={(e, data) => {
            setDragboxInfo({ ...dragboxInfo, x: data.x, y: data.y });
          }}
          onResize={(e, dir, ref) => {
            setDragboxInfo({
              ...dragboxInfo,
              width: ref.clientWidth,
              height: ref.clientHeight,
            });
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "solid 1px #000000",
            }}
          />
        </Rnd>
      </div>
      <Button
        onClick={() => {
          console.log(webcamRef);
          const capture = webcamRef.current.getScreenshot();
          setWebcamCapture(capture);

          if (!!imageRef.current) imageRef.current.src = capture;
          const ctx = canvasRef.current.getContext("2d");
          imageRef.current.addEventListener("load", (e) => {
            ctx.drawImage(imageRef.current, 0, 0, 200, 200, 0, 0, 100, 100);
          });
        }}
      >
        CAPTURE
      </Button>
    </React.Fragment>
  );
}
