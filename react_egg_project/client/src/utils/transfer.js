// 图片二进制地址blob转化文件file格式createObjectURL创建的图片url地址转化文件地址file进行上传
// blob文件转化
const httpRequestImg = (src) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      if (this.status == 200) {
        let myBlob = this.response;
        let files = new window.File([myBlob], myBlob.type, {
          type: myBlob.type,
        }); // myBlob.type 自定义文件名
        resolve(files);
      } else {
        reject(false);
      }
    };
    xhr.send();
  });
};

// file转bse64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      if (e.target.result) {
        return resolve(e.target.result);
      }
      reject("出错啦!");
    };
  });
}

export const transferImgType = async (bloburl) => {
  try {
    const file = await httpRequestImg(bloburl);
    return await fileToBase64(file);
  } catch (error) {
    console.error(error);
    return new Error(error);
  }
};
