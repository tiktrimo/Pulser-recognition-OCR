import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Rnd } from "react-rnd";

const useStyles = makeStyles(() => ({
  cropbox: {
    width: "100%",
    height: "100%",
    backgroundColor: "#7289da",
    opacity: 0.6,
  },
  cropboxTypo: {
    fontSize: 30,
    fontWeight: 1000,
    color: "#ffffff",
  },
}));

const RndCropboxes = (props) => {
  const classes = useStyles();

  return props.parameterNames.map((param, index) => (
    <Rnd
      key={`RndCropbox:${index}`}
      default={props.cropboxInfos[index]}
      bound="window"
      onDragStop={(e, data) => {
        props.cropboxInfos[index].x = data.x;
        props.cropboxInfos[index].y = data.y;
        props.setCropboxInfos([...props.cropboxInfos]);
        console.log(props.cropboxInfos[0]);
      }}
      onResizeStop={(e, dir, ref) => {
        props.cropboxInfos[index].width = ref.clientWidth;
        props.cropboxInfos[index].height = ref.clientHeight;
        props.setCropboxInfos([...props.cropboxInfos]);
      }}
    >
      <div className={classes.cropbox}>
        <Typography align="center" className={classes.cropboxTypo}>
          {param}
        </Typography>
      </div>
    </Rnd>
  ));
};

const MediaCropService = React.memo(function (props) {
  return (
    <RndCropboxes
      parameterNames={props.parameterNames}
      cropboxInfos={props.cropboxInfos}
      setCropboxInfos={props.setCropboxInfos}
    />
  );
});
export default MediaCropService;
