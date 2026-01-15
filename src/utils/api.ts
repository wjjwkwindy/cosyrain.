import request from '@/utils/request';

// *******************示例*******************
// 定义接口返回的数据类型（根据实际后端结构调整）
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 定义具体的业务数据类型
export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
}

/**
 * 获取用户信息示例
 * @param id 用户ID
 */
export function getUserInfo(id: number) {
  // request<T> 中的 T 是响应数据的类型
  return request.get<any, ApiResponse<UserInfo>>(`/users/${id}`);
}

/**
 * 提交数据示例
 * @param data 表单数据
 */
export function updateProfile(data: Partial<UserInfo>) {
  return request.post<any, ApiResponse<null>>('/users/profile', data);
}

// *******************正式接口*******************
/**
 * 获取aqi数据
 * @returns 
 */
export function getAqicnData() {
  return request.get(
    'https://api.waqi.info/feed/chengdu/?token=c82d68eb615a837f5f17b7f8196783b8845879ba'
  );
}
