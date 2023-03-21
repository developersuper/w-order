import axios from "axios";
import { AuthLoginType } from "./../types/Auth.type";
import { AUTH, HOST_URL } from "../constant/api.contant";
import axiosInstance, { RestfulService } from "./restful.service";
import {
  NormalResponseError,
  UploadAvatarFormDataResult,
} from "types/Common.type";

const login = (user: AuthLoginType) => {
  return axiosInstance.post(HOST_URL + AUTH.SIGN_IN, user);
};

const logout = async () => {
  const hasCookie = 'a'
  if (!hasCookie) {
    return false;
  }
  const res = await RestfulService.deleteApi(AUTH.LOGOUT);
  if (res.status === 204) {
    localStorage.removeItem("user");
    return true;
  }
};

const forgotPassword = (payload: { username: string }) => {
  return axios.get(HOST_URL + AUTH.RESET_PASSWORD, {params: payload});
};

const resetPassword = (payload: { password: string, code: string }) => {
  return axios.post(HOST_URL + AUTH.RESET_PASSWORD, payload);
};

const updatePassword = (payload: {
  new_password: string;
  confirm_password: string;
}) => {
  return axiosInstance.put(HOST_URL + AUTH.PASSWORD, payload);
};
const updatePasscode = (payload: {
  old_passcode: string;
  new_passcode: string;
}) => {
  return axiosInstance.patch(HOST_URL + AUTH.PASSCODE, payload);
};

const updateProfile = (payload: {
  businessName: string;
  businessUrl: string;
  userId: string
}) => {
  return axiosInstance.put(HOST_URL + AUTH.USER_PROFILE(payload?.userId), payload);
};

const uploadFile = (userId: string, file: File, callback: any) => {
  let formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post(HOST_URL + AUTH.UPLOAD_FILE(userId), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }, onUploadProgress: (data: any) => {
      callback(Math.round((100 * data.loaded) / data.total))
    }}
  );
};

const uploadAvatarFinal = async (body: any) => {
  if (body) {
    const { avatar } = body;
    const res = await RestfulService.postApi(
      HOST_URL + AUTH.UPLOAD_AVATR_FINAL,
      { avatar }
    );
    return res.data;
  }
};

const uploadImageToAWS = async (body: FormData, url: string) => {
  if (body) {
    const res = await RestfulService.postApiFormData(url, body);
    return res.status;
  }
};

const uploadResource = async (body: any) => {
  if (body) {
    const { mime_type, file_extension } = body;
    const filePublic = body.public;
    const res = await RestfulService.postApi(HOST_URL + AUTH.UPLOAD_AVATAR, {
      mime_type,
      file_extension,
      public: filePublic,
    });
    return res.data;
  }
};

const refreshToken = (params: any) => {
  return axiosInstance.get(HOST_URL + AUTH.REFRESH_TOKEN, {params});
};

/**
 * Upload image to CDN
 * @param image
 * @param access_token token of current user
 * @param canvas is optional
 * @param onError
 * @param onSuccess callback to getting image path after uploading to CDN
 * */
const uploadImage = async (
  image: File,
  onSuccess: (path: string) => void,
  onError: (error: NormalResponseError | undefined) => void,
  canvas?: HTMLCanvasElement | undefined
) => {
  const re = /(?:\.([^.]+))?$/;
  const fileExtension = `.${re.exec(image.name)![1]}`;
  const fileType = image.type;
  //post resource metadata then get information for uploading CDN
  const resource = await uploadResource({
    public: true,
    mime_type: fileType,
    file_extension: fileExtension,
  });
  if (resource.error) {
    return onError(resource.error);
  }
  const uploadAvatarStateResult = resource as UploadAvatarFormDataResult;

  //prepare form for uploading to CDN
  const form: FormData = new FormData();
  form.append("AWSAccessKeyId", uploadAvatarStateResult.fields.AWSAccessKeyId);
  form.append("Content-Type", uploadAvatarStateResult.fields["Content-Type"]);
  form.append("acl", uploadAvatarStateResult.fields.acl);
  form.append("key", uploadAvatarStateResult.fields.key);
  form.append("policy", uploadAvatarStateResult.fields.policy);
  form.append("signature", uploadAvatarStateResult.fields.signature);
  form.append("tagging", uploadAvatarStateResult.fields.tagging);
  form.append(
    "x-amz-security-token",
    uploadAvatarStateResult.fields["x-amz-security-token"]
  );
  let file: Blob | undefined;
  if (canvas) {
    const blobBin = atob(canvas.toDataURL(fileType).split(",")[1]);
    const array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    file = new Blob([new Uint8Array(array)], { type: fileType });
  }

  form.append("file", file ?? image);

  await uploadImageToAWS(form, uploadAvatarStateResult.url)
    .then((result) => onSuccess(uploadAvatarStateResult.fields.key))
    .catch(onError);
};

const signup = (user: AuthLoginType) => {
  return axiosInstance.post(HOST_URL + AUTH.SIGN_UP, user);
};

const getProfileByUserId = (id: string, config: any) => {
  return axiosInstance.get(HOST_URL + AUTH.USER_PROFILE(id), config);
};

const updateProfileByUserId = (id: string, payload: any) => {
  return axiosInstance.put(HOST_URL + AUTH.USER_PROFILE(id), payload);
};

const AuthService = {
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  uploadImage,
  uploadAvatarFinal,
  updatePasscode,
  uploadFile,
  signup,
  getProfileByUserId,
  updateProfileByUserId,
  refreshToken
};

export default AuthService;
