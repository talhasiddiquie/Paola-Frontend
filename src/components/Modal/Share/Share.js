import React from "react";
import Share from "@material-ui/icons/Share";
import { Button, TextField } from "@material-ui/core";

const ShareModal = (props) => {
  const { onShareImages } = props;

  return (
    <div className="modal-share">
      <p className="modal-header">
        <Share />
        Share
      </p>

      <TextField
        fullWidth
        label="Subject"
        variant="outlined"
        placeholder="This is amazing!"
      />
      <div style={{ height: "10px" }}></div>

      <TextField
        fullWidth
        variant="outlined"
        label="Recipient Email"
        placeholder="john@gmail.com"
      />
      <div style={{ height: "10px" }}></div>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Body"
        variant="outlined"
        defaultValue="Hey check out these amazing images I made using this cool website."
      />
      <div style={{ height: "10px" }}></div>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={() => {
          onShareImages(true);
        }}
      >
        Share
      </Button>
    </div>
  );
};

export default ShareModal;
