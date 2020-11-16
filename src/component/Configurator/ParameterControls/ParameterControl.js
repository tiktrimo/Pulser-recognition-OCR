import {
  Card,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: { width: "100%", height: "auto", paddingTop: 10, marginBottom: 10 },
  textField: {
    width: "95%",
    margin: "2px 10px",
  },
  image: {
    margin: 10,
  },
}));

export default function ParameterControl(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={6}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {props.recognizedInfos[props.index]?.text || ""}
                </InputAdornment>
              ),
            }}
            inputProps={{ style: { borderStyle: "none" } }}
            onChange={(e) => {
              props.parameterNames[props.index] = e.target.value;
              props.setParameterNames([...props.parameterNames]);
            }}
            label={`PARAMETER ${props.index + 1}`}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <img
            className={classes.image}
            src={props.resizedDataURLs[props.index]}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
