import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { postUser } from '../../api/putUserInput';
import { postUserMock } from '../../api/putUserInput';

export const UserLogin = () => {
	const [userNameText, setUserNameText] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const onChangeUserText = (e: ChangeEvent<HTMLInputElement>) => {
		setUserNameText(e.target.value);
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

	return (
		<div >
			<h2> ユーザログイン画面 </h2>
			<p className="title">ユーザログイン画面</p>
			<input placeholder="ユーザ名を入力" value={userNameText} onChange={onChangeUserText} />
			<button onClick={onClickInput}>入力</button>
		</div >
	)
}