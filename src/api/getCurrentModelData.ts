import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { ModelData } from '../types/model';

//** APIエラー種別の型定義 
export type UserApiErrorType = 'NotFoundError' | 'InternalServerError' | 'UnexpectedError' | 'BadRequest';

/** カスタムエラークラス */
export class UserApiError extends Error {
    constructor(public type: UserApiErrorType) {
        super(`API Error: ${type}`);
        this.name = 'UserApiError';
    }
}

const apiClient = axios.create({
    baseURL: 'http://localhost:8090/api'
});

// 本物のAPIを叩く関数
export const getCurrentModel = async (userId: string): Promise<ModelData> => {
    try {
        const response = await apiClient.get(`/model/${userId}`);
        const dataArray: ModelData[] = response.data;
        console.log(dataArray);
        return response.data[dataArray.length - 1];
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