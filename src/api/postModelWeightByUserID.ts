import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { PostModelResponse } from '../types/model';
const apiClient = axios.create({
	baseURL: 'http://localhost:8080/api'
});
//入力:userId: number | null, weight: number, month: number

//出力:
// {
// 	"response": "ok",
// }

export const MockPostModelWeightByUserID = async (userId: number, weight: number, month: number): Promise<PostModelResponse> => {
	console.log(`userId=${userId}, currentWeight=${weight},month=${month}`);
	return { model_id: 4 };
}

// 本物のAPIを叩く関数
export const fetchPostModelWeightByUserID = async (userId: number, weight: number, month: number) => {
	const url = 'model/${userId}';
	const response = await apiClient.post(url, null, {
		params: {
			weight: weight,
			month: month
		}
	});

	return response.data;

};


