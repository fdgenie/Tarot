import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tarot.howlcode.com/api/v1"
});
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
