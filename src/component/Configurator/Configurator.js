import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MediaControl from "./MediaControl/MediaControl";
import ControlPanel from "./ControlPanel";
import { createScheduler, createWorker } from "tesseract.js";

const scheduler = createScheduler();

export default function Configurator(props) {
  const [isWorkerSet, setIsWorkerSet] = useState(false);

  const [captureBase64, setCaptureBase64] = useState("");
  const [resizedDataURLs, setResizedDataURLs] = useState([]);
  const [isCameraSideIsUser, setIsCameraSideIsUser] = useState(false);

  const [parameterNames, setParameterNames] = useState(["PARAMETER 1"]);
  const [cropboxInfos, setCropboxInfos] = useState([
    { x: 150, y: 205, width: 300, height: 100 },
  ]);

  const [recognizedInfos, setRecognizedInfos] = useState(new Array(100));

  useEffect(() => {
    (async () => {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      await worker.setParameters({
        tessedit_char_whitelist: "0123456789",
        /* tessedit_pageseg_mode: PSM.SINGLE_LINE, */
      });
      setIsWorkerSet(true);
      scheduler.addWorker(worker);
    })();
    return () => {
      scheduler.terminate();
    };
  }, [parameterNames.length]);

  useEffect(() => {
    if (!isWorkerSet) return undefined;
    console.time("Recognizing");
    Promise.all(
      resizedDataURLs.map((dataURL) => {
        const image = new Image();
        image.src = dataURL;
        return scheduler.addJob("recognize", image);
      })
    ).then((infos) => {
      setRecognizedInfos(infos.map((info) => info.data));
      console.timeEnd("Recognizing");
    });
  }, [resizedDataURLs]);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <MediaControl
          captureBase64={captureBase64}
          setCaptureBase64={setCaptureBase64}
          setResizedDataURLs={setResizedDataURLs}
          isCameraSideIsUser={isCameraSideIsUser}
          cropboxInfos={cropboxInfos}
          setCropboxInfos={setCropboxInfos}
          parameterNames={parameterNames}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <ControlPanel
          parameterNames={parameterNames}
          setParameterNames={setParameterNames}
          isCameraSideIsUser={isCameraSideIsUser}
          setIsCameraSideIsUser={setIsCameraSideIsUser}
          cropboxInfos={cropboxInfos}
          setCropboxInfos={setCropboxInfos}
          resizedDataURLs={resizedDataURLs}
          recognizedInfos={recognizedInfos}
        />
      </Grid>
    </Grid>
  );
}
