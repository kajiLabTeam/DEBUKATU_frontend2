import axios from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';
import { MockPostModelWeightByUserID } from '../../api/postModelWeightByUserID'
import { PostModelWeightByUserID } from '../../api/postModelWeightByUserID';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import styles from './modelWeightInput.module.css';

export const ModelWeightInput = () => {
	const [modelWeight, setModelWeight] = useState("");
	const [days, setDays] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { user_id: userIdStr } = useParams<{ user_id: string }>();


	const onChangeModelWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setModelWeight(e.target.value);
	};

	const onChangeDays = (e: ChangeEvent<HTMLInputElement>) => {
		setDays(e.target.value);
	};
	//決定ボタンPush
	const onClickCalorieCal = async () => {
		if (!userIdStr) {
			setError("URLにユーザーIDが含まれていません。");
			return;
		}
		if (modelWeight === "" || days === "") return;
		//useParamsから取得した文字列のuser_idを数値に変換します。
		const userId = parseInt(userIdStr, 10);
		if (isNaN(userId)) {
			setError("無効なユーザーIDです。");
			return;
		}
		// --- API通信処理
		setLoading(true);
		setError(null);
		const response = await PostModelWeightByUserID(userId, Number(modelWeight), Number(days));
		navigate(`/weight/${userId}/${response.model_id}"`)
		console.log(response);
	};

	return (
		<div className="weight_input_area">
			{/* <ul>
				<li>ユーザID</li>
				<>{userIdStr}</>
			</ul> */}
			<h2>理想体重の入力画面</h2>
			<p className="title">理想体重入力画面</p>

			<ul>
				<li>理想の体重 </li>
				<input placeholder="50" value={modelWeight} onChange={onChangeModelWeight} />kg
			</ul>
			<ul>
				<li>体重増加期間(日)</li>
				<input placeholder="100" value={days} onChange={onChangeDays} />日
			</ul>

			<button onClick={onClickCalorieCal}>決定</button>
		</div>
	);
};