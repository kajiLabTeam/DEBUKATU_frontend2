import axios from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';
import { MockPostModelWeightByUserID } from '../../api/postModelWeightByUserID'
import { PostModelWeightByUserID } from '../../api/postModelWeightByUserID';
import { Navigate, useParams } from 'react-router';
import { useNavigate } from 'react-router';
import styles from './model.module.css'

export const ModelWeightInput = () => {
	const [modelWeight, setModelWeight] = useState("");
	const [days, setDays] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { user_id: userIdStr } = useParams<{ user_id: string }>();


	const onChangeModelWeight = (e: ChangeEvent<HTMLInputElement>) => {
		setModelWeight(e.target.value);
	};

	const onChangeDays = (e: ChangeEvent<HTMLInputElement>) => {
		setDays(e.target.value);
	};
	//決定ボタンPush
	const onClickCalorieCal = async () => {
		if (!userIdStr) {
			setError("URLにユーザーIDが含まれていません。");
			return <Navigate to="/users" replace />;
		}
		if (modelWeight === "" || days === "") return;
		//useParamsから取得した文字列のuser_idを数値に変換します。
		const userId = parseInt(userIdStr, 10);
		if (isNaN(userId)) {
			setError("無効なユーザーIDです。");
			return;
		}
		// --- API通信処理
		setLoading(true);
		setError(null);
		const response = await PostModelWeightByUserID(userId, Number(modelWeight), Number(days));
		navigate(`/weight/${userId}/${response.model_id}`)
		console.log(response);
	};

	return (
		<div className={styles.modelContainer}>
			<header className={styles.modelHeader}>
				DEBUKATU
			</header>
			<main className={styles.mainContent}>
				<div className={styles.weightPlanCard}>
					<p className="title">理想体重の入力</p>

					<div className={styles.inputGroup}>
						<span className={styles.label}>理想体重</span>
						<input placeholder="50" value={modelWeight} onChange={onChangeModelWeight} />kg
					</div>
					<div className={styles.inputGroup}>
						<span className={styles.label}>体重増加期間(日)</span>
						<input placeholder="100" value={days} onChange={onChangeDays} />日
					</div>
					<button onClick={onClickCalorieCal}>決定</button>
				</div>
			</main >

			<footer>

			</footer>
		</div >
	);
};