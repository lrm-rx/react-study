import { Toast } from "antd-mobile";

export default function Http({
  url,
  method = "post",
  headers = {},
  body = {},
  setLoading,
  setResult,
}) {
  setLoading && setLoading(true);
  const authorization = localStorage.getItem("token");
  let defaultHeader = {
    "Content-type": "application/json",
  };
  defaultHeader = authorization
    ? {
        ...defaultHeader,
        authorization,
      }
    : defaultHeader;

  let params;
  if (method.toUpperCase() === "GET") {
    params = undefined;
  } else {
    params = {
      headers: {
        ...defaultHeader,
        ...headers,
      },
      method,
      body: JSON.stringify(body),
    };
  }

  return new Promise((resolve, reject) => {
    try {
      fetch("/api" + url, params)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
            setResult && setResult(res.data);
          } else {
            // if (res.status === 1001) {
            //   Toast.show({
            //     icon: "fail",
            //     content: "用户登录失效!",
            //     duration: 1000,
            //   });
            //   let timer;
            //   timer = setTimeout(() => {
            //     location.href = "/login?from=" + location.pathname;
            //     localStorage.clear();
            //     timer = null;
            //   }, 2000);
            // }
            Toast.show({
              icon: "fail",
              content: res.errMsg,
            });
            reject(res.errMsg);
          }
        })
        .catch((err) => {
          Toast.show({
            icon: "fail",
            content: err,
          });
          reject(err);
        })
        .finally(() => {
          setLoading && setLoading(false);
        });
    } catch (error) {
      return reject(error);
    }
  });
}
