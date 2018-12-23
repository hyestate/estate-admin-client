<template>
    <el-row>
        <el-row>
            {{tabName}}
        </el-row>
        <el-row :gutter="20" class="m-form-wrapper">
            <el-form :model="form" :rules="formRule" ref="rulesForm" label-width="130px">
                <el-row v-for="(category,cindex) in config.categoryConfig" :key="cindex">
                    <el-col :span="24" class="m-title">
                        <span class="m-h3">{{category}}</span>
                    </el-col>
                    <!-- input框类型 --><!--:key="arrayItem.key" -->
                    <template v-for="item in inputelemt" v-if="inputelemt.length > 0 && item.category == category">
                        <el-col v-if="item.dataType && item.dataType == 'array'" :span="item.width" style="position:relative;">
                            <el-form-item 
                                v-for="(arrayItem, arrayIndex) in form[item.name]"
                                :key="arrayIndex"
                                :label="item.title"
                                :prop="'account.' + arrayIndex + '.value'"
                                :rules="{required:true, message:'用户问题账号不能为空', trigger:'blur'}">
                                <el-input v-model="arrayItem.value"></el-input>
                                <div style="position:absolute; right:-80px; top:0;">
                                    <el-button :disabled="form[item.name].length <= 1" @click.prevent="handledeleteInputbox(arrayItem, item.name)">删除</el-button>
                                </div>
                            </el-form-item>
                            <el-button @click.prevent="handleAddInputbox(item.name)" style="position:absolute; right:-160px; bottom:22px;">增加</el-button>
                        </el-col>
                        <el-col v-else :span="item.width">
                            <el-form-item :label="item.title" :prop="item.name">
                                <el-input v-model="form[item.name]"></el-input>
                            </el-form-item>
                        </el-col>
                    </template>
                    <!-- 单选类型 -->
                    <el-col v-for="(item,index) in radioelemt" :key="category+'radio'+index" v-if="radioelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item :label="item.title" :prop="item.name">
                            <el-radio-group v-model="form[item.name]">
                                <el-radio
                                    v-for="i in item.options"
                                    :key="i.value"
                                    :label="i.label"
                                    >
                                    {{i.value}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <!-- 多选类型 -->
                    <el-col v-for="(item,index) in checkboxelemt" :key="category+'checkbox'+index" v-if="checkboxelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item :label="item.title" :prop="item.name">
                            <el-checkbox-group v-model="form[item.name]" :placeholder="item.ph">
                                <el-checkbox
                                    v-for="i in item.options"
                                    :key="i.value"
                                    :label="i.label"
                                    >
                                    {{i.value}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                    <!-- 下拉类型 -->
                    <el-col v-for="(item,index) in selectelemt" :key="category+'select'+index" v-if="selectelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item :label="item.title" :prop="item.name">
                            <el-select v-model="form[item.name]" :placeholder="item.ph">
                                <el-option
                                    v-for="i in item.options"
                                    :key="i.value"
                                    :label="i.label"
                                    :value="i.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!-- 时间类型 -->
                    <el-col v-for="(item,index) in selectdateelemt" :key="category+'selectdate'+index" v-if="selectdateelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item :label="item.title" :prop="item.name">
                            <el-date-picker
                                v-model="form[item.name]"
                                type="date"
                                :placeholder="item.ph" 
                                >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!-- cascader级联选择器类型 -->
                    <el-col v-for="(item,index) in cascaderelemt" :key="category+'cascadr'+index" v-if="cascaderelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item :label="item.title">
                          <el-cascader
                            v-model="form[item.name]"
                            :options="item.options"
                            >
                          </el-cascader>
                        </el-form-item>
                    </el-col>

                    <!-- 长文本框类型 -->
                    <el-col v-for="(item,index) in textareaelemt" :key="category+'textarea'+index" v-if="textareaelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item v-if="item.category == category" :label="item.title" :prop="item.name">
                            <el-input :type="item.type" v-model="form[item.name]"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 截图 -->
                    <el-col v-for="(item,index) in imgelemt" :key="category+'image'+index" v-if="imgelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item :label="item.title" :prop="item.name" :key="index" >
                            <el-upload
                                :action="uploadPicUrl"
                                list-type="picture-card"
                                multiple
                                accept=".jpg,.png"
                                name="upload_file"
                                :file-list="form[item.name]"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handlePictureCardRemove"
                                :before-upload="handleBeforeUpload"
                                :on-success="(response, file, fileList)=>{handleUploadSuccess(response, file, fileList, item.name)}"
                                >
                                <i class="el-icon-plus m-icon"></i>
                            </el-upload>
                            <el-dialog  size="tiny">
                                <img width="100%" src="" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                    <!-- 选择关联其他表的数据 -->
                    <el-col v-for="(item,index) in relationelemt" :key="category+'relation'+index" v-if="relationelemt.length > 0 && item.category == category" :span="item.width">
                        <el-form-item v-if="item.category == category" :label="item.title" :prop="item.name">
                            <span>{{item.value.join(",")}}</span>
                            <el-table :data="form[item.name]" border style="width:100%;">
                                <template v-for="(tableItem, tableIndex) in item.tableConfig">
                                    <el-table-column :property="tableItem.name" :label="tableItem.title" :width="tableItem.width"></el-table-column>
                                </template>
                            </el-table>
                            <el-button type="primary" @click="handlePickDatas(item.tableName,form[item.name],item.searchConfig,item.tableConfig,item.itemsGql,item.selectType)">选择{{item.title}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">{{actionName}}</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <!-- 图片预览 -->
        <LightBox :images="LightBoxImgs" ref="LightBox"></LightBox>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
    </el-row>

</template>

<script>
    import templateConfigs from '../../templateConfigs';

    //import archiveCascader from '../../components/archiveCascader';
    import globalConfig from "../../config.js"
    //import LightBox from '../../lib/LightBox';
    import LightBox from 'vue-image-lightbox'
    import { ENUM_VALUE_DEFINITION } from 'graphql/language/kinds';
    import { until } from 'async';
    import api from '../../common/api.js';
    
    export default {
        components: {
            //archiveCascader,
            LightBox
        },
        data() {
            let datas = this.initData();
            /*
            let type = this.$route.query.type;
            let id = this.$route.query.id;
            let tabName = this.$route.query.tabName;
            let config = templateConfigs[type];
            let originItem = "";
            console.log(id,type,tabName);
            */
            return datas;
            /*
            return {
                id:id,
                type:type,
                config:config, 
                route:config.route,                     //配置路由唯一name值
                tabName:tabName,


                //按照组件进行分类
                inputelemt:[],
                radioelemt:[],
                checkboxelemt:[],
                selectelemt:[],
                selectdateelemt:[],
                cascaderelemt:[],
                textareaelemt:[],
                imgelemt:[],
                relationelemt:[],

                //
                dialogImageUrl: '',
                dialogVisible: false,

                //用于渲染页面的表单内容,接口详情接口的数据填充到form中
                form:{},

                actionName:"",

                LightBoxImgs:[],
                uploadPicUrl: globalConfig.uploadPicUrl, //图片上传
                delImageUrl: window.base_url + 'admin/Dataclear_common/deleteImageJson/visit/proof_photo/' //图片删除
            }
            */
        },
        
        beforeRouteEnter(to, from, next){
            console.log("beforeRouteEnter",to,from);
            //检查是否是从选取关联数据页面返回
            //to.meta.keepAlive=false;
            //to.meta.keepAlive = true;
            next();
        },
        beforeRouteUpdate (to, from, next) {
            // just use `this`
            console.log("beforeRouteUpdate");
            next()
        },
        beforeRouteLeave (to, from , next) {
            //to:即将要进入的新router
            //from:正在离开的当前router
            if(to.path=="/templatePickDatas"){
                this.$store.commit("pickdatasHistory",{form:this.form,originItem:this.originItem});
            }
            next();
        },
        created(){
            console.log("created");
        },
        mounted() {
            console.log("mounted");
            console.log("query:",this.$route.query);
            this._initConfigElemt();
            this._initConfigForm();

            if(this.$route.query.id!=undefined){
              this.actionName="修改";
              let pickdatasHistory = this.$store.state.pickdatasHistory;
              if(pickdatasHistory!=undefined && pickdatasHistory!="" && pickdatasHistory.form!=undefined && pickdatasHistory.originItem!=undefined){
                this.form = pickdatasHistory.form;
                this.originItem = pickdatasHistory.originItem;
                this.$store.commit("pickdatasHistory","");
              }else{
                  this.fetchItem();
              }
            }else{
              this.actionName="添加";
            }
        },
        activated() {
            console.log("activated",this.$route);
            //this.$forceUpdate();
            let pickDatasType = this.$store.state.pickdatasType;
            for(let i in this.relationelemt){
                let item = this.relationelemt[i];
                if(pickDatasType==item.tableName){
                    console.log(item);
                    let selectItems = this.$store.state.pickdatasItems;
                    item.value=[];
                    for(let i in selectItems){
                        let pickItem = {};
                        if(item.selectColumns!=undefined){
                            for(let selectI in item.selectColumns){
                                let selectColumnName = item.selectColumns[selectI];
                                pickItem[selectColumnName] = selectItems[i][selectColumnName];
                            }
                        }else{
                            pickItem["id"]= selectItems[i].id;
                        }
                        item.value.push(pickItem);
                    }
                    this.form[item.name] = item.value;
                    this.$store.commit("set_pickdatasType","");
                    this.$store.commit("set_pickdatasItems",[]);
                    break;
                }
            }
        },
        deactivated() {
            console.log("deactivated");
        },
        watch: {
            form(newVal, oldVal) {
                this.form = newVal;
            },
            $route(to,from) {
                if(to.path!="/templateModify")
                    return;
                if(from.path=="/templatePickDatas"){
                    console.log("templatePickDatas do nothing");
                    return;
                }
                console.log("modify watch route");
                //from.meta.keepAlive=true;
                //1. 编辑－>新增
                //2. 编辑1->编辑2
                //3. 新增->编辑
                console.log(to,from);
                console.log(this.id,this.selectelemt,to.query, from.query);
                if(this.id!=undefined && to.query.id!=undefined && to.query.id!=this.id){
                    console.log("edit1 -> edit2");
                    this.id=to.query.id;
                    this.actionName="修改";
                    this.fetchItem();
                }else if(this.id!=undefined && (to.query.id==undefined || to.query.id=="")){
                    console.log("edit -> new");
                    this._initConfigForm();
                    this.id=undefined;
                    this.actionName="添加";
                }else if(this.id==undefined && (to.query.id!=undefined && to.query.id!="")){
                    console.log("new -> edit");
                    this.actionName="修改";
                    this.id=to.query.id;
                    this.fetchItem();
                }else{
                    console.log("else");
                    /*
                    this._initConfigForm();
                    this.id=undefined;
                    this.actionName="添加";
                    */
                }
                    
            }
        },
        // computed的数据是没有双向绑定的
        computed: {
            formRule() {
                let formRule = {};
                for(let i = 0; i < this.config.modifyConfig.length; ++i) {
                    let item = this.config.modifyConfig[i];
                    formRule[item.name] = [];
                    // 是否必填
                    if(item.isMust) {
                        let message = '请输入' + item.title;
                        formRule[item.name].push({required:true, message:message, trigger:'blur'});
                    }
                    // 验证条件
                    if(item.checkType) {
                        if(item.checkType == 'mobile') {// 手机
                            formRule[item.name].push({type:'string', message:'手机号码格式不对', pattern:/^1[34578]\d{9}$/, trigger:'blur'})
                        }else if(item.checkType == 'idcard') {// 身份证
                            formRule[item.name].push({type:'string',message: '身份证格式不对', pattern:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/ ,trigger:'blur'})
                        }else if(item.checkType == 'number'){// 数字
                            formRule[item.name].push({type:'string', message:'只能输入数字', pattern:/^[0-9]*$/, trigger:'blur'})
                        }else if(item.checkType == 'age'){// 年龄
                            formRule[item.name].push({type:'string', message: '请输入正确的年龄',pattern:/^\d{1,3}$/, trigger:'blur'})
                        }else if(item.checkType == 'numberOrLetter'){// 数字或字母
                            formRule[item.name].push({type:'string', message:'只能输入数字或字母', pattern:/^[0-9a-zA-Z]*$/, trigger:'blur'})
                        }
                    }
                    if(!formRule[item.name].length) { // 空数组则删掉
                        delete formRule[item.name];
                    }
                }
                return formRule;
            }
        },
        methods: {
            initData(){
                let type = this.$route.query.type;
                let id = this.$route.query.id;
                let tabName = this.$route.query.tabName;
                let config = templateConfigs[type];
                let originItem = "";
                console.log(id,type,tabName);
                return {
                    id:id,
                    type:type,
                    tableName:type,
                    config:config, 
                    route:config.route,                     //配置路由唯一name值
                    tabName:tabName,


                    //按照组件进行分类
                    inputelemt:[],
                    radioelemt:[],
                    checkboxelemt:[],
                    selectelemt:[],
                    selectdateelemt:[],
                    cascaderelemt:[],
                    textareaelemt:[],
                    imgelemt:[],
                    relationelemt:[],

                    //
                    dialogImageUrl: '',
                    dialogVisible: false,

                    //用于渲染页面的表单内容,接口详情接口的数据填充到form中
                    form:{},

                    actionName:"",

                    LightBoxImgs:[],
                    uploadPicUrl: globalConfig.uploadPicUrl, //图片上传
                    delImageUrl: window.base_url + 'admin/Dataclear_common/deleteImageJson/visit/proof_photo/' //图片删除
                }
            },
            // 配置增加输入框
            _initConfigElemt() {
                console.log("modifyConfig _initConfigElemt:",this.config.modifyConfig);
                if(this.config.modifyConfig.length) {
                    for(let i = 0; i < this.config.modifyConfig.length; ++i) {
                        let item = this.config.modifyConfig[i]
                        if(item.type == 'input') {
                            this.inputelemt.push(item)
                        }else if(item.type == 'radio'){
                            this.radioelemt.push(item)
                        }else if(item.type == 'checkbox'){
                            this.checkboxelemt.push(item)
                        }else if(item.type == 'select'){
                            this.selectelemt.push(item)
                        }else if(item.type == 'date'){
                            this.selectdateelemt.push(item)
                        }else if(item.type == 'cascader') {
                            this.cascaderelemt.push(item)
                        }else if(item.type == 'textarea'){
                            this.textareaelemt.push(item)
                        }else if(item.type == 'upload'){
                            this.imgelemt.push(item)
                            console.log(item);
                        }else if(item.type == 'relation'){
                            //todo 根据item.value 数组的id加载对应的item详情
                            this.relationelemt.push(item)
                        }
                    }
                }
                console.log("imgelemt:",this.imgelemt);
            },
            // 初始化、清空表单
            _initConfigForm() {
                let form = {};
                for(let i in this.config.modifyConfig) {
                    let item = this.config.modifyConfig[i];
                    if(item.name) {
                        if(item.type == 'upload') {// 清空图片
                            //item.value = [];
                        }
                        if(item.type == 'checkbox') {
                            item.value = [];
                        }
                        if(item.dataType == 'array') {
                            item.value = [{value:''}];
                        }
                        if(item.type == 'textAndSelect') {
                            item.value = [{order_num:'', order_way:''}];
                        }
                        if(item.type == 'cascader') {
                            item.value = [];
                        }
                        form[item.name] = item.value;
                        //console.log(item.name,item.vlaue);
                    }
                }
                this.form = form;
                this.id=undefined;
                this.actionName="添加";
                console.log(this.form, '==========初始化的this.form========')
            },
            // 填充表单
            _setFormVal(data) {
              console.log(data);
              console.log(this.form);
                for(let i in this.form) {// data属性中存在form中，才赋值给form
                    for(let j in this.config.modifyConfig) {
                        let item = this.config.modifyConfig[j];
                        if(item.type == 'date' && i == item.name && data[i] == '0000-00-00 00:00:00') {
                            data[i] = '';
                        }
                    }
                    this.form[i] = data[i];
                    
                }
            },
            _dateFormat(dateFomatter){
                if(dateFomatter && dateFomatter != '0000-00-00 00:00:00') {
                    let date = new Date(dateFomatter);
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    m = m < 10 ? '0' + m : m;
                    let d = date.getDate();
                    d = d < 10 ? '0' + d : d;
                    return y + '-' + m + '-' + d;
                } else {
                    return '';
                }
            },
            // 点击增加输入框
            handleAddInputbox(itemName) {
                this.form[itemName].push({
                    value:''
                    // key:Date.now()
                })
            },
            handledeleteInputbox(item, itemName) {
                var index = this.form[itemName].indexOf(item);
                if(this.form[itemName].length >= 2) {
                    if(index !== -1) {
                        this.form[itemName].splice(index, 1);
                    }
                }
            },
            getModifyConfigByFieldName(name){
                for(let i in this.config.modifyConfig){
                    if(this.config.modifyConfig[i].name==name){
                        return this.config.modifyConfig[i]; 
                    }
                }
                return undefined;
            },

            async handleSubmit() {
                let that = this;
                console.log("form:",this.form);
                this.$refs.rulesForm.validate(async (valid)=>{
                    if(valid) {
                        let postData = {};
                        
                        let value = "";
                        //如果是编辑操作，是否更新了数据
                        let isUpdateFlag = false;
                        //是否是更新操作
                        let updateFlag = false;
                        if(this.$route.query.id!=undefined){
                            updateFlag = true;
                        }
                        for(let field in this.form){
                            console.log(field,typeof(this.form[field]));
                            let modifyConfigItem = this.getModifyConfigByFieldName(field);
                            console.log("modifyConfigItem:",modifyConfigItem);
                            //关联其他表的数据
                            if(modifyConfigItem!=undefined && modifyConfigItem.type=="relation"){
                                //单选
                                if(modifyConfigItem.selectType=="single" && modifyConfigItem.saveColumns.length==1){
                                    if(this.form[field].length>=1){
                                        value = this.form[field][0][modifyConfigItem.saveColumns[0]];
                                    }else
                                        value = "";
                                //多选
                                }else{
                                    value = [];
                                    for(let itemI in this.form[field]){
                                        let row = this.form[field][itemI];
                                        let saveRow = {};
                                        for(let columnI in modifyConfigItem.saveColumns){
                                            saveRow[modifyConfigItem.saveColumns[columnI]] = row[modifyConfigItem.saveColumns[columnI]];
                                        }
                                        value.push(saveRow);
                                    }
                                }
                                //console.log(value);
                                if(typeof(value)=='object')
                                    value =  JSON.stringify(value);

                            }else if(typeof(this.form[field])=='object' || typeof(this.form[field])=='array'){
                                //this.form[field] = JSON.stringify(this.form[field]);
                                value =  JSON.stringify(this.form[field]);
                            }else{
                                value =  this.form[field];
                            }
                            if(updateFlag==true){
                                if(value != this.originItem[field]){
                                    postData[field] = value;
                                    isUpdateFlag = true; 
                                }
                            }else{
                                postData[field] = value;
                            }
                        }
                        console.log("handleSubmit:", JSON.stringify(postData));

                        


                        if(updateFlag==true){
                            if(isUpdateFlag==false){
                                this.$message.warning('未修改数据');
                                return;
                            }
                            console.log("update",this.tableName)
                            let condition = {id:this.form.id}
                            let rsp = await api.updateTableData(this.tableName,postData,condition)
                            console.log("update",this.tableName,"rsp:",rsp)

                            if(rsp.status==200){
                                console.log(rsp)
                            }else{
                                console.log("error");
                            }
                        }else{
                            console.log(this.tableName)
                            let rsp = await api.addTableData(this.tableName,postData)
                            console.log(this.tableName,"rsp:",rsp)

                            if(rsp.status==200){
                                console.log(rsp)
                            }else{
                                console.log("error");
                            }
                        }
                        
                    }else{
                        console.log('=========验证不通过===========')
                        return false;
                    }
                })
            },
            handlePickDatas(tableName,selectItems,searchConfig,tableConfig,itemsGql,selectType){
                let that = this;
                //设置获取关联数据状态,重新返回这个页面检查这个状态是否存在,存在则更新这个数据
                console.log("selectItems:",selectItems);
                this.$store.commit("set_pickdatasType",tableName);
                this.$store.commit("set_pickdatasItems",selectItems);
                this.$router.push({ 
                    path: "/templatePickDatas",
                    query:{
                        type: tableName,
                        tableConfig, 
                        searchConfig,
                        itemsGql,
                        selectItems,
                        selectType,
                    }
                });

            },
            async fetchItem() {
                // 如果为修改，则通过路由获取修改的id
                this.form.id = this.$route.query.id;
                let tableName = this.$route.query.type;
                let id = this.$route.query.id;
                let rsp = await api.getTableDataById(tableName,id);
                console.log(this.tableName,"rsp:",rsp);
                //填充数据
                this.form = rsp.data.row
                console.log(this.form)
                this.originItem = {}
                for(let field in this.form){
                    console.log(field)
                    this.originItem[field] = this.form[field]
                }
                
                
            },
            handleBeforeUpload(file) {
                return true;
            },
            handlePictureCardPreview(file) {
                console.log(file);
                /*
                let imageKey = 0;
                for(let i in this.form.proof_photo){
                    console.log(i);
                    if(this.form.proof_photo[i] == file.name){
                        imageKey = i;
                    }
                }
                this.$refs.LightBox.showImage(imageKey);
                */
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handlePictureCardRemove(file, fileList) {
                this.$confirm('此操作将永久删除该文件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let imageKey = 0;
                    for(let i in this.form.proof_photo) {
                        if(this.form.proof_photo[i] == file.name) {
                            imageKey = i;
                        }
                    }
                    this.form.proof_photo.splice(imageKey, 1);
                    let params = {};
                    if(window._token) {
                        params.csrf_token_key = window._token.value
                    }
                    params.imageKey = imageKey
                    if(this.form.id) {
                        params.id = this.form.id
                    }
                    
                    AjaxApi.ajaxPost(this.delImageUrl, params, (response)=>{
                        if(response.body.token) {
                            window._token = response.body.token;
                        }
                        if(response.body.retcode == 0) {
                            this.$message('操作成功');
                        }else{
                            this.$message('操作失败');
                        }
                    });
                }).catch(() => {
                    // 取消删除图片
                    this.fileListData = [];
                    for(let i in this.form.proof_photo) {
                        this.fileListData.push({
                            name:this.form.proof_photo[i],
                            url:`${window.base_url}admin/accessFile/output_image/${this.form.proof_photo[i]}`
                        });
                    }
                });
                return false;
            },
            handleUploadSuccess(response, file, fileList, name) {
                console.log(name);
                console.log("handleUploadSuccess:",response);
                console.log("handleUploadSuccess:",file);
                console.log("handleUploadSuccess:",fileList);
                console.log("http://127.0.0.1/msServer/static/uploads/"+response.upload_file);
                if(file.status == "success") {
                    /*
                    if(!this.form.proof_photo) {
                        this.form.proof_photo = [];
                    }
                    this.form.proof_photo.push("http://127.0.0.1/msServer/static/uploads/"+response.upload_file);
                    */
                    console.log(this.form);
                    console.log(this.form[name]);
                    this.form[name].push({name:response.upload_file,url:"http://127.0.0.1/msServer/static/uploads/"+response.upload_file})
                    for(let key1 in this.form[name])
                        console.log(this.form[name][key1]);
                    console.log(this.form[name]);
                    //this._setFormVal(this.form);
                    this.$message('上传成功');
                }else{
                    this.$message.error('上传失败');
                }
            }
        },
        
    }
</script>

<style>
    .m-form-wrapper{
        padding:0 15px;
    }
    .m-title{
        height:40px;
        line-height: 40px;
        font-size: 16px;
        background-color: rgb(235, 235, 235);
        margin-bottom: 20px;
    }
    .m-h3{
        margin-left: 10px;
    }
    .m-el-input__inner{
        width:120px;
    }
    .m-icon{
        margin-left: 0 !important;
    }
    /*.title{
        height:36px;
        line-height: 36px;
    }
    .details{
        color:#4db3ff;
        cursor:pointer;
    }*/
</style>