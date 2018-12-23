
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
    searchConfig:[
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

let newHousesConfig = {
    title:'新楼盘',
    route:{
        name:'listConfig',
        path:'/admin/listConfig',
        modifyName:'modifyConfig',
        modifyPath:'/templateModify'
    },
    searchConfig:[
        {id:'2', title:'单选框类型', name:'planType', isAutocomplete:false, ph:'请选择', isMust:false, type:'radio', value:{planType: {value:'',operator:"="}}, option:[
            {label:'维持原判',value:'维持原判'},
            {label:'申请解冻',value:'申请解冻'},
            {label:'申请解封',value:'申请解封'}
        ]},
        {id:'4', title:'最后修改人', name:'update_user', isAutocomplete:true, ph:'请选择', isMust:false, type:'radio', value:{update_user:{value:'',operator:"="}}},
        {id:'5', title:'最后修改时间', name:'create_time', isAutocomplete:false, ph:'选择日期范围', isMust:false, type:'daterange', value:{create_time: {value:{sdate:"",edate:""},operator:'range'}}}
    ],
    //todo categoryConfig做一个大的分类，modifyConfig里面根据category决定控件属于哪个分类 
    categoryConfig:['基础信息'],
    modifyConfig:[
        {id:'1', title:'楼盘名称', name:'name', ph:'', isMust:true, type:'input',  category:'基础信息', width:8, value:''},
        {id:'2', title:'均价', name:'avgprice', ph:'', isMust:true, type:'input',  category:'基础信息', width:17, value:""},
        {id:'3', title:'最小面积', name:'minarea', ph:'', isMust:true, type:'input',  category:'基础信息', width:17, value:""},
        {id:'4', title:'最大面积', name:'maxarea', ph:'', isMust:true, type:'input',  category:'基础信息', width:17, value:""},
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
  t_new_houses:newHousesConfig,
};

export default configs;

