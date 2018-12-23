
import axios from 'axios';

let api={};

//获取表头
api.getTableDesc = async function (tableName){
    return await axios.get(`http://127.0.0.1:9001/descTable/${tableName}`);
}

//获取表头
api.showTables = async function (){
    return await axios.get(`http://127.0.0.1:9001/showTables`);
}


api.getTableDatas = async function (tableName){
    //let rsp = await axios.get(`http://127.0.0.1:9001/${tableName}`);
    let rsp = await axios.get(`http://127.0.0.1:9001/common/query?tableName=${tableName}`);
    console.log("getTableDatas",tableName,rsp);
    return rsp;
}

api.getTableDataById = async function (tableName,id){
    //let rsp = await axios.get(`http://127.0.0.1:9001/${tableName}`);
    let rsp = await axios.get(`http://127.0.0.1:9001/common/queryById?tableName=${tableName}&id=${id}`);
    console.log("getTableDatas",tableName,rsp);
    return rsp;
}

api.addTableData = async function(tableName,item){
    let rsp = await axios.post(`http://127.0.0.1:9001/common/create`,{tableName:tableName,item:JSON.stringify(item)});
    console.log("addTableData",tableName,rsp);
    return rsp;
}

api.updateTableData = async function(tableName,item,condition){
    console.log("updateTableData",tableName,item,condition)
    let rsp = await axios.post(`http://127.0.0.1:9001/common/update`,{tableName:tableName,item:JSON.stringify(item),condition:JSON.stringify(condition)});
    console.log("addTableData",tableName,rsp);
    return rsp;
}

api.delTableData = async function(tableName,id){
    let rsp = await axios.get(`http://127.0.0.1:9001/common/delete?tableName=${tableName}&id=${id}`);
    console.log("addTableData",tableName,rsp);
    return rsp;
}



export default api;