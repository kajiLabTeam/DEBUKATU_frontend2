import axios from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';
import { MockPostModelWeightByUserID } from '../../api/postModelWeightByUserID'
import { PostModelWeightByUserID } from '../../api/postModelWeightByUserID';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import styles from './modelWeightInput.module.css';

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
			return;
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
		navigate(`/weight/${userId}/${response.model_id}"`)
		console.log(response);
	};

	return (
		<div className="container">
			<main>
				<div className={styles.formContent}>
					{/* エラーがあれば表示する */}
					{error && <p className={styles.errorMessage}>{error}</p>}

					{/* 理想の体重入力フォーム */}
					<WeightInputRow
						label="理想の体重"
						id="idealWeight"
						placeholder="50"
						value={modelWeight}
						onChange={(e) => setModelWeight(e.target.value)}
						unit="kg"
						isDisabled={loading}
					/>

					{/* 体重増加期間入力フォーム */}
					<WeightInputRow
						label="体重増加期間"
						id="period"
						placeholder="6"
						value={days}
						onChange={(e) => setDays(e.target.value)}
						unit="ヶ月"
						isDisabled={loading}
					/>
				</div>

				<button onClick={onClickCalorieCal}>決定</button>
			</main >
		</div >
	);
};