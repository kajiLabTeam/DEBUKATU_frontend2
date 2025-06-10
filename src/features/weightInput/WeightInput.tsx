import { useState, ChangeEvent } from 'react';

export const WeightInput = () => {
	const [currentWeight, setCurrentWeight] = useState("");
	const [modelWeight, setModelWeight] = useState("");
	const [lengthOfDays, setLengthOfDays] = useState("");
	const [mustCalorie, setMustCalorie] = useState("");


	const onChangeCurrentWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentWeight(e.target.value);
	};

	const onChangeModelWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setModelWeight(e.target.value);
	};


	const onChangeLengthOfDays = (e: ChangeEvent<HTMLInputElement>) => {
		setLengthOfDays(e.target.value);
	};

	const onChangeMustCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setMustCalorie(e.target.value);
	};
	//計算ボタンPush
	const onClickCalorieCal = () => {
		if (currentWeight === "" || modelWeight === "" || lengthOfDays === "") return;
		console.log({ currentWeight, modelWeight, lengthOfDays });
	};

	return (
		<div className="weight_input_area">
			<h2>体重入力画面</h2>
			<p className="title">体重入力画面</p>

			<ul>
				<li>現在の体重</li>
				<input placeholder="40kg" value={currentWeight} onChange={onChangeCurrentWeight} />
			</ul>
			<ul>
				<li>理想の体重 </li>
				<input placeholder="50kg" value={modelWeight} onChange={onChangeModelWeight} />
			</ul>
			<ul>
				<li>体重増加期間（日）</li>
				<input placeholder="180日" value={lengthOfDays} onChange={onChangeLengthOfDays} />
			</ul>

			<button onClick={onClickCalorieCal}>計算</button>
			<ul>
				<span>理想の体重までのカロリー摂取量</span>
				<span>{mustCalorie} </span>
			</ul>
		</div>
	);
};