import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadImages = (images, zipName, isForEmail = false) => {
  let index = 0;
  const zip = new JSZip();
  images.forEach((image) => {
    zip.file(
      `picture_${index}.jpg`,
      image.replace(/^data:image\/(png|jpg);base64,/, ""),
      {
        base64: true,
      }
    );
    index++;
  });
  if (isForEmail) return zip.generateAsync({ type: "blob" });
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, zipName);
  });
};

export const bytesToSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
