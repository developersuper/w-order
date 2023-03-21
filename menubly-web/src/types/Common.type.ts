export interface IObjectKeys {
  [key: string]: string | boolean | number | undefined;
}

export type ID = {
  id: string | number;
};

export type NormalResponseError = {
  error: {
    code: number;
    description: string;
    body_params: ValidateResponseError[];
    name: string;
  };
};

export type ValidateResponseError = {
  loc: string[];
  msg: string;
  type: string;
};

export interface ResponseDataType {
  items: any[];
  order: string;
  page: number;
  per_page: number;
  sort_by: string;
  total: number;
}

export interface RequestDataType {
  start_date?: Date | string;
  end_after?: Date | string;
  order?: string;
  per_page?: number;
  skip_pagination?: boolean;
  page?: number;
  type?: string;
  sort_by?: string;
}
export interface UploadAvatarFormDataResult {
  fields: UploadAvatarFormData;
  url: string;
}

export interface UploadAvatarFormData {
  AWSAccessKeyId: string;
  "Content-Type": string;
  acl: string;
  key: string;
  policy: string;
  signature: string;
  tagging: string;
  "x-amz-security-token": string;
}
