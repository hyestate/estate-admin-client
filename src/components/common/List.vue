<template>
    <ErrorTip v-if="notAccess" msg="您无权限访问哟~"></ErrorTip>
    <el-row v-else>
        <!-- 查询选项 -->
        <el-row :gutter="24" class="pb15">
            <div v-if="searchelemt.length > 0" v-for="(item,index) in searchelemt" :key="index">
                <!-- 单选框类型 -->
                <el-col v-if="item.type == 'radio' && item.isAutocomplete == false" :span="6" :width="item.width" class="pb25">
                    <div class="el-input el-input-group el-input-group--prepend">
                        <div class="el-input-group__prepend">{{item.title}}</div>
                        <el-select v-model="item.value[item.name].value" clearable>
                            <el-option
                                v-for="i in item.option"
                                :key="i.label"
                                :label="i.label"
                                :value="i.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <!-- 多级选择框类型 -->
                <el-col v-if="item.type == 'cascader' && item.isAutocomplete == false" :span="6" :width="item.width" class="pb25">
                    <div class="el-input el-input-group el-input-group--prepend">
                        <div class="el-input-group__prepend">{{item.title}}</div>
                        <el-cascader
                            :placeholder="item.ph"
                            :options="item.options"
                            v-model="selectedOptions"
                            change-on-select
                            clearable
                            @change="handleSelectedOptions">
                        </el-cascader>
                    </div>
                </el-col>
                <!-- input框类型 -->
                <el-col v-if="item.type == 'input'" :span="6" class="pb25">
                    <el-input :placeholder="item.ph" v-model="item.value">
                        <template slot="prepend">{{item.title}}</template>
                    </el-input>
                </el-col>
                <!-- 日期时间范围类型 -->
                <el-col v-if="item.type == 'daterange'" :span="16" class="pb15">
                    <div class="el-input el-input-group el-input-group--prepend">
                        <div class="el-input-group__prepend">{{item.title}}</div>
                        <el-date-picker
                            v-model="item.value"
                            type="daterange"
                            align="right"
                            :placeholder="item.ph"
                            :picker-options="pickerOptions1"
                            style="width: 220px">
                        </el-date-picker>
                    </div>
                </el-col>
            </div>
            <!-- 按钮 -->
            <el-col :span="6" class="pb15">
                <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" class="pb15">
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-col>
        </el-row>

        <!-- table列表 -->
        <el-row :gutter="24" class="pb15">
            <el-col :span="24">
                <el-table :data="items" border style="width:100%;">
                    <template v-for="(tableItem, tableIndex) in tableHeaders">
                        <el-table-column :property="tableItem.column_name" :label="tableItem.column_comment" :width="120"></el-table-column>
                    </template>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button v-for="(item,index) in config.actionConfig" size="small" @click="handleAction(scope.$index, scope.row,item.path,item.action)">{{item.name}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!-- 分页 -->
        <el-row :gutter="24" style="padding: 5px 0;">
            <el-col :span="24" style="text-align: right;">
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.currentPage"
                        :page-sizes="[10, 15, 20, 25, 30, 40, 50]"
                        :page-size="pagination.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pagination.total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <!-- 详情弹窗 -->
        <!-- <detailDialog :item="item"></detailDialog> -->
    </el-row>
</template>

<script>
    import templateConfigs from '../../templateConfigs';
    import globalConfig from "../../config.js"
    import ErrorTip from '../common/ErrorTip';
    import api from '../../common/api.js';
    //import gql from 'graphql-tag'

    export default {
        name:"v-list",
        data() {
            //pros属性直接就赋给this了,不需要data函数再进行赋值了
            console.log(this.type);
            console.log(this.$route.meta);
            //let type = this.$route.meta.type;
            let config = templateConfigs[this.type];
            console.log("config:",this.type,config);
            return { 
                //type:type,
                tableName:this.type,
                notAccess:false,
                config:config,
                searchelemt:[],
                tableelemt:[],
                items:[],
                tableHeaders:[],
                item:{},

                //分页
                pagination: {
                    total:0,
                    pageSize:10,
                    currentPage:1
                },
                selectedOptions:[],
            };
        },
        props: {
            'type':String,
        },
        
        async mounted() {
            console.log(this.type);
            console.log(this.config);
            this._initSearchElemt();
            await this.fetchTableHeaders();
            this.fetchItems(this.pagination.currentPage);
        },
        watch: {
            //这个watch是全局的,任何两个页面的跳转都会触发
            $route(to,from) {
                if(to.path!="/templateList")
                    return;
                //不一样的页面进行刷新数据
                console.log(to, from);
                console.log(to.query.type, from.query.type);
                if(to.query.type!=undefined && to.query.type != from.query.type) {
                    let type = to.query.type;
                    let config = templateConfigs[type];
                    let newData = { 
                        type:type,
                        notAccess:false,
                        config:config,
                        searchelemt:[],
                        tableelemt:[],
                        items:[],
                        item:{},

                        //分页
                        pagination: {
                            total:0,
                            pageSize:10,
                            currentPage:1
                        },
                        selectedOptions:[],
                    };
                    for(let key in newData){
                        this[key]=newData[key];
                    }
                    this.fetchItems(this.pagination.currentPage);
                }else if(from.path=="/templateModify" ){

                    let updateDataItem = this.$store.state.updateDataItem;
                    //编辑数据成功返回列表刷新数据
                    if(updateDataItem!=undefined && updateDataItem!=""){
                        console.log("updateDataItem",updateDataItem);
                        for(let i in this.items){
                            let item = this.items[i];
                            if(item.id==updateDataItem.id){
                                let newItem = JSON.parse(JSON.stringify(item));
                                for(let fieldName in updateDataItem){
                                    //item[fieldName]=updateDataItem[fieldName];
                                    newItem[fieldName]=updateDataItem[fieldName];
                                }
                                //this.items.splice(i,1,newItem);
                                this.$set(this.items,i,newItem);
                                break;
                            }
                        }
                        this.$store.commit("set_updateDataItem","");
                    }
                    let insertDataItem = this.$store.state.insertDataItem;
                    if(insertDataItem!=undefined && insertDataItem!=""){
                        //this.items.push(insertDataItem);
                        this.$set(this.items,this.items.length,insertDataItem);
                        this.$store.commit("insertDataItem","");
                    }

                }else{
                    console.log("watch route no match");
                }
            }
        },
        // computed的数据是没有双向绑定的
        computed: {
            pickerOptions1() {
                for(let i in this.searchelemt) {
                    // 如果有时间日期范围选择器，则遍历
                    if(this.searchelemt[i].type == 'daterange') {
                        return {
                            shortcuts: [{
                                text: '最近一周',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                    picker.$emit('pick', [start, end]);
                                }
                            }, {
                                text: '最近一个月',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                    picker.$emit('pick', [start, end]);
                                }
                            }, {
                                text: '最近三个月',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                    picker.$emit('pick', [start, end]);
                                }
                            }]
                        } 
                    }
                }
            }
        },
        beforeRouteLeave(to, from, next){
            console.log("beforeRouteLeave",to,from);
            next();
        },
        methods: {
            // 渲染搜索元素
            _initSearchElemt() {
                console.log("_initSearchElemt");
                let searchelemt = []
                if(this.config.searchConfig.length) {
                    for(let item of this.config.searchConfig) {
                        if(item.type == 'input') {
                            searchelemt.push(item);
                        }
                        if(item.type == 'radio') {
                            searchelemt.push(item);
                        }
                        if(item.type == 'cascader') {
                            searchelemt.push(item);
                        }
                        if(item.type == 'daterange') {
                            searchelemt.push(item);
                        }
                    }
                }
                this.searchelemt = searchelemt;
            },
            // 查
            handleSearch() {
                this.pagination.currentPage=1;
                this.pagination.total=0;
                this.fetchItems(this.pagination.currentPage);
            },
            // 增
            handleAdd() {
                let path = this.config.route.modifyPath;
                console.log(path,this.config.route);
                this.$router.push({ 
                    path: path,
                    query:{
                        type:this.type,
                        tabName: `新增${this.config.title}`,
                        btn_flag: true // 若在本页通过按钮点击跳转页面，则重置跳转的页面状态
                    }
                });
            },
            handleAction(index, row, path,action){
                console.log("handleAction",index,row,path,action);
                let id = row.id;
                let that = this;
                if(action=="delete"){
                    this.$confirm('确定删除该条数据吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type:'warning'
                    }).then(async ()=>{
                        let rsp = await api.delTableData(this.tableName,id)
                    }).catch((e)=>{
                        console.log(e);
                        // do nothing
                        console.log("取消");
                    })

                }else{
                    this.$router.push({ 
                        path: path,
                        query:{
                            id: id,
                            type: this.type,
                            action:action,
                            tabName: `编辑${this.config.title}`,
                            btn_flag: true // 若在本页通过按钮点击跳转页面，则重置跳转的页面状态
                        }
                    });
                }
                
            },
            // 分页-页数改变
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.fetchItems(this.pagination.currentPage);
            },
            // 分页-当前页数改变
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                this.fetchItems(this.pagination.currentPage);
            },
            // 日期格式化
            _formatDate(strTime, type) {
                const date = new Date(strTime);
                let mydate = date.getFullYear()+"-"+this._appendZero((date.getMonth()+1))+"-"+this._appendZero(date.getDate());
                if(type == 'datetime') {
                    mydate += " "+this._appendZero(date.getHours())+":"+this._appendZero(date.getMinutes())+":"+this._appendZero(date.getSeconds());
                }else if(type == 'time'){
                    mydate = this._appendZero(date.getHours())+":"+this._appendZero(date.getMinutes())+":"+this._appendZero(date.getSeconds());
                }
                return mydate;
            },
            // 日期格式化-补零
            _appendZero(val) {
                if(val < 10) {
                    return `0${val}`;
                }else{
                    return val;
                }
            },
            // 多级选择框赋值
            handleSelectedOptions(val) {
                // for(let item of this.config.searchConfig) {
                //     if(item.type == 'cascader') {
                //         // let j = 0;
                //         // for(let i in item.value) {
                //         //     console.log(this.search,i,'this.search[i]')
                //         //     if(val[j]) {
                //         //         this.search[i].value = val[j];
                //         //     }
                //         //     ++j;
                //         // }
                //         // if(val[0]) {
                //         //     this.search.offend_type2.value = val[0];
                //         // }else{
                //         //     this.search.offend_type2.value = '';
                //         // }
                //         // if(val[1]) {
                //         //     this.search.offend_type3.value = val[1];
                //         // }else{
                //         //     this.search.offend_type3.value = '';
                //         // }
                //     }
                // }
            },
            async fetchTableHeaders(){
                console.log("fetchTableHeaders:",this.type);
                let rsp = await api.getTableDesc(this.type);
                if(rsp.status==200){
                    this.tableHeaders=rsp.data;
                }else{
                    console.log("fetchTableHeaders error:",rsp);
                }
            },
            async fetchItems(page) {
                let that = this;
                console.log("fetchItems");

                //*
                // 查询条件 todo
                
                let search = {};
                console.log("searchelemt:",this.searchelemt);
                for(let index in this.searchelemt) {
                    let ele = this.searchelemt[index];
                    let value = ele.value;
                    let name = ele.name
                    let type = ele.type;
                    let opt = ele.operator;
                    //console.log(ele);
                    /*
                    if(type=="daterage" && value!=undefined && typeof(value)=="array" && value.length==2 && value[0]!=undefined && value[0]!="" && value[1]!=undefined && value[1]!=""){
                        search[name]={
                            $gte:value[0],
                            $lte:value[1],
                        }
                    }else{
                        

                    }
                    */
                    if(opt=="="){
                        if(value!=undefined && value!="")
                            search[name]={
                                $eq:value,
                            }
                    }else if(opt=="like"){
                        if(value!=undefined && value!="")
                            search[name]={
                                $like: '%'+value+'%',
                            }
                    }else if(opt=="range"){
                        console.log(value);
                        console.log(typeof(value));
                        if(value!=undefined && typeof(value)=="object" && value.length==2 && value[0]!=undefined && value[0]!="" && value[1]!=undefined && value[1]!=""){
                            search[name]={
                                $gte:value[0],
                                $lte:value[1],
                            }
                        }
                    }
                }
                console.log("search:",search);
                //*/
                console.log(this.config);

                let rsp = await api.getTableDatas(this.tableName);
                console.log(this.tableName,"rsp:",rsp);

                if(rsp.status==200){
                    that.pagination.total = rsp.data.count;
                    that.items=rsp.data.rows;
                    console.log(rsp)
                    console.log(that.items);
                }else{
                    console.log("error");
                }
            }
        },
        components: {
            ErrorTip
        }
    }
</script>

<style>
    .m-detail-color{
        color:#20a0ff;
        cursor: pointer;
    }
    .m-title-detail{
        height:40px;
        line-height: 40px;
        font-size: 16px;
        background-color: rgb(235, 235, 235);
        margin-bottom: 10px;
        margin-top: 20px;
        padding:0 10px;
    }
    .m-dialog .el-col{
        padding:0 10px;
    }
    .m-dialog .el-dialog__body{
        padding-top: 0;
    }
    .m-imgBox{
        width:200px;
        height:auto;
        border-radius: 5px;
        float:left;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>