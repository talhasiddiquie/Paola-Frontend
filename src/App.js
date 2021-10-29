import React, { useState, useEffect } from "react";
import "cropperjs/dist/cropper.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Appbar from "./components/Appbar/Appbar";
import Canvas from "./components/Canvas/Canvas";
import Sidebar from "./components/Sidebar/Sidebar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import { useDispatch, useSelector } from "react-redux";
import { downloadImages } from "./utils/utilityFunctions";
import Modal from "./components/Modal/Modal";
import { activeTabChanged, modalOpened, modalTypeChanged } from "./store/UI";
import { croppedImagesAdded } from "./store/uploads";

const App = () => {
  const dispatch = useDispatch();
  const [previousActive, setPreviousActive] = useState(0);
  const UI = useSelector((state) => state.UI);
  const [croppers, setCroppers] = useState([]);
  const [projectName, setProjectName] = useState();
  const uploads = useSelector((state) => state.uploads);

  const onDownloadCroppedData = (isForEmail = false) => {
    let allCroppedData = [];
    croppers.forEach((value) => {
      allCroppedData.push(value.getCroppedCanvas().toDataURL());
    });
    return downloadImages(
      allCroppedData,
      projectName ? projectName : "default",
      isForEmail
    );
  };

  const onDonate = () => {
    dispatch(modalOpened());
    dispatch(modalTypeChanged("donate"));
  };

  const onLogin = () => {
    dispatch(modalOpened());
    dispatch(modalTypeChanged("login"));
  };

  const onShare = () => {
    dispatch(modalOpened());
    dispatch(modalTypeChanged("share"));
  };

  const onCropImages = async () => {
    window.performance.mark("cropStart");
    // let instance = worker();
    // try {
    //   // console.log(croppers);
    //   let data = await instance.cropImages(
    //     console.log(croppers[1].getCroppedCanvas().toString())
    //   );
    //   console.log(data);
    // } catch (e) {
    //   console.log(e);
    // }

    // let lastId = getLastImageID();
    const uploadsCopy = uploads.files.map((value) => ({ ...value }));
    console.log(croppers, "<===== Remaining Croppers");
    croppers.forEach((value, index) => {
      if (value)
        uploadsCopy[index].croppedURL = value
          .getCroppedCanvas()
          .toDataURL("image/jpeg", 0.8);
    });
    dispatch(croppedImagesAdded({ uploadsCopy }));

    // const allCroppedData = [];
    // let lastId =
    //   croppedImages.files.length > 0
    //     ? croppedImages.files[croppedImages.files.length - 1].id
    //     : 0;
    // if (lastId >= 1) lastId++;

    // croppers.forEach((value) => {
    //   allCroppedData.push({
    //     url: value.getCroppedCanvas().toDataURL("image/jpeg", 0.8),
    //     id: lastId,
    //   });
    //   lastId++;
    // });
    // dispatch(croppedImagesAdded(allCroppedData, lastId));

    window.performance.mark("cropEnd");
    window.performance.measure("cropMeasure", "cropStart", "cropEnd");
  };

  useEffect(() => {
    setPreviousActive(UI.activeTab);
    if (uploads.files.length >= 1 && previousActive === 0) onCropImages();
  }, [UI.activeTab]);

  useEffect(() => {
    console.log(croppers, "<==== Current Croppers");
  }, [croppers]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Appbar
          onClickLogin={onLogin}
          onClickShare={onShare}
          onClickDonate={onDonate}
          projectName={projectName}
          setProjectName={setProjectName}
          onClickDownload={onDownloadCroppedData}
        />
        <div className="container">
          <Sidebar
            active={UI.activeTab}
            setActive={(active) => dispatch(activeTabChanged(active))}
          />
          <ControlPanel active={UI.activeTab} />
          <Canvas
            active={UI.activeTab}
            croppers={croppers}
            setCroppers={setCroppers}
          />
          {UI.modal ? (
            <Modal
              onShareImages={(isForEmail) => onDownloadCroppedData(isForEmail)}
            />
          ) : null}
        </div>
      </DndProvider>
    </>
  );
};

export default App;
