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
        <Link to="/users" style={linkStyle}>ログイン</Link>
        <Link to="/model" style={linkStyle}>理想体重入力</Link>
        <Link to="/weight" style={linkStyle}>現在の体重入力</Link>
        <Link to="/home" style={linkStyle}>ホーム</Link>
      </nav>


      {/* メインコンテンツエリア */}
      <main>
        <Routes>
          <Route path="/users/" element={<UserLoginPage />} />
          <Route path="/model/:user_id" element={<ModelWeightInputPage />} />
          <Route path="/weight/:user_id/" element={<CurrentWeightInput.CalorieInputPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>
    </>


  );
};


export default App;
