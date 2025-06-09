import { ChangeEvent, useState, useEffect } from 'react';
import { ListItem } from './components/ListItem';
import axios, { AxiosResponse } from 'axios';
import type { User } from "./types/user";

import * as userLogin from './features/userLogin/userLogin';
import * as WeightInput from './features/weightInput/weightInput';
import * as CalorieInput from './features/calorieInput/calorieInput';

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
      <userLogin.UserLogin />
      <WeightInput.WeightInput />
      <CalorieInput.CalorieInput />

      {user.map(user => (
        <ListItem key={user.id} id={user.id} name={user.name} />
      ))}
    </>


  );
};


export default App;
