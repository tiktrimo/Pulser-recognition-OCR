import { Button } from "@material-ui/core";
import React from "react";
import ParameterControl from "./ParameterControl";

const ParameterControlList = (props) => {
  return props.parameterNames.map((param, index) => (
    <ParameterControl
      key={`PARAMETER:${index}`}
      index={index}
      parameterNames={props.parameterNames}
      setParameterNames={props.setParameterNames}
      resizedDataURLs={props.resizedDataURLs}
      recognizedInfos={props.recognizedInfos}
    />
  ));
};

export default function CropControls(props) {
  return (
    <React.Fragment>
      <ParameterControlList
        parameterNames={props.parameterNames}
        setParameterNames={props.setParameterNames}
        resizedDataURLs={props.resizedDataURLs}
        recognizedInfos={props.recognizedInfos}
      />
      <Button
        onClick={() => {
          if (props.parameterNames.length > 100) return undefined;
          props.parameterNames.push(
            `PARAMETER ${props.parameterNames.length + 1}`
          );
          props.setParameterNames([...props.parameterNames]);
          props.cropboxInfos.push({
            x: 500 * Math.random(),
            y: 500 * Math.random(),
            width: 300,
            height: 100,
          });
          props.setCropboxInfos([...props.cropboxInfos]);
        }}
        fullWidth
        variant="contained"
        color="primary"
      >
        ADD PARAMETER
      </Button>
    </React.Fragment>
  );
}
