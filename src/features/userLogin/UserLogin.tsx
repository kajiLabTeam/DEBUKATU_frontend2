import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { postUser } from '../../api/putUserInput';
import { postUserMock } from '../../api/putUserInput';
import { getUser } from '../../api/getSpecificUser';
import { GetUserResponse } from '../../types/user';

export const UserLogin = () => {
	const [userNameText, setUserNameText] = useState("");
	const [userIDText, setUserIDText] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

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
		navigate(`/home/${String(response.UserId)}`)
		console.log(response);
		setUserIDText("");
	}

	return (
		<div >
			<h2> ユーザログイン画面 </h2>
			<p className="title">ユーザ登録</p>
			<input placeholder="ユーザ名を入力" value={userNameText} onChange={onChangeUserText} />
			<button onClick={onClickInput}>入力</button>

			<p className="title">ユーザログイン</p>
			<input placeholder="ユーザIDを入力" value={userIDText} onChange={onChangeUserID} />
			<button onClick={onClickLogin}>入力</button>
		</div >
	)
}