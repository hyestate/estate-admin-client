<template>
  <el-row>
    <el-select v-model="selectedRoleId" @change="handleSelectRole" placeholder="请选择角色">
      <el-option
        v-for="item in rolesItems"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-col>
      <el-select v-model="selectedTable" @change="handleSelectTable" placeholder="请选择表名">
        <el-option
          v-for="item in tableItems"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="selectedColumnName" @change="handleSelectColumn" placeholder="请选择字段名">
        <el-option
          v-for="item in columnNameItems"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-checkbox v-model="newRowSelectPriv">查询权限</el-checkbox>
      <el-checkbox v-model="newRowInsertPriv">插入权限</el-checkbox>
      <el-checkbox v-model="newRowUpdatePriv">更新权限</el-checkbox>
    </el-col>
    <el-button type="primary" @click="handleInsert">添加权限</el-button>
    <el-table :data="listItems">
      <el-table-column property="tableName" label="表名"></el-table-column>
      <el-table-column property="columnName" label="字段名"></el-table-column>
      <el-table-column label="查询权限">
        <template scope="scope">
          <el-checkbox v-model="scope.row.Select" @change="handleChange(scope.row)">查询权限</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="插入权限">
        <template scope="scope">
          <el-checkbox v-model="scope.row.Insert" @change="handleChange(scope.row)">插入权限</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="更新权限">
        <template scope="scope">
          <el-checkbox v-model="scope.row.Update" @change="handleChange(scope.row)">更新权限</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
  import globalConfig from "../../config.js"
  import api from '../../common/api.js';

  import ErrorTip from '../common/ErrorTip';

  export default {
    data() {
      return {
        rolesItems:[],
        selectedRoleId:"",

        tableItems:[],
        selectedTable:"",
        columnNameItems:[],
        selectedColumnName:"",
        listItems:[],

        newRowSelectPriv:false,
        newRowInsertPriv:false,
        newRowUpdatePriv:false,
      }
    },
    mounted() {
      this.fetchRoleItems();
      this.fetchTableItems();
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return 'success-row';
        } 
        return '';
      },
      handleInsert(){
        let flag=1;
        if(this.selectedRoleId=="" || this.selectedRoleId==undefined){
          this.$message.info("请选择角色");
          return;
        }
        if(this.selectedTable=="" || this.selectedTable==undefined){
          this.$message.info("请选择表名");
          return;
        }
        if(this.selectedColumnName=="" || this.selectedColumnName==undefined){
          this.$message.info("请选择字段名");
          return;
        }
        if(!this.newRowSelectPriv && !this.newRowInsertPriv &&!this.newRowUpdatePriv){
          this.$message.info("请至少选择一个权限");
          return;
        }
        let columnPrivs = [];
        if(this.newRowSelectPriv)
          columnPrivs.push("Select");
        if(this.newRowInsertPriv)
          columnPrivs.push("Insert");
        if(this.newRowUpdatePriv)
          columnPrivs.push("Update");
        let columnPrivsStr = columnPrivs.join(",");

        let that = this;
        /*
        let mutation = gql`mutation($token:String!,$item:String!){
                        insertSysPrivsColumn(token:$token,item:$item)
                      }`;

        this.$apollo.mutate({
          mutation: mutation,
          variables: {
              token:globalConfig.token,
              item:JSON.stringify({
                  roleid:this.selectedRoleId,
                  tableName:this.selectedTable,
                  columnName:this.selectedColumnName,
                  columnPriv:columnPrivsStr,
                }),
          },
        }).then(res => {
          let id = res.data.insertSysPrivsColumn;
          that.$message({
            message: '插入数据成功',
            type: 'success'
          });
          let newItem = {
            id:id,
            roleid:this.selectedRoleId,
            tableName:this.selectedTable,
            columnName:this.selectedColumnName,
            Select:this.newRowSelectPriv,
            Insert:this.newRowInsertPriv,
            Update:this.newRowUpdatePriv,
          };
          this.listItems.push(newItem);
          //为了方便对一个表多个字段添加
          //this.selectedTable="";
          this.selectedColumnName="";
          this.newRowSelectPriv=false;
          this.newRowInsertPriv=false;
          this.newRowUpdatePriv=false;
        }).catch(err => {
            console.log(err);
            that.$message.error('插入数据失败');
            if(err["graphQLErrors"]!=undefined && err["graphQLErrors"][0]["message"]=="invalid token"){
                console.log("invalid token");
                this.setCookie("token","", 2*3600);
                globalConfig.token = "";
                this.$store.commit("userStatus","notlogin");
                this.$router.push('/login');
            }else{
                alert(err.message);
            }
        });
        */
      },
      handleDelete(item){
        //每一行的数据对象
        console.log(item);
        //删除权限记录
        let that = this;
        /*
        let mutation = gql`mutation($token:String!,$where:String!){
                        deleteSysPrivsColumn(token:$token,where:$where)
                      }`;

        this.$apollo.mutate({
          mutation: mutation,
          variables: {
              token:globalConfig.token,
              where:JSON.stringify({id:item.id}),
          },
        }).then(res => {
          console.log(res);
          for(let i=0;i<that.listItems.length;i++){
            console.log(that.listItems[i].id,item.id);
            if(that.listItems[i].id==item.id){
              that.listItems.splice(i,1);
              break;
            }
          }
          that.$message({
            message: '删除数据成功',
            type: 'success'
          });
        }).catch(err => {
            console.log(err);
            if(err["graphQLErrors"]!=undefined && err["graphQLErrors"][0]["message"]=="invalid token"){
                console.log("invalid token");
                this.setCookie("token","", 2*3600);
                globalConfig.token = "";
                this.$store.commit("userStatus","notlogin");
                this.$router.push('/login');
            }else{
                that.$message.error('删除数据失败:'+err.message);
            }
        })
        */
      },
      handleChange(item){
        //每一行的数据对象
        console.log(item);
        let columnPrivs = [];
        if(item["Select"])
          columnPrivs.push("Select");
        if(item["Insert"])
          columnPrivs.push("Insert");
        if(item["Update"])
          columnPrivs.push("Update");
        let columnPrivsStr = columnPrivs.join(",");

        if(columnPrivsStr==""){
          //删除权限记录
          let that = this;
          /*
          let mutation = gql`mutation($token:String!,$where:String!){
                          deleteSysPrivsColumn(token:$token,where:$where)
                        }`;

          this.$apollo.mutate({
            mutation: mutation,
            variables: {
                token:globalConfig.token,
                where:JSON.stringify({id:item.id}),
            },
          }).then(res => {
            console.log(res);
            that.$message({
              message: '更新数据成功',
              type: 'success'
            });
            for(let i=0;i<that.listItems.length;i++){
              if(that.listItems[i].id==item.id){
                that.listItems.splice(i,1);
                break;
              }
            }
          }).catch(err => {
              console.log(err);
              that.$message.error('更新数据失败');
              if(err["graphQLErrors"]!=undefined && err["graphQLErrors"][0]["message"]=="invalid token"){
                  console.log("invalid token");
                  this.setCookie("token","", 2*3600);
                  globalConfig.token = "";
                  this.$store.commit("userStatus","notlogin");
                  this.$router.push('/login');
              }else{
                  alert(err.message);
              }
          })
          */

        }else{
          //修改权限记录
          let that = this;
          /*
          let mutation = gql`mutation($token:String!,$update:String!,$where:String!){
                          updateSysPrivsColumn(token:$token,update:$update,where:$where){
                            id,
                            columnPriv,
                          }
                        }`;

          this.$apollo.mutate({
            mutation: mutation,
            variables: {
                token:globalConfig.token,
                update:JSON.stringify({columnPriv:columnPrivsStr}),
                where:JSON.stringify({id:item.id}),
            },
          }).then(res => {
            that.$message({
              message: '更新数据成功',
              type: 'success'
            });
          }).catch(err => {
              console.log(err);
              that.$message.error('更新数据失败');
              if(err["graphQLErrors"]!=undefined && err["graphQLErrors"][0]["message"]=="invalid token"){
                  console.log("invalid token");
                  this.setCookie("token","", 2*3600);
                  globalConfig.token = "";
                  this.$store.commit("userStatus","notlogin");
                  this.$router.push('/login');
              }else{
                  alert(err.message);
              }
          })
          */

        }
      },
      handleSelectRole(selectedRoleId){
        this.fetchPrivsColumnItems(selectedRoleId);
      },
      async fetchRoleItems() {
        let that = this;
        let rsp = await api.getTableDatas("sys_roles");
        if(rsp.status==200){
          that.rolesItems = rsp.data.rows;
        }else{
          console.log("fetchRoleItems error:",rsp);
        }
      },
      
      async fetchTableItems(){
        let that = this;
        let rsp = await api.showTables();
        console.log("showTables",rsp);
        if(rsp.status==200){
            that.tableItems = rsp.data;
        }else{
            console.log("showTables error",rsp);
        }
      },
      handleSelectTable(selectedTable){
        this.fetchColumns(selectedTable);
        this.selectedColumnName="";
      },
      async fetchColumns(tableName){
        let rsp = await api.getTableDesc(tableName)
        console.log("showTables",rsp)
        if(rsp.status==200){
          rsp.data.forEach(element => {
            this.columnNameItems.push(element.column_name)
          });
        }else{
            console.log("showTables error",rsp)
        }
        /*
        let that = this;
        this.$http.get(globalConfig.descTableUrl, {params:{table:tableName}}).then((res) => {
          if(res.status==200){
            that.columnNameItems = res.body;
          }else{
            that.$message.error("获取字段名列表失败,status:"+res.status);
          }
        }, (e) => {
            console.log(e);
            that.$message.error("获取字段名列表失败,error:"+e.message);
        });
        */

      },
      handleSelectColumn(selectedColumnName){
        console.log(selectedColumnName);
      },
      fetchPrivsColumnItems(roleId) {
        let that = this;
        /*
        let query = gql`query($token:String!,$pageSize:Int!,$where:String!){
          sysPrivsColumns(token:$token,pageSize:$pageSize,where:$where){
            count,
            sysPrivsColumns{
              id,
              roleid,
              tableName,
              columnName,
              columnPriv,
              createdAt,
              updatedAt
            }
          }
        }
        `;

        this.$apollo.query({
            query: query,
            variables: {
                token:globalConfig.token,
                pageSize:1000,
                where:JSON.stringify({roleid:roleId}),
            },
            fetchPolicy: 'network-only',
        }).then(res => {
            console.log(res);
            let respData = {};
            let queryKey = "";
            for(let key in res.data){
                queryKey = key;
                respData=res.data[queryKey];
            }
            let datas = respData[queryKey];
            that.listItems=[];
            for(let i in datas ){
              let originItem = datas[i];
              let newItem = {
                id:originItem.id,
                tableName:originItem.tableName,
                columnName:originItem.columnName,
                Select:originItem.columnPriv.indexOf("Select")!=-1,
                Insert:originItem.columnPriv.indexOf("Insert")!=-1,
                Update:originItem.columnPriv.indexOf("Update")!=-1,
                Delete:originItem.columnPriv.indexOf("Delete")!=-1,
              };
              that.listItems.push(newItem);
            }
        }).catch(err => {
            console.log(err);
            if(err["graphQLErrors"]!=undefined && err["graphQLErrors"][0]["message"]=="invalid token"){
                console.log("invalid token");
                this.setCookie("token","", 2*3600);
                globalConfig.token = "";
                this.$store.commit("userStatus","notlogin");
                this.$router.push('/login');
                //this.$router.push("/home");
            }else{
                console.log(err);
                alert(err.message);
            }
        })
        */
      }
    },
    components: {
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

