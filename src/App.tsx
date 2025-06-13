import { Routes, Route, Link } from 'react-router';
import { HomePage } from './pages/home';
import { UserLoginPage } from './pages/userLogin';
import { ModelWeightInputPage } from './pages/modelWeightInput';
import * as CurrentWeightInput from './pages/currentWeight';

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
  return (
    <>
      {/* 全ページ共通のナビゲーション */}
      <nav style={navStyle}>
        <Link to="/userLogin" style={linkStyle}>ログイン</Link>
        <Link to="/modelWeightInput" style={linkStyle}>理想体重入力</Link>
        <Link to="/currentWeightInput" style={linkStyle}>現在の体重入力</Link>
        <Link to="/home" style={linkStyle}>ホーム</Link>
      </nav>


      {/* メインコンテンツエリア */}
      <main>
        <Routes>
          <Route path="/userLogin" element={<UserLoginPage />} />
          <Route path="/modelWeightInput/:user_id" element={<ModelWeightInputPage />} />
          <Route path="/currentWeightInput/:user_id/" element={<CurrentWeightInput.CalorieInputPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>
    </>


  );
};


export default App;
