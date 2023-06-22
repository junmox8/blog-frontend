import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";

const LoadingInstance = {
  _target: null, // 保存Loading实例
  _count: 0
};
function closeLoading() {
  if (LoadingInstance._count > 0) LoadingInstance._count--;
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

export default function createAxios(axiosConfig) {
  const service = axios.create({
    timeout: 4000
  });
  const {isLoading=true}=axiosConfig
  service.interceptors.request.use(
    request => {
      // 创建loading实例  
      if (isLoading) {
        LoadingInstance._count++;
        if (LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service();
        }
      }
      request.headers = {
        ...request.headers,
        authorization: "Bearer " + localStorage.getItem("token") || "",
      };
      return request;
    },
    error => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    response => {
      if (isLoading) {
        closeLoading(); // 关闭loading
      }
      if (response.data.errorMsg === "请重新登录") {
        location.replace("http://127.0.0.1:5173");
        ElMessage({ type: "error", message: "请重新登录" });
      }
      return response;
    },
    error => {
      if (isLoading) {
        closeLoading(); // 关闭loading
      }
      return Promise.reject(error);
    }
  );

  return service(axiosConfig)
}
