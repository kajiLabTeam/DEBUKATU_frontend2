import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { PostUserResponse } from '../types/user';

//** APIエラー種別の型定義 
export type UserApiErrorType = 'NotFoundError' | 'InternalServerError' | 'UnexpectedError' | 'BadRequest';

/** カスタムエラークラス */
export class UserApiError extends Error {
  constructor(public type: UserApiErrorType) {
    super(`API Error: ${type}`);
    this.name = 'UserApiError';
  }
}
// const apiClient = axios.create({
//   baseURL: '/api'
// });

const apiClient = axios.create({
  baseURL: 'http://localhost:8090/api'
});


export const postUserMock = async (userName: string): Promise<PostUserResponse> => {
  return { user_id: 25 }
}

// 本物のAPIを叩く関数
export const postUser = async (userName: string): Promise<PostUserResponse> => {
  try {
    const response = await apiClient.post<PostUserResponse>(
      '/users',  // URLのパス部分
      null,
      {
        params: {
          name: userName
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorMap: Record<number, UserApiErrorType> = {
        400: 'BadRequest', // バリデーションエラーなど
        404: 'NotFoundError',
        500: 'InternalServerError',
      };
      throw new UserApiError(errorMap[status || 0] || 'UnexpectedError');
    }
    // その他の予期せぬエラー
    console.error("An unexpected error occurred:", error);
    throw new UserApiError('UnexpectedError')
  }
};


