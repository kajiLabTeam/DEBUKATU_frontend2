import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'http://localhost:8080/api'
});
//入力: userId ,currentWeight,modelId

//出力:
// {weightId }
export const MockPostCurrentWeightByUserID = async (userId: number | null, currentWeight: number, modelId: number) => {
	console.log(`(Mock) API Call: userId=${userId}, currentWeight=${currentWeight}, modelId=${modelId}`);
	// 0.5秒待つことで、擬似的に通信時間をシミュレート
	await new Promise(resolve => setTimeout(resolve, 500));
	// 成功したかのようなレスポンスを返す
	return { "weight_id": 1, };
}

// 本物のAPIを叩く関数
export const fetchPostCurrentWeightByUserID = async (userId: number | null, currentWeight: number, modelId: number) => {
	const url = 'currentWeightInput/${userId}';
	const response = await apiClient.post(url, null, {
		params: {
			currentWeight: currentWeight,
			modelId: modelId
		}
	});

	return response.data;

};


