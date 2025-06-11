
import { useState, ChangeEvent } from 'react';


export const CurrentWeightInput = () => {
	const [currentCalorie, setCurrentCalorie] = useState("");//現在の摂取カロリー
	const [currentWeight, setCurrentWeight] = useState("");

	const onChangeCurrentWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentWeight(e.target.value);
	};
	const onChangeCurrentCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentCalorie(e.target.value);
	};

	const onClickMustCalorieCal = () => {
		if (currentWeight === "" || currentCalorie === "") return;
		console.log({ currentWeight, currentCalorie });
	};

	return (
		<div className="calorie_input_area">
			<h2>現在体重の記録画面</h2>
			<p className="title">現在体重の入力画面</p>

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