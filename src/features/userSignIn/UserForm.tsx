import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { postUser } from '../../api/putUserInput';
import styles from './userForm.module.css';

export const UserForm = () => {
    const [userNameText, setUserNameText] = useState("");
    const [userPassText, setUserPassText] = useState("");
    const [userAgeText, setUserAgeText] = useState("");
    const [userHeightText, setUserHeightText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [gender, setGender] = useState<"woman" | "man">("man");

    const navigate = useNavigate();

    const onChangeUserNameText = (e: ChangeEvent<HTMLInputElement>) => {
        setUserNameText(e.target.value);
    };
    const onChangeUserPassText = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPassText(e.target.value);
    };
    const onChangeUserAgeText = (e: ChangeEvent<HTMLInputElement>) => {
        setUserAgeText(e.target.value);
    };
    const onChangeUserHeightText = (e: ChangeEvent<HTMLInputElement>) => {
        setUserHeightText(e.target.value);
    };
    const onChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value as "woman" | "man");
    };


    //入力ボタン押したら
    const onClickInput = async () => {
        if (userNameText === "" || userPassText === "" || userAgeText === "" || userHeightText === "") return;
        // --- API通信処理
        setLoading(true);
        setError(null);

        // {"id": 1 }
        const response = await postUser(userNameText, userPassText, userAgeText, userHeightText, gender);
        navigate(`/model/${response.user_id}`)
        console.log(response);
        setUserNameText("");
        setUserPassText("");
        setUserAgeText("");
        setUserHeightText("");
    };


    return (
        <div className={styles.userForm}>

            <header className={styles.userFormHeader}>
                DEBUKATU
            </header>
            <main className={styles.mainContent}>
                <div className={styles.weightPlanCard}>
                    <p className="title">ユーザ登録</p>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>ユーザ名</span>
                        <input placeholder="ユーザ名を入力" value={userNameText} onChange={onChangeUserNameText} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>パスワード</span>
                        <input placeholder="パスワードを入力" value={userPassText} onChange={onChangeUserPassText} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>年齢</span>
                        <input placeholder="年齢を入力(歳)" value={userAgeText} onChange={onChangeUserAgeText} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>性別 </span>

                        <label>
                            <input type="radio" value="man" checked={gender === "man"} onChange={onChangeGender} />男性
                        </label>
                        <label>
                            <input type="radio" value="woman" checked={gender === "woman"} onChange={onChangeGender} />女性
                        </label>
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>身長</span>
                        <input placeholder="身長を入力 (cm)" value={userHeightText} onChange={onChangeUserHeightText} />
                    </div>
                    <button onClick={onClickInput}>登録</button>
                </div>
                <div><Link to={`/users`}>戻る</Link></div>
            </main>
        </div>

    )
}