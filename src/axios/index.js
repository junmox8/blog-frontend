import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
let loading = null
const Axios = axios.create({
  timeout: 4000,
});
Axios.interceptors.request.use((request) => {
  loading = ElLoading.service({
    fullscreen: true
  })
  request.headers = {
    ...request.headers,
    authorization: "Bearer " + localStorage.getItem("token") || "",
  };
  return request;
});
Axios.interceptors.response.use(
  (responce) => {
    loading && loading.close()
    if (responce.data.errorMsg === "请重新登录") {
      location.replace("http://127.0.0.1:3000");
      ElMessage({ type: "error", message: "请重新登录" });
    }
    loading = null
    return responce;
  },
  (error) => {
    console.log(error);
  }
);
export default Axios;
