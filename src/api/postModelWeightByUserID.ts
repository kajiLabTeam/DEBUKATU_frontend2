import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { PostModelResponse } from '../types/model';
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

export const MockPostModelWeightByUserID = async (userId: number, weight: number, days: number): Promise<PostModelResponse> => {
	console.log(`userId=${userId}, currentWeight=${weight},days=${days}`);
	return { model_id: 4 };
}

// 本物のAPIを叩く関数
export const PostModelWeightByUserID = async (userId: number, weight: number, days: number): Promise<PostModelResponse> => {
	try {
		const urlPath = `/model/${userId}`;
		const response = await apiClient.post<PostModelResponse>(
			urlPath,  // URLのパス部分
			null,
			{
				params: {
					weight: weight,
					days: days
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

