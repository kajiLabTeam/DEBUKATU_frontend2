import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { MockPostCurrentWeightByUserID } from '../../api/postCurrentWeightByModelID';
import { PostCurrentWeightByUserID } from '../../api/postCurrentWeightByModelID';
import { Navigate, useParams } from 'react-router';
import { useNavigate } from 'react-router';
import styles from './current.module.css';

export const CurrentWeightInput = () => {
	const [modelId, setModelId] = useState<number>(1);
	const [currentCalorie, setCurrentCalorie] = useState("");//現在の摂取カロリー
	const [currentWeight, setCurrentWeight] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { user_id: userIdStr } = useParams<{ user_id: string }>();
	const { model_id: modelIdStr } = useParams<{ model_id: string }>();
	if (!userIdStr) {
		return <Navigate to="/users" replace />;
	}


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
		const response = await PostCurrentWeightByUserID(Number(userIdStr), Number(modelIdStr), Number(currentWeight),);
		navigate(`/home/${userIdStr}`)
		console.log(response);

	};

	return (
		<div className={styles.current}>

			<header className={styles.currentHeader}>
				DEBUKATU
			</header>

			<main className={styles.mainContent}>
				<div className={styles.weightPlanCard}>
					<p className="title">現在体重の入力</p>
					<div className={styles.currentItem}>
						<span className={styles.label}>現在体重</span>
						<span className={styles.value}></span>
						<input placeholder="40" value={currentWeight} onChange={onChangeCurrentWeight} />kg
					</div>
					<button onClick={onClickMemory}>記録</button>
				</div>
			</main>
		</div>
	);
};