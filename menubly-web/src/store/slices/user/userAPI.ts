import { HOST_URL } from 'constant/api.contant';
import axiosInstance from "services/restful.service";

export const fetchReport = () => {
  return axiosInstance
  .get('');
}
  