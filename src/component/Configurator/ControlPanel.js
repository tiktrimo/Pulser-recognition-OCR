import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import ParameterControls from "./ParameterControls/ParameterControls";

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 10,
  },
}));

const ControlPanel = React.memo((props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ParameterControls
        parameterNames={props.parameterNames}
        setParameterNames={props.setParameterNames}
        cropboxInfos={props.cropboxInfos}
        setCropboxInfos={props.setCropboxInfos}
        resizedDataURLs={props.resizedDataURLs}
        recognizedInfos={props.recognizedInfos}
      />
      <Button
        style={{ marginTop: 10 }}
        onClick={() => {
          props.setIsCameraSideIsUser(!props.isCameraSideIsUser);
        }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Change camera side
      </Button>
    </div>
  );
});
export default ControlPanel;
