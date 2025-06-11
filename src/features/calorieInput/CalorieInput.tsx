
import { useState, ChangeEvent } from 'react';


export const CalorieInput = () => {
	const [currentCalorie, setCurrentCalorie] = useState("");//現在の摂取カロリー
	const [mustCalorie, setMustCalorie] = useState("");//摂取しなければならないカロリー
	const [eatCount, setEatCount,] = useState("");//食事回数(出力)

	const onChangeCurrentCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentCalorie(e.target.value);
	};


	const onClickMustCalorieCal = () => {
		if (currentCalorie === "") return;
		console.log(currentCalorie);
	};

	const onClickEatCount = () => {
	};

	return (
		<div className="calorie_input_area">
			<h2>カロリー入力画面</h2>
			<p className="title">カロリー入力画面</p>
			<ul>
				<span>現在のカロリー摂取量</span>
				<input placeholder="100" value={currentCalorie} onChange={onChangeCurrentCalorie} />kcal
				<button onClick={onClickMustCalorieCal}>計算</button>
			</ul>
			<ul>
				<span>足りないカロリー("義務カロリー" - "現在のカロリー摂取量") </span>
				<span> {mustCalorie} {currentCalorie}</span>kcal
			</ul>
			<button onClick={onClickEatCount}>計算</button>
			<ul>
				<span>追加の食事回数 </span>
				<span>{eatCount !== null ? `${eatCount} 回` : ''}</span>
			</ul>
		</div>
	);
};