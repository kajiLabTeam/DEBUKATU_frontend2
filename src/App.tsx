import { ChangeEvent, useState, useEffect } from 'react';
import { ListItem } from './components/ListItem';
import axios, { AxiosResponse } from 'axios';
import type { User } from "./types/user";

import { UserLogin } from './features/userLogin/UserLogin';
import { WeightInput } from './features/weightInput/WeightInput';
import { CalorieInput } from './features/calorieInput/CalorieInput';

export const App = () => {

  // 取得したユーザ情報
  const [user, setUser] = useState<User[]>([]);
  // 画面表示時にユーザ情報取得
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res: AxiosResponse<User[]>) => {
      setUser(res.data);
    })

  }, []);


  return (
    <>
      <UserLogin />
      <WeightInput />
      <CalorieInput />

      {user.map(user => (
        <ListItem key={user.id} id={user.id} name={user.name} />
      ))}
    </>


  );
};


export default App;
