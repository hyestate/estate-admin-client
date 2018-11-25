
import axios from 'axios';

let api={};

api.getTableDatas = async function (tableName){
    let rsp = await axios.get(`http://127.0.0.1:9001/${tableName}`);
    console.log("getTableDatas",tableName,rsp);
    return rsp;
}

//获取表头
api.getTableDesc = async function (tableName){
    return await axios.get(`http://127.0.0.1:9001/descTable/${tableName}`);
}


export default api;