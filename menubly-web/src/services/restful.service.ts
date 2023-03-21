import axios, {AxiosResponse} from 'axios';
import { HOST_URL } from 'constant/api.contant';

const axiosInstance = axios.create({
  baseURL: HOST_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Request-Origin': '*'
  }
});

export default axiosInstance;
export class RestfulService {
  static deleteApi = (
    url: string,
    body?: null
  ): Promise<AxiosResponse<null>> => {
    return axiosInstance
      .delete(url, {
        data: body ? body : null,
      })
      .then((res) => res)
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return error.response;
        }
      });
    };

  static postApi = (
      url: string,
      bodyData?: any): Promise<AxiosResponse<any>> => {
    return axiosInstance
      .post(url, bodyData)
      .then((res) => res)
      .catch(function (error) {
          if (error.response) {
              return error.response;
          }
      });
  };

  static postApiFormData = (url: string, bodyFormData: FormData) => {
    return axiosInstance
        .post(url, bodyFormData)
        .then((res) => res.data)
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return error.response.data;
            }
        });
  };
}

