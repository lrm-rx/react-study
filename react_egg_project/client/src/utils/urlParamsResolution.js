export default function UrlParamsResolution(urlStr) {
  let obj = {};
  const dataArr = urlStr.slice(1).split("&");
  for (let i = 0; i < dataArr.length; i++) {
    const key = dataArr[i].split("=")[0];
    const value = dataArr[i].split("=")[1];
    obj[key] = value;
  }
  return obj;
}
