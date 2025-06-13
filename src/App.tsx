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
        <Link to="/modelWeightInput" style={linkStyle}>理想体重入力</Link>
        <Link to="/currentWeightInput" style={linkStyle}>現在の体重入力</Link>
        <Link to="/home" style={linkStyle}>ホーム</Link>
      </nav>


      {/* メインコンテンツエリア */}
      <main>
        <Routes>
          <Route path="/userLogin" element={<UserLoginPage />} />
          <Route path="/modelWeightInput/:user_id" element={<ModelWeightInputPage />} />
          <Route path="/currentWeightInput" element={<CurrentWeightInput.CalorieInputPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>

      {/* {user.map(user => (
        <ListItem key={user.id} id={user.id} name={user.name} />
      ))} */}
    </>


  );
};


export default App;
