import { makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect, useRef } from "react";
import MediaCropService from "./MediaCropService";
import MediaStreamService from "./MediaStreamService";

const useStyles = makeStyles(() => ({
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
  },
}));

export default function MediaControl(props) {
  const classes = useStyles();

  const originalImageRef = useRef();
  const resizingCanvasRef = useRef();

  const resizingFunction = useCallback(
    (e) => {
      console.time("∨∨∨∨∨∨∨∨∨∨∨cropping image");
      const ctx = resizingCanvasRef.current.getContext("2d");
      const sizeFactor =
        originalImageRef.current.naturalWidth /
        originalImageRef.current.clientWidth;

      const dataURLs = props.cropboxInfos.map((cbi) => {
        //Mutate canvas size to fit with a cropped image
        resizingCanvasRef.current.width = cbi.width;
        resizingCanvasRef.current.height = cbi.height;
        // prettier-ignore
        ctx.clearRect(0, 0, resizingCanvasRef.current.clientWidth, resizingCanvasRef.current.clientHeight)
        // prettier-ignore
        ctx.drawImage(originalImageRef.current, cbi.x * sizeFactor, cbi.y * sizeFactor, cbi.width * sizeFactor, cbi.height * sizeFactor, 0, 0, cbi.width, cbi.height);
        return resizingCanvasRef.current.toDataURL();
      });
      props.setResizedDataURLs(dataURLs);
      console.timeEnd("∨∨∨∨∨∨∨∨∨∨∨cropping image");
    },
    [props.cropboxInfos.length]
  );

  useEffect(() => {
    if (!resizingCanvasRef.current || !originalImageRef.current)
      return undefined;

    originalImageRef.current.onload = resizingFunction;
  }, [originalImageRef, props.cropboxInfos.length]);

  return (
    <React.Fragment>
      <MediaStreamService
        originalImageRef={originalImageRef}
        setCaptureBase64={props.setCaptureBase64}
        isCameraSideIsUser={props.isCameraSideIsUser}
      />
      <MediaCropService
        cropboxInfos={props.cropboxInfos}
        setCropboxInfos={props.setCropboxInfos}
        parameterNames={props.parameterNames}
      />
      <canvas className={classes.canvas} ref={resizingCanvasRef}></canvas>
    </React.Fragment>
  );
}
