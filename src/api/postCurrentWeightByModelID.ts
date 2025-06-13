import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { PostWeightResponse } from '../types/weight';

const apiClient = axios.create({
	baseURL: 'http://localhost:8080/api'
});
//入力: userId ,currentWeight,modelId

//出力:
// {weightId }
export const MockPostCurrentWeightByUserID = async (userId: number, currentWeight: number, modelId: number): Promise<PostWeightResponse> => {
	console.log(`(Mock) APCallI : userId=${userId}, currentWeight=${currentWeight}, modelId=${modelId}`);
	return { weight_id: 1, };
}


// 本物のAPIを叩く関数
export const fetchPostCurrentWeightByUserID = async (userId: number, currentWeight: number, modelId: number) => {
	const url = 'currentWeightInput/${userId}';
	const response = await apiClient.post(url, null, {
		params: {
			currentWeight: currentWeight,
			modelId: modelId
		}
	});

	return response.data;

};


