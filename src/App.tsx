import { useState, useEffect } from 'react';
import './App.css';
import { ListItem } from './components/ListItem';
import axios, { AxiosResponse } from 'axios';

// ユーザー情報の型を定義
type User = {
  id: number;
  name: string;
  // 必要に応じて他のプロパティも追加
};

export const App = () => {
  //取得したユーザ情報
  const [users, setUsers] = useState<User[]>([]);

  //画面表示時にユーザ情報取得
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res: AxiosResponse<User[]>) => {
      setUsers(res.data);
    })

  }, []);

  return (
    <div>
      <h2> ユーザログイン画面 </h2>
      {users.map(user => (
        <ListItem key={user.id} id={user.id} name={user.name} />
      ))}
      <p className="title">ユーザログイン画面</p>
      <input placeholder="ユーザ名を入力" value="50" />
      <button>入力</button>
    </div>
  );
};


export default App;
