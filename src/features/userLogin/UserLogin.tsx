import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { postUser } from '../../api/putUserInput';
import { getUser } from '../../api/getSpecificUser';
import { GetUserResponse } from '../../types/user';
import styles from './UserLogin.module.css';

export const UserLogin = () => {
	const [userNameText, setUserNameText] = useState("");
	const [userPassText, setUserPassText] = useState("");
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
	const onChangeUserPass = (e: ChangeEvent<HTMLInputElement>) => {
		setUserPassText(e.target.value);
	};


	const onClickLogin = async () => {
		if (userNameText === "" || userPassText === "") return;
		setUserNameText(userNameText);
		setUserPassText(userPassText);
		// --- API通信処理
		setLoading(true);
		setError(null);

		const response: GetUserResponse = await getUser(userNameText, userPassText);
		if (!response || Object.keys(response).length === 0) {
			setError("ユーザ認証エラー");
			setLoading(false);
			return; // ログイン画面に留まる
		}
		navigate(`/home/${String(response.UserId)}`)
		console.log(response);
		setUserNameText("");
	}

	return (
		<div >
			<div><Link to={`/users/input`}>ユーザ登録へ</Link></div>
			<h2> ユーザログイン </h2>
			<p className="title">ユーザ名</p>
			<input placeholder="ユーザ名を入力" value={userNameText} onChange={onChangeUserText} />
			<p className="title">パスワード</p>
			<input placeholder="パスワードを入力" value={userPassText} onChange={onChangeUserPass} />
			<button onClick={onClickLogin}>ログイン</button>
		</div >
	)
}