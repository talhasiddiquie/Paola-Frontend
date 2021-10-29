import { IconButton } from "@material-ui/core";
import React from "react";
import Donate from "./Donate/Donate";
import CloseIcon from "@material-ui/icons/Close";
import Share from "./Share/Share";
import { useDispatch, useSelector } from "react-redux";
import { modalClosed } from "../../store/UI";
import Login from "../Login/Login";

const Modal = (props) => {
  const { onShareImages } = props;

  const dispatch = useDispatch();

  const UI = useSelector((state) => state.UI);

  const onCloseModal = () => dispatch(modalClosed());

  const onShareImagesViaEmail = async () => {
    try {
      let zip = await onShareImages(true);
      console.log(zip);
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = (type) => {
    const content = {
      login: <Login />,
      donate: <Donate />,
      share: <Share onShareImages={onShareImagesViaEmail} />,
    };
    return content[type];
  };

  return (
    <div className="modal">
      <div className="modal-inner">
        <IconButton
          id="modal-close-icon"
          aria-label="close"
          size="medium"
          onClick={onCloseModal}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
        {renderContent(UI.modalType)}
      </div>
    </div>
  );
};

export default Modal;
