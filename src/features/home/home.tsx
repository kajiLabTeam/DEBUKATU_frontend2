import { Link, Navigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getMustCalorie } from '../caloriePerDay/userIdToMustCalorie';
import { getCurrentModel } from '../../api/getCurrentModelData';
import styles from './home.module.css';


export const Home = () => {
	const { user_id: userIdStr } = useParams<{ user_id: string }>();

	const [mustCalorie, setMustCalorie] = useState<number | null>(null);
	const [kisotaisya, setKisotaisya] = useState<number | null>(null);
	const [modelId, setModelId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	if (!userIdStr) {
		return <Navigate to="/users" replace />;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cal = await getMustCalorie(userIdStr);
				setMustCalorie(cal.mustPerCalorie);
				setKisotaisya(cal.Kisotaisya);

				const model = await getCurrentModel(userIdStr);
				setModelId(model.ModelId);
			} catch (err) {
				console.error(err);
				setError("データの取得に失敗しました");
			}
		};

		fetchData();
	}, [userIdStr]);

	if (error) {
		return <div>{error}</div>;
	}

	if (mustCalorie === null) {
		return <div>読み込み中...</div>;
	}

	// const [eatCount, setEatCount,] = useState("");//食事回数(出力)

	return (
		<div className={styles.homeContainer}>
			<header className={styles.homeHeader}>
				DEBUKATU
			</header>


			<main className={styles.mainContent}>
				<div className={styles.weightPlanCard}>
					<div className={styles.inputGroup}>
						<span className={styles.label}>1日の追加カロリー</span>
						<span className={styles.value}>  {Math.floor(mustCalorie)}kcal</span>
					</div>
					<div className={styles.operator}>+</div>
					<div className={styles.inputGroup}>
						<span className={styles.label}>基礎代謝量</span>
						<span>  {kisotaisya !== null ? Math.floor(kisotaisya) : "計算中..."}kcal</span>
					</div>
					<div className={styles.divider}></div>
					<div className={styles.inputGroup}>
						<span>最低限摂取すべきカロリー</span>
						<span>  {(mustCalorie !== null && kisotaisya !== null)
							? Math.floor(mustCalorie + kisotaisya)
							: "計算中..."}kcal</span>
					</div>
				</div>
				<div><Link to={`/model/${userIdStr}`}>体重目標の入力へ</Link></div>
				<div><Link to={`/weight/${userIdStr}/${modelId}`}>現在の体重の更新へ</Link></div>
			</main>
		</div>

	);
};