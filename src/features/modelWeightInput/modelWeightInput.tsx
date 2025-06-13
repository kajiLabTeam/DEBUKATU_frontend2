import axios from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';
import { MockPostModelWeightByUserID } from '../../api/postModelWeightByUserID'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

export const ModelWeightInput = () => {
	const [userId, setUserId] = useState<number | null>(1);
	const [modelWeight, setModelWeight] = useState("");
	const [lengthOfDays, setLengthOfDays] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { user_id } = useParams()

	const onChangeModelWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setModelWeight(e.target.value);
	};

	const onChangeLengthOfDays = (e: ChangeEvent<HTMLInputElement>) => {
		setLengthOfDays(e.target.value);
	};


	//計算ボタンPush
	const onClickCalorieCal = async () => {
		if (modelWeight === "" || lengthOfDays === "") return;
		// --- API通信処理
		setLoading(true);
		setError(null);

		try {
			const weightNum = Number(modelWeight);
			const monthNum = Number(lengthOfDays);
			const response = await MockPostModelWeightByUserID(userId, weightNum, monthNum);
			navigate(`/weight/${user_id}"`)
			console.log("APIからのレスポンス:", response);
			alert("データの送信に成功しました！"); // 成功したことをユーザーに通知

		} catch (apiError) {
			// API通信が失敗した場合の処理
			console.error("APIエラー:", apiError);
			setError("データの送信に失敗しました。時間をおいて再度お試しください。");

		} finally {
			// 成功しても失敗しても、必ず最後に実行される処理
			setLoading(false);
		}
		console.log({ modelWeight, lengthOfDays });

	};

	return (
		<div className="weight_input_area">
			<ul>
				<li>ユーザID</li>
				<>{user_id}</>
			</ul>
			<h2>理想体重の入力画面</h2>
			<p className="title">理想体重入力画面</p>

			<ul>
				<li>理想の体重 </li>
				<input placeholder="50" value={modelWeight} onChange={onChangeModelWeight} />kg
			</ul>
			<ul>
				<li>体重増加期間(月)</li>
				<input placeholder="1" value={lengthOfDays} onChange={onChangeLengthOfDays} />月
			</ul>

			<button onClick={onClickCalorieCal}>決定</button>
		</div>
	);
};