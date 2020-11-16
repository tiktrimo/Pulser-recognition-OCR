import { Paper, Typography } from "@material-ui/core";
import React from "react";

export default function Value(props) {
  return (
    <Paper style={{ width: "100%", height: 200 }}>
      <Typography style={{ fontSize: 20, fontWeight: 1000 }} align="center">
        Value
      </Typography>
    </Paper>
  );
}
