import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
  uploadAdded,
  uploadEnded,
  uploadSizeAdded,
  uploadStarted,
} from "../../store/uploads";
import { bytesToSize } from "../../utils/utilityFunctions";
import * as loadImage from "blueimp-load-image";

const FileDropZone = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    let totalSizeInBytes = 0;
    dispatch(uploadStarted());
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader();
      totalSizeInBytes += file.size;
      // let data = await loadImage(file, {
      //   orientation: true,
      //   canvas: true,
      //   meta: true,
      // });
      // console.log(data);
      reader.readAsDataURL(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        dispatch(
          uploadAdded({
            path: file.path,
            name: file.name,
            url: reader.result,
            selected: false,
          })
        );
      };
    });
    dispatch(uploadEnded());
    dispatch(uploadSizeAdded({ totalSize: bytesToSize(totalSizeInBytes) }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileDropZone;
