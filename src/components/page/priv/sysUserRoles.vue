<template>
  <el-row>
    <el-col>
      <el-select v-model="selectedUserId" @change="handleSelectUser" placeholder="请选择用户名">
        <el-option
          v-for="item in usersItems"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="selectedRoleId" @change="handleSelectRole" placeholder="请选择角色名">
        <el-option
          v-for="item in rolesItems"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-button type="primary" @click="handleInsert">关联用户角色</el-button>
    <el-table :data="listItems">
      <el-table-column property="userName" label="用户名"></el-table-column>
      <el-table-column property="roleName" label="角色名"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
  import globalConfig from "../../../config.js"
  import ErrorTip from '../../common/ErrorTip';
  //import gql from 'graphql-tag'
  import api from '../../../common/api.js';

  export default {
    data() {
      return {
        rolesItems:[],
        selectedRoleId:"",
        selectedRoleName:"",

        usersItems:[],
        selectedUserId:"",
        selectedUserName:"",

        listItems:[],

      }
    },
    mounted() {
      this.fetchRoleItems();
      this.fetchUserItems();
      this.fetchListItems();
    },
    methods: {
      handleSelectUser(userid){
        let obj = this.usersItems.find((item)=>{
          return item.id === userid;
        });
        this.selectedUserName = obj.name;
      },
      handleSelectRole(roleid){
        let obj = this.rolesItems.find((item)=>{
          return item.id === roleid;
        });
        this.selectedRoleName = obj.name;
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return 'success-row';
        } 
        return '';
      },
      fetchListItems(){
        let that = this;
        /*
        let query = gql`query($token:String!,$pageSize:Int!){
          sysUserRoles(token:$token,pageSize:$pageSize){
            count,
            sysUserRoles{
              id,
              userid,
              roleid,
              userName,
              roleName,
              createdAt,
              updatedAt,
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
          let items = [];
          for(let i in respData[queryKey])
            items.push(respData[queryKey][i]);
          this.listItems = items;
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
      },
      handleInsert(){
        if(this.selectedUserId=="" || this.selectedUserId==undefined){
          this.$message.info("请选择用户名");
          return;
        }
        if(this.selectedRoleId=="" || this.selectedRoleId==undefined){
          this.$message.info("请选择角色");
          return;
        }

        console.log(this.selectedRoleId,this.selectedUserId);
        
        let that = this;
        /*
        let mutation = gql`mutation($token:String!,$item:String!){
                        insertSysUserRole(token:$token,item:$item)
                      }`;

        this.$apollo.mutate({
          mutation: mutation,
          variables: {
              token:globalConfig.token,
              item:JSON.stringify({
                  userid:this.selectedUserId,
                  roleid:this.selectedRoleId,
                }),
          },
        }).then(res => {
          console.log(res);
          let id = res.data.insertSysUserRoles;
          that.$message({
            message: '插入数据成功',
            type: 'success'
          });
          let newItem = {
            id:id,
            userid:this.selectedUserId,
            roleid:this.selectedRoleId,
            userName:this.selectedUserName,
            roleName:this.selectedRoleName,
          };
          console.log(this.listItems);
          this.listItems.push(newItem);
          //为了方便对一个用户添加多个角色
          this.selectedRoleId="";
        }).catch(err => {
            console.log(err);
            if(err["graphQLErrors"]!=undefined && err["graphQLErrors"][0]["message"]=="invalid token"){
              console.log("invalid token");
              this.setCookie("token","", 2*3600);
              globalConfig.token = "";
              this.$store.commit("userStatus","notlogin");
              this.$router.push('/login');
            }else{
              that.$message.error('插入数据失败:'+err.message);
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
                        deleteSysUserRole(token:$token,where:$where)
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
            message: '数据成功',
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
      
      async fetchRoleItems() {
        let rsp = await api.getTableDatas("sys_roles");
        console.log("rsp:",rsp);

        if(rsp.status==200){
            this.rolesItems=rsp.data.rows
        }else{
            console.log("error");
        }
      },
      async fetchUserItems(){
        let rsp = await api.getTableDatas("sys_users");
        console.log("rsp:",rsp);

        if(rsp.status==200){
            this.usersItems=rsp.data.rows
        }else{
            console.log("error");
        }
        

      },
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

