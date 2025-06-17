import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { postUser } from '../../api/putUserInput';
import { postUserMock } from '../../api/putUserInput';
import { getUser } from '../../api/getSpecificUser';
import { GetUserResponse } from '../../types/user';
import styles from './UserLogin.module.css';

export const UserLogin = () => {
	const [userNameText, setUserNameText] = useState("");
	const [userIDText, setUserIDText] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	// disabled の状態に応じてクラス名を組み立てる
	const buttonClasses = [
		styles.loginButton, // 基本のボタンスタイル
	].join(' '); // 配列をスペース区切りの文字列に変換


	const onChangeUserText = (e: ChangeEvent<HTMLInputElement>) => {
		setUserNameText(e.target.value);
	};
	const onChangeUserID = (e: ChangeEvent<HTMLInputElement>) => {
		setUserIDText(e.target.value);
	};

	//入力ボタン押したら
	const onClickInput = async () => {
		if (userNameText === "") return;
		setUserNameText(userNameText);
		// --- API通信処理
		setLoading(true);
		setError(null);

		// {"id": 1 }
		const response = await postUser(userNameText);
		navigate(`/model/${response.user_id}`)
		console.log(response);
		setUserNameText("");
	};

	const onClickLogin = async () => {
		if (userIDText === "") return;
		setUserIDText(userIDText);
		// --- API通信処理
		setLoading(true);
		setError(null);

		const response: GetUserResponse = await getUser(userIDText);
		if (!response || Object.keys(response).length === 0) {
			setError("ユーザ認証エラー");
			setLoading(false);
			return; // ログイン画面に留まる
		}
		navigate(`/model/${String(response.UserId)}`)
		console.log(response);
		setUserIDText("");
	}

	return (
		<div >
			<h2> ユーザログイン画面 </h2>
			<p className="title">ユーザ登録</p>
			<div className={styles.inputContainer}>
				<input
					placeholder="ユーザ名を入力"
					value={userNameText}
					onChange={onChangeUserText}
					className={styles.inputField}
				/>
				{/* ↓ button用のクラスを適用（buttonClasses変数は不要になります） */}
				<button className={styles.loginButton} onClick={onClickInput}>
					入力
				</button>
			</div>

			<p className="title">ユーザログイン</p>
			<div className={styles.inputContainer}>
				<input
					placeholder="ユーザIDを入力"
					value={userIDText}
					onChange={onChangeUserID}
					className={styles.inputField}
				/>
				<button className={styles.loginButton} onClick={onClickLogin}>
					入力
				</button>
			</div>
		</div >
	)
}