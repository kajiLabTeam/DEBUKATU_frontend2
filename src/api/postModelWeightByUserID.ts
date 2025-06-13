import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'http://localhost:8080/api'
});
//入力:userId: number | null, weight: number, month: number

//出力:
// {
// 	"response": "ok",
// }

export const MockPostModelWeightByUserID = async (userId: number | null, weight: number, month: number) => {
	console.log(`(Mock) API Call: userId=${userId}, weight=${weight}, month=${month}`);
	// 0.5秒待つことで、擬似的に通信時間をシミュレート
	await new Promise(resolve => setTimeout(resolve, 500));
	// 成功したかのようなレスポンスを返す
	return { "response": "ok", };
}

// 本物のAPIを叩く関数
export const fetchPostModelWeightByUserID = async (userId: number | null, weight: number, month: number) => {
	const url = 'model/${userId}';
	const response = await apiClient.post(url, null, {
		params: {
			weight: weight,
			month: month
		}
	});

	return response.data;

};


