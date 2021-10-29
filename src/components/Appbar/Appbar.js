import React from "react";
import { Button } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import CreateIcon from "@material-ui/icons/Create";
import PaymentIcon from "@material-ui/icons/Payment";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Appbar = (props) => {
  const {
    projectName,
    onClickLogin,
    onClickShare,
    onClickDonate,
    setProjectName,
    onClickDownload,
  } = props;

  return (
    <div className="appbar">
      <div className="appbar-left">
        <p>App Name</p>
      </div>

      <div className="appbar-right">
        <div>
          <Button
            variant="contained"
            onClick={onClickShare}
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
          <Button variant="contained" startIcon={<CreateIcon />}>
            Write Us
          </Button>
        </div>

        {/* <p>Project Title - Untitled</p> */}
        <input
          placeholder="Project Title - Untitled"
          value={projectName ? projectName : ""}
          onChange={(event) => setProjectName(event.target.value)}
        />

        <div>
          <Button
            variant="contained"
            onClick={onClickDonate}
            startIcon={<PaymentIcon />}
          >
            Donate
          </Button>

          <Button
            onClick={onClickDownload}
            variant="contained"
            startIcon={<CloudDownloadIcon />}
          >
            Download
          </Button>
          <Button
            variant="contained"
            startIcon={<AccountCircleIcon />}
            onClick={onClickLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
