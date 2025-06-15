import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { PostWeightResponse } from '../types/weight';

const apiClient = axios.create({
	baseURL: 'http://localhost:8090/api'
});

//** APIエラー種別の型定義 
export type UserApiErrorType = 'NotFoundError' | 'InternalServerError' | 'UnexpectedError' | 'BadRequest';

export class UserApiError extends Error {
	constructor(public type: UserApiErrorType) {
		super(`API Error: ${type}`);
		this.name = 'UserApiError';
	}
}

export const MockPostCurrentWeightByUserID = async (userId: number, currentWeight: number, modelId: number): Promise<PostWeightResponse> => {
	console.log(`userId=${userId}, currentWeight=${currentWeight}, modelId=${modelId}`);
	return { weight_id: 1, };
}


// 本物のAPIを叩く関数
export const PostCurrentWeightByUserID = async (userId: number, modelId: number, current: number) => {
	try {
		const urlPath = `/weight/${userId}/${modelId}`;
		const response = await apiClient.post<PostWeightResponse>(
			urlPath,  // URLのパス部分
			null,
			{
				params: {
					current: current,
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
	};
}