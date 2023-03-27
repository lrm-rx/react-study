import originAxios from "axios";
const pendingMap = new Map();

// 生成每个请求唯一的键
function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

// 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
export function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new originAxios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

// 删除重复的请求
export function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}
