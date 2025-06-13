import { ChangeEvent, useState, useEffect, use } from 'react';
import axios from 'axios';
import { PostUserResponse } from '../types/user';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export const postUserInputMock = async (userName: string): Promise<PostUserResponse> => {
  return { user_id: 25 }
}

// 本物のAPIを叩く関数
export const fetchUsers = async (userName: string) => {

  //loginに変更したい
  const userNameResponse = await apiClient.post('/users?name=$user_name', { userName: userName });
  return userNameResponse.data;

};


