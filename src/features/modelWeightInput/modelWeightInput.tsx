import { useState, ChangeEvent } from 'react';

export const ModelWeightInput = () => {


	const [modelWeight, setModelWeight] = useState("");
	const [lengthOfDays, setLengthOfDays] = useState("");


	const onChangeModelWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setModelWeight(e.target.value);
	};


	const onChangeLengthOfDays = (e: ChangeEvent<HTMLInputElement>) => {
		setLengthOfDays(e.target.value);
	};


	//計算ボタンPush
	const onClickCalorieCal = () => {
		if (modelWeight === "" || lengthOfDays === "") return;
		console.log({ modelWeight, lengthOfDays });
	};

	return (
		<div className="weight_input_area">
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