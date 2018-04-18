import axios from 'axios';

let base = 'http://localhost:8080/tobuyns';

//export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
//
//export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

//用户管理使用到的接口
//分页查询用户信息
export const getUserListPage = params => { return axios.get(`${base}/user/getUsersByPageIndex`, { params: params }); };

//分页查询用户信息，增加了按用户名查询
export const getUserList = params => { return axios.post(`${base}/user/getUerList`, params).then(res => res.data); };
//增加用户信息
export const addUser = params => { return axios.post(`${base}/user/saveUser`, params).then(res => res.data); };
//删除用户信息
export const removeUser = params => { return axios.get(`${base}/user/deleteUser`, { params: params }); };
//批量删除用户信息
export const batchRemoveUser = params => { return axios.post(`${base}/user/batchDeleteUser`, params).then(res => res.data); };
//修改用户信息
export const editUser = params => { return axios.post(`${base}/user/updateUser`, params).then(res => res.data); };