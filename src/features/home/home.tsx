import { ChangeEvent, useState } from 'react';

export const Home = () => {
	const [mustCalorie, setMustCalorie] = useState("");//取らなければならないカロリー
	const [eatCount, setEatCount,] = useState("");//食事回数(出力)

	return (

		<div >
			<ul>
				<span>理想の体重までのカロリー摂取量</span>
				<span>{mustCalorie}</span>
			</ul>

			<ul>
				<span>追加の食事回数 </span>
				<span>{eatCount !== null ? `${eatCount} 回` : ''}</span>
			</ul>
		</div >
	);
};