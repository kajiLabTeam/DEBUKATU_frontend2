import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { WeightData } from '../types/weight';

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
export const getCurrentWeight = async (userId: string, modelId: string): Promise<WeightData> => {
    try {
        const response = await apiClient.get(`/weight/${userId}/${modelId}`);
        const dataArray = response.data as WeightData[];
        console.log(dataArray);
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            throw new UserApiError('NotFoundError');
        }
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