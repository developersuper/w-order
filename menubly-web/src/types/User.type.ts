export interface UserType {
  id: number;
  email: string;
  name: string;
  time_zone: string;
  avatar_url: string;
  language: string;
  has_login_account: boolean;
  dob: string;
  first_name: string;
  last_name: string;
  gender?: string;
  accessToken?: string;
}

export interface ReportType {
  attendance_percentage: number;
  total_class: number;
  total_time_spent: number;
}

export interface UploadResourceArgsType {
  public: boolean;
  mime_type: string;
  file_extension: string;
}

export interface UploadAvatarFinalArgsType {
  avatar: string;
}