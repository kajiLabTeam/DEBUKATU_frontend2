import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getMustCalorie } from '../caloriePerDay/userIdToMustCalorie';


export const Home = () => {
	const { user_id: userIdStr } = useParams<{ user_id: string }>();

	const [mustCalorie, setMustCalorie] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!userIdStr) {
			setError("ユーザーIDがURLに含まれていません");
			return;
		}

		getMustCalorie(userIdStr)
			.then((cal) => {
				setMustCalorie(cal);
			})
			.catch((err) => {
				console.error(err);
				setError("カロリーの取得に失敗しました");
			});
	}, [userIdStr]);

	if (error) {
		return <div>{error}</div>;
	}

	if (mustCalorie === null) {
		return <div>読み込み中...</div>;
	}

	// const [eatCount, setEatCount,] = useState("");//食事回数(出力)

	return (

		<div >
			<ul>
				<span>理想の体重までのカロリー摂取量</span>
				<span>{Math.floor(mustCalorie)}kcal</span>
			</ul>

			{/* <ul>
				<span>追加の食事回数 </span>
				<span>{eatCount !== null ? `${eatCount} 回` : ''}</span>
			</ul> */}
		</div >
	);
};