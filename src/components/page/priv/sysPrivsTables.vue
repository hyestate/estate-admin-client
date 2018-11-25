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
      <el-select v-model="selectedTable" placeholder="请选择表名">
        <el-option
          v-for="item in tableItems"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-checkbox v-model="newRowSelectPriv">查询权限</el-checkbox>
      <el-checkbox v-model="newRowInsertPriv">插入权限</el-checkbox>
      <el-checkbox v-model="newRowUpdatePriv">更新权限</el-checkbox>
      <el-checkbox v-model="newRowDeletePriv">删除权限</el-checkbox>
    </el-col>
    <el-button type="primary" @click="handleInsert">添加权限</el-button>
    <el-table :data="listItems">
      <el-table-column property="tableName" label="表名"></el-table-column>
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
      <el-table-column label="删除权限">
        <template scope="scope">
          <el-checkbox v-model="scope.row.Delete" @change="handleChange(scope.row)">删除权限</el-checkbox>
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
  import ErrorTip from '../../components/ErrorTip';
  import gql from 'graphql-tag'
  export default {
    data() {
      return {
        rolesItems:[],
        selectedRoleId:"",
        tableItems:[],
        selectedTable:"",

        newRowSelectPriv:false,
        newRowInsertPriv:false,
        newRowUpdatePriv:false,
        newRowDeletePriv:false,

        listItems:[],
      }
    },
    mounted() {
      this.fetchRoleItems();
      this.fetchTableItems();
    },
    methods: {
      fetchTableItems(){
        let that = this;
        this.$http.get(globalConfig.showTablesUrl, []).then((res) => {
          if(res.status==200){
            that.tableItems = res.body;
          }else{
            that.$message.error("获取表名列表失败,status:"+res.status);
          }
        }, (e) => {
            console.log(e);
            that.$message.error("获取表名列表失败,error:"+e.message);
        });

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
        if(!this.newRowSelectPriv && !this.newRowInsertPriv &&!this.newRowUpdatePriv && !this.newRowDeletePriv){
          this.$message.info("请至少选择一个权限");
          return;
        }
        let privs = [];
        if(this.newRowSelectPriv)
          privs.push("Select");
        if(this.newRowInsertPriv)
          privs.push("Insert");
        if(this.newRowUpdatePriv)
          privs.push("Update");
        if(this.newRowDeletePriv)
          privs.push("Delete");
        let privsStr = privs.join(",");

        let that = this;
        let mutation = gql`mutation($token:String!,$item:String!){
                        insertSysPrivsTable(token:$token,item:$item)
                      }`;

        this.$apollo.mutate({
          mutation: mutation,
          variables: {
              token:globalConfig.token,
              item:JSON.stringify({
                  roleid:this.selectedRoleId,
                  tableName:this.selectedTable,
                  tablePriv:privsStr,
                }),
          },
        }).then(res => {
          console.log(res);
          let id = res.data.insertSysPrivsTable;
          that.$message({
            message: '插入数据成功',
            type: 'success'
          });
          let newItem = {
            id:id,
            roleid:this.selectedRoleId,
            tableName:this.selectedTable,
            Select:this.newRowSelectPriv,
            Insert:this.newRowInsertPriv,
            Update:this.newRowUpdatePriv,
            Delete:this.newRowDeletePriv,
          };
          this.listItems.push(newItem);
          this.selectedTable="";
          this.newRowSelectPriv=false;
          this.newRowInsertPriv=false;
          this.newRowUpdatePriv=false;
          this.newRowDeletePriv=false;
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
      },
      handleDelete(item){
        //每一行的数据对象
        console.log(item);
        //删除权限记录
        let that = this;
        let mutation = gql`mutation($token:String!,$where:String!){
                        deleteSysPrivsTable(token:$token,where:$where)
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
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return 'success-row';
        } 
        return '';
      },
      handleChange(item){
        //每一行的数据对象
        console.log(item);
        let privs = [];
        if(item["Select"])
          privs.push("Select");
        if(item["Insert"])
          privs.push("Insert");
        if(item["Update"])
          privs.push("Update");
        if(item["Delete"])
          privs.push("Delete");
        let privsStr = privs.join(",");

        if(privsStr==""){
          //删除权限记录
          let that = this;
          let mutation = gql`mutation($token:String!,$where:String!){
                          deleteSysPrivsTable(token:$token,where:$where)
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

        }else{
          //修改权限记录
          let that = this;
          let mutation = gql`mutation($token:String!,$update:String!,$where:String!){
                          updateSysPrivsTable(token:$token,update:$update,where:$where){
                            id,
                          }
                        }`;

          this.$apollo.mutate({
            mutation: mutation,
            variables: {
                token:globalConfig.token,
                update:JSON.stringify({tablePriv:privsStr}),
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

        }
      },
      handleSelectRole(selectedRoleId){
        this.fetchPrivsTableItems(selectedRoleId);
      },
      fetchRoleItems() {
        let that = this;
        let query = gql`query($token:String!,$pageSize:Int!){
          sysRoles(token:$token,pageSize:$pageSize){
            count,
            sysRoles{
              id,
              name,
            }
          }
        }
        `;

        this.$apollo.query({
            query: query,
            variables: {
                token:globalConfig.token,
                pageSize:1000,
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
            that.rolesItems=[];
            for(let i in datas ){
              that.rolesItems.push(datas[i]);
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
      },
      fetchPrivsTableItems(roleId) {
        let that = this;
        let query = gql`query($token:String!,$pageSize:Int!,$where:String!){
          sysPrivsTables(token:$token,pageSize:$pageSize,where:$where){
            count,
            sysPrivsTables{
              id,
              roleid,
              tableName,
              tablePriv,
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
                Select:originItem.tablePriv.indexOf("Select")!=-1,
                Insert:originItem.tablePriv.indexOf("Insert")!=-1,
                Update:originItem.tablePriv.indexOf("Update")!=-1,
                Delete:originItem.tablePriv.indexOf("Delete")!=-1,
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

