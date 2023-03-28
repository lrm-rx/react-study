import originAxios from "axios";
import { addPending, removePending } from "@utils/cancelRequest";
import { showLoading, hideLoading } from "@utils/globalLoading";

export default function request(option) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = originAxios.create({
      baseURL: "/api/v1",
      timeout: 10000,
      headers: {
        isShowLoading: true, // 默认所有的请求都带loading
      },
      // 跨域允许携带凭证
      withCredentials: true,
    });

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      (config) => {
        // console.log('来到了request拦截success中');
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

        // 3.对请求的参数进行序列化(看服务器是否需要序列化)
        // config.data = qs.stringify(config.data)
        // console.log(config);

        // 4.等等
        // requestCount为0，才创建全局loading, 避免重复创建
        if (config.headers.isShowLoading !== false) {
          showLoading(); // 全局loading
        }
        // 取消请求
        removePending(config);
        addPending(config);
        return config;
      },
      (error) => {
        // 判断当前请求是否设置了不显示Loading
        if (error.config.headers.isShowLoading !== false) {
          hideLoading();
        }
        return error;
      }
    );

    instance.interceptors.response.use(
      (response) => {
        // 判断当前请求是否设置了不显示Loading
        if (response.config.headers.isShowLoading !== false) {
          hideLoading();
        }
        removePending(response.config);
        return response.data;
      },
      (error) => {
        if (error.config.headers.isShowLoading !== false) {
          hideLoading();
        }
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = "请求错误";
              break;
            case 401:
              error.message = "未授权的访问";
              break;
            default:
              error.message = "其他错误信息";
          }
        }
        error.config && removePending(error.config);
        return error;
      }
    );

    // 2.传入对象进行网络请求
    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
