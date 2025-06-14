import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { MockPostCurrentWeightByUserID } from '../../api/postCurrentWeightByModelID';
import { useParams } from 'react-router';
export const CurrentWeightInput = () => {
	const [modelId, setModelId] = useState<number>(1);
	const [currentCalorie, setCurrentCalorie] = useState("");//現在の摂取カロリー
	const [currentWeight, setCurrentWeight] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { user_id } = useParams()

	const onChangeCurrentWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentWeight(e.target.value);
	};
	const onChangeCurrentCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentCalorie(e.target.value);
	};

	const onClickMustCalorieCal = async () => {
		if (currentWeight === "" || currentCalorie === "") return;
		// --- API通信処理
		setLoading(true);
		setError(null);

		try {
			const response = await MockPostCurrentWeightByUserID(Number(user_id), Number(currentWeight), modelId);
			console.log(response);
		} catch (apiError) {
			// API通信が失敗した場合の処理
			console.error("APIエラー:", apiError);
			setError("データの送信に失敗しました。時間をおいて再度お試しください。");

		} finally {
			// 成功しても失敗しても、必ず最後に実行される処理
			setLoading(false);
		}
	};

	return (
		<div className="calorie_input_area">
			<h2>現在体重の記録画面</h2>
			<p className="title">現在体重の入力画面</p>
			<ul>
				<li>ユーザID</li>
				<>{user_id}</>
			</ul>
			<ul>
				<li>現在の体重</li>
				<input placeholder="40" value={currentWeight} onChange={onChangeCurrentWeight} />kg
			</ul>
			<ul>
				<li>現在のカロリー摂取量</li>
				<input placeholder="100" value={currentCalorie} onChange={onChangeCurrentCalorie} />kcal
			</ul>
			<button onClick={onClickMustCalorieCal}>記録</button>
		</div>
	);
};