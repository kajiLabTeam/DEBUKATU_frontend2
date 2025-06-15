import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { MockPostCurrentWeightByUserID } from '../../api/postCurrentWeightByModelID';
import { PostCurrentWeightByUserID } from '../../api/postCurrentWeightByModelID';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

export const CurrentWeightInput = () => {
	const [modelId, setModelId] = useState<number>(1);
	const [currentCalorie, setCurrentCalorie] = useState("");//現在の摂取カロリー
	const [currentWeight, setCurrentWeight] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { user_id: userIdStr } = useParams<{ user_id: string }>();
	const { model_id: modelIdStr } = useParams<{ model_id: string }>();

	const onChangeCurrentWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentWeight(e.target.value);
	};
	const onChangeCurrentCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentCalorie(e.target.value);
	};

	const onClickMemory = async () => {

		if (currentWeight === "") return;
		// --- API通信処理
		setLoading(true);
		setError(null);
		const response = await PostCurrentWeightByUserID(Number(userIdStr), modelId, Number(currentWeight),);
		navigate(`/home`)
		console.log(response);

	};

	return (
		<div className="calorie_input_area">
			<h2>現在体重の記録画面</h2>
			<p className="title">現在体重の入力画面</p>
			<ul>
				<li>ユーザID</li>
				<>{userIdStr}</>
				<li>モデルID</li>
				<>{modelIdStr}</>
			</ul>
			<ul>
				<li>現在の体重</li>
				<input placeholder="40" value={currentWeight} onChange={onChangeCurrentWeight} />kg
			</ul>
			{/* <ul>
				<li>現在のカロリー摂取量</li>
				<input placeholder="100" value={currentCalorie} onChange={onChangeCurrentCalorie} />kcal
			</ul> */}
			<button onClick={onClickMemory}>記録</button>
		</div>
	);
};