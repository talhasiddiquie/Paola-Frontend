export const cropImages = (data) => {
  let func = new Function("return " + data)();
  return func();
  // let allCroppedData = [];
  // let lastId =
  //   croppedImages.files.length > 0
  //     ? croppedImages.files[croppedImages.files.length - 1].id
  //     : 0;

  // croppers.forEach((value) => {
  //   lastId++;
  //   allCroppedData.push({
  //     url: value.getCroppedCanvas().toDataURL(),
  //     id: lastId,
  //   });
  // });

  return { allCroppedData: [], lastId: 0 };
};
