import { Routes, Route, Link, Navigate } from 'react-router';
import { HomePage } from './pages/home';
import { UserLoginPage } from './pages/userLogin';
import { ModelWeightInputPage } from './pages/modelWeightInput';
import * as CurrentWeightInput from './pages/currentWeight';
import { UserSignInPage } from './pages/userSignIn';
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
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="users" />} />
          <Route path="/users/" element={<UserLoginPage />} />
          <Route path='/users/input' element={<UserSignInPage />} />
          <Route path="/model/:user_id" element={<ModelWeightInputPage />} />
          <Route path="/weight/:user_id/:model_id" element={<CurrentWeightInput.CalorieInputPage />} />
          <Route path="/home/:user_id" element={<HomePage />} />
        </Routes>
      </main>
      <footer>

        <nav style={navStyle}>
          <Link to="/users" style={linkStyle}>ログアウト</Link>
        </nav>
      </footer>
    </>


  );
};


export default App;
