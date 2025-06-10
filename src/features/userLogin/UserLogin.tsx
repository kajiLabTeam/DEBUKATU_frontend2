import { ChangeEvent, useState } from 'react';

export const UserLogin = () => {
	const [userNameText, setUserNameText] = useState("");
	//テキストボックス入力時に入力内容をStateに設定
	const onChangeUserText = (e: ChangeEvent<HTMLInputElement>) => {
		setUserNameText(e.target.value);
	};

	//入力ボタン押したら
	const onClickInput = () => {
		if (userNameText === "") return;

		setUserNameText(userNameText);
		// 実際にはここでログイン処理などを呼び出す
		console.log(`${userNameText} さんがログインしました。`);
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
};