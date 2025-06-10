import { Routes, Route, Link } from 'react-router';
import { HomePage } from './pages/home';
import { UserLoginPage } from './pages/userLogin';
import { WeightInputPage } from './pages/weightInput';
import { CalorieInputPage } from './pages/calorieInput';


import { ChangeEvent, useState, useEffect, use } from 'react';
import { ListItem } from './components/ListItem';
import axios, { AxiosResponse } from 'axios';
import type { User } from "./types/user";


// ナビゲーション用の簡単なスタイル
const navStyle = {
  padding: '1rem',
  borderBottom: '1px solid #ccc',
  marginBottom: '1rem',
};

const linkStyle = {
  marginRight: '1rem',
};

export const App = () => {

  // // 取得したユーザ情報
  // const [user, setUser] = useState<User[]>([]);
  // // 画面表示時にユーザ情報取得
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/users").then((res: AxiosResponse<User[]>) => {
  //     setUser(res.data);
  //   })

  // }, []);


  return (
    <>
      {/* 全ページ共通のナビゲーション */}
      <nav style={navStyle}>
        <Link to="/userLogin" style={linkStyle}>ログイン</Link>
        <Link to="/home" style={linkStyle}>ホーム</Link>
        <Link to="/weightInput" style={linkStyle}>体重入力</Link>
        <Link to="/calorieInput" style={linkStyle}>カロリー入力</Link>
      </nav>


      {/* メインコンテンツエリア */}
      <main>
        <Routes>
          <Route path="/userLogin" element={<UserLoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/weightInput" element={<WeightInputPage />} />
          <Route path="/calorieInput" element={<CalorieInputPage />} />

        </Routes>
      </main>

      {/* {user.map(user => (
        <ListItem key={user.id} id={user.id} name={user.name} />
      ))} */}
    </>


  );
};


export default App;
