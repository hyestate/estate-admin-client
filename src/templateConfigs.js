
/**
 * 页面配置所需数据
 * 
 * ph   placeholder
 * isMust   是否必填
 * type(控件类型) input, radio, checkbox, select, textarea, date, upload,inputSelect,multiinput,cascader(product,archive)
 */
let listConfig = {
    title:'管理员管理',
    route:{
        name:'listConfig',
        path:'/admin/listConfig',
        modifyName:'modifyConfig',
        modifyPath:'/templateModify'
    },
    itemsUrl:`http://127.0.0.1:9001/sysUsers`,//展示列表数据
    itemUrl:`${window.base_url}admin/Dataclear_common/getItem/visit`,//获取单条数据
    modifyUrl:`${window.base_url}admin/Dataclear_common/modifyItem/visit`,//修改单条数据
    deleteUrl:`${window.base_url}admin/Dataclear_common/deleteItem/visit`,//删除单条数据
    searchConfig:[
        //{id:'1', title:'输入框类型', name:'jz_id', isAutocomplete:false, ph:'请输入卷宗ID', isMust:false, type:'input', value:{jz_id: {value:'',operator:"="}}},
        {id:'2', title:'单选框类型', name:'planType', isAutocomplete:false, ph:'请选择', isMust:false, type:'radio', value:{planType: {value:'',operator:"="}}, option:[
            {label:'维持原判',value:'维持原判'},
            {label:'申请解冻',value:'申请解冻'},
            {label:'申请解封',value:'申请解封'}
        ]},
        {id:'3', title:'多选框类型', name:'offend_type', isAutocomplete:false, ph:'请选择', isMust:false, type:'cascader', value:{
            offend_type2: {value:'',operator:'='},
            offend_type3: {value:'',operator:'='},
        }, options:[
            {
                value:'黄赌毒',
                label:'黄赌毒',
                children: [
                    {value:'吸毒贩毒', label:'吸毒贩毒'},
                    {value:'网络赌博', label:'网络赌博'},
                ]
            },
            {
                value:'出售违禁物品',
                label:'出售违禁物品',
                children: [
                    {value:'网上售烟', label:'网上售烟'},
                    {value:'出售其他违禁物品', label:'出售其他违禁物品'}
                ]
            },
        ]},
        {id:'4', title:'最后修改人', name:'update_user', isAutocomplete:true, ph:'请选择', isMust:false, type:'radio', value:{update_user:{value:'',operator:"="}}},
        {id:'5', title:'最后修改时间', name:'create_time', isAutocomplete:false, ph:'选择日期范围', isMust:false, type:'daterange', value:{create_time: {value:{sdate:"",edate:""},operator:'range'}}}
    ],
    tableConfig:[
        {id:'1', title:'来访用户姓名', name:'visitname', width:120},
        {id:'2', title:'问题帐号', name:'account', width:150},
        {id:'3', title:'最后修改人', name:'update_user', width:120},
        {id:'4', title:'最后修改时间', name:'update_time', width:120},
    ],
    //todo categoryConfig做一个大的分类，modifyConfig里面根据category决定控件属于哪个分类 
    categoryConfig:['基础信息'],
    modifyConfig:[
        {id:'1', title:'姓名', name:'name', ph:'', isMust:true, type:'input', checkType:'mobile', category:'基础信息', width:8, value:''},

        {id:'2', title:'密码', name:'password', ph:'', isMust:true, type:'input',  category:'基础信息', width:17, value:""},
    ],
    //操作按钮配置
    actionConfig:[
        {
            name:"编辑",
            action:"modify",
            path:"/templateModify",
        },
        {
            name:"删除",
            action:"delete",
            path:"/templateModify",
        },
    ],
}
let configs={
  sys_users:listConfig,
  sys_roles:listConfig,
  sys_user_roles:listConfig,
  sys_table_privs:listConfig,
  sys_column_privs:listConfig,
  users:listConfig,
};

export default configs;

