import React from "react";
import ReactLoading from "react-loading";
import { Typography } from "@material-ui/core";

const Loading = ({ loading, empty }) => {
  return (
    <div>
      {loading && (
        <ReactLoading type="spin" color="blue" height={100} width={100} />
      )}
      {empty && <Typography>No client found</Typography>}
    </div>
  );
};

export default Loading;
