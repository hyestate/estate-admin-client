
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
    categoryConfig:['上门基础信息', '处理过程信息', '导流公众号信息', '某某信息', '结论信息'],
    modifyConfig:[
        {id:'1', title:'来访用户手机', name:'mobile', ph:'', isMust:false, type:'input', checkType:'mobile', category:'上门基础信息', width:8, value:''},

        {id:'2', title:'用户问题账号', name:'account', ph:'', isMust:true, type:'input', dataType:'array', category:'上门基础信息', width:17, value:[
            {value:''}// 默认写一个
        ]},
        //单选框
        {id:'2', title:'所属地区', name:'address', ph:'', isMust:false, type:'radio',  category:'上门基础信息', width:28, value:'',options:[
            {label:0, value:'北京'},
            {label:1, value:'上海'},
            {label:2, value:'广州'},
            {label:3, value:'深圳'},
            {label:4, value:'杭州'},
            {label:5, value:'成都'},
        ]
        },
        //多选框
        {id:'21', title:'文章标签', name:'articletags', ph:'', isMust:false, type:'checkbox', category:'上门基础信息', width:28, value:'',options:[
            {label:1, value:'股市'},
            {label:2, value:'AI'},
            {label:3, value:'区块链'},
            {label:4, value:'美食'},
            {label:5, value:'摄影'},
            {label:6, value:'辟谣'},
        ]
        },
        {id:'3', title:'性别', name:'sex', ph:'', isMust:false, type:'select', category:'上门基础信息', width:8, value:'', options:[
            {label:'男', value:1},
            {label:'女', value:0}
        ]},
        {id:'4', title:'证件号码', name:'idcard', ph:'', isMust:false, type:'input', checkType:'idcard', category:'上门基础信息', width:8, value:''},
        {id:'5', title:'开店时间', name:'reg_time', ph:'', isMust:false, type:'date',  category:'上门基础信息', width:8, value:''},

        {id:'5', title:'工单类型', name:'orderType', ph:'', isMust:false, type:'select', category:'处理过程信息', width:8, value:'', options:[
            {label:'咨询', value:'咨询'},
            {label:'投诉问题', value:'投诉问题'},
            {label:'寻求合作', value:'寻求合作'},
            {label:'司法流程', value:'司法流程'}
        ]},

        {id:'6', title:'家乡', name:'hometown', ph:'', isMust:false, type:'cascader', category:'处理过程信息', width:12, value:"",options:[
            {
                value: 'zhinan',
                label: '指南',
                children: [{
                  value: 'shejiyuanze',
                  label: '设计原则',
                  children: [{
                    value: 'yizhi',
                    label: '一致'
                  }, {
                    value: 'fankui',
                    label: '反馈'
                  }, {
                    value: 'xiaolv',
                    label: '效率'
                  }, {
                    value: 'kekong',
                    label: '可控'
                  }]
                }, {
                  value: 'daohang',
                  label: '导航',
                  children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                  }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                  }]
                }]
              }, {
                value: 'zujian',
                label: '组件',
                children: [{
                  value: 'basic',
                  label: 'Basic',
                  children: [{
                    value: 'layout',
                    label: 'Layout 布局'
                  }, {
                    value: 'color',
                    label: 'Color 色彩'
                  }, {
                    value: 'typography',
                    label: 'Typography 字体'
                  }, {
                    value: 'icon',
                    label: 'Icon 图标'
                  }, {
                    value: 'button',
                    label: 'Button 按钮'
                  }]
                }, {
                  value: 'form',
                  label: 'Form',
                  children: [{
                    value: 'radio',
                    label: 'Radio 单选框'
                  }, {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                  }, {
                    value: 'input',
                    label: 'Input 输入框'
                  }, {
                    value: 'input-number',
                    label: 'InputNumber 计数器'
                  }, {
                    value: 'select',
                    label: 'Select 选择器'
                  }, {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                  }, {
                    value: 'switch',
                    label: 'Switch 开关'
                  }, {
                    value: 'slider',
                    label: 'Slider 滑块'
                  }, {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                  }, {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                  }, {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                  }, {
                    value: 'upload',
                    label: 'Upload 上传'
                  }, {
                    value: 'rate',
                    label: 'Rate 评分'
                  }, {
                    value: 'form',
                    label: 'Form 表单'
                  }]
                }, {
                  value: 'data',
                  label: 'Data',
                  children: [{
                    value: 'table',
                    label: 'Table 表格'
                  }, {
                    value: 'tag',
                    label: 'Tag 标签'
                  }, {
                    value: 'progress',
                    label: 'Progress 进度条'
                  }, {
                    value: 'tree',
                    label: 'Tree 树形控件'
                  }, {
                    value: 'pagination',
                    label: 'Pagination 分页'
                  }, {
                    value: 'badge',
                    label: 'Badge 标记'
                  }]
                }, {
                  value: 'notice',
                  label: 'Notice',
                  children: [{
                    value: 'alert',
                    label: 'Alert 警告'
                  }, {
                    value: 'loading',
                    label: 'Loading 加载'
                  }, {
                    value: 'message',
                    label: 'Message 消息提示'
                  }, {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                  }, {
                    value: 'notification',
                    label: 'Notification 通知'
                  }]
                }, {
                  value: 'navigation',
                  label: 'Navigation',
                  children: [{
                    value: 'menu',
                    label: 'NavMenu 导航菜单'
                  }, {
                    value: 'tabs',
                    label: 'Tabs 标签页'
                  }, {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑'
                  }, {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单'
                  }, {
                    value: 'steps',
                    label: 'Steps 步骤条'
                  }]
                }, {
                  value: 'others',
                  label: 'Others',
                  children: [{
                    value: 'dialog',
                    label: 'Dialog 对话框'
                  }, {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示'
                  }, {
                    value: 'popover',
                    label: 'Popover 弹出框'
                  }, {
                    value: 'card',
                    label: 'Card 卡片'
                  }, {
                    value: 'carousel',
                    label: 'Carousel 走马灯'
                  }, {
                    value: 'collapse',
                    label: 'Collapse 折叠面板'
                  }]
                }]
              }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                  value: 'axure',
                  label: 'Axure Components'
                }, {
                  value: 'sketch',
                  label: 'Sketch Templates'
                }, {
                  value: 'jiaohu',
                  label: '组件交互文档'
                }]
              }
        ]},
        {id:'6', title:'家乡2', name:'hometown2', ph:'', isMust:false, type:'cascader', category:'处理过程信息', width:12, value:"",options:[
            {
                value: 'zhinan',
                label: '指南',
                children: [{
                  value: 'shejiyuanze',
                  label: '设计原则',
                  children: [{
                    value: 'yizhi',
                    label: '一致'
                  }, {
                    value: 'fankui',
                    label: '反馈'
                  }, {
                    value: 'xiaolv',
                    label: '效率'
                  }, {
                    value: 'kekong',
                    label: '可控'
                  }]
                }, {
                  value: 'daohang',
                  label: '导航',
                  children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                  }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                  }]
                }]
              }, {
                value: 'zujian',
                label: '组件',
                children: [{
                  value: 'basic',
                  label: 'Basic',
                  children: [{
                    value: 'layout',
                    label: 'Layout 布局'
                  }, {
                    value: 'color',
                    label: 'Color 色彩'
                  }, {
                    value: 'typography',
                    label: 'Typography 字体'
                  }, {
                    value: 'icon',
                    label: 'Icon 图标'
                  }, {
                    value: 'button',
                    label: 'Button 按钮'
                  }]
                }, {
                  value: 'form',
                  label: 'Form',
                  children: [{
                    value: 'radio',
                    label: 'Radio 单选框'
                  }, {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                  }, {
                    value: 'input',
                    label: 'Input 输入框'
                  }, {
                    value: 'input-number',
                    label: 'InputNumber 计数器'
                  }, {
                    value: 'select',
                    label: 'Select 选择器'
                  }, {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                  }, {
                    value: 'switch',
                    label: 'Switch 开关'
                  }, {
                    value: 'slider',
                    label: 'Slider 滑块'
                  }, {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                  }, {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                  }, {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                  }, {
                    value: 'upload',
                    label: 'Upload 上传'
                  }, {
                    value: 'rate',
                    label: 'Rate 评分'
                  }, {
                    value: 'form',
                    label: 'Form 表单'
                  }]
                }, {
                  value: 'data',
                  label: 'Data',
                  children: [{
                    value: 'table',
                    label: 'Table 表格'
                  }, {
                    value: 'tag',
                    label: 'Tag 标签'
                  }, {
                    value: 'progress',
                    label: 'Progress 进度条'
                  }, {
                    value: 'tree',
                    label: 'Tree 树形控件'
                  }, {
                    value: 'pagination',
                    label: 'Pagination 分页'
                  }, {
                    value: 'badge',
                    label: 'Badge 标记'
                  }]
                }, {
                  value: 'notice',
                  label: 'Notice',
                  children: [{
                    value: 'alert',
                    label: 'Alert 警告'
                  }, {
                    value: 'loading',
                    label: 'Loading 加载'
                  }, {
                    value: 'message',
                    label: 'Message 消息提示'
                  }, {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                  }, {
                    value: 'notification',
                    label: 'Notification 通知'
                  }]
                }, {
                  value: 'navigation',
                  label: 'Navigation',
                  children: [{
                    value: 'menu',
                    label: 'NavMenu 导航菜单'
                  }, {
                    value: 'tabs',
                    label: 'Tabs 标签页'
                  }, {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑'
                  }, {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单'
                  }, {
                    value: 'steps',
                    label: 'Steps 步骤条'
                  }]
                }, {
                  value: 'others',
                  label: 'Others',
                  children: [{
                    value: 'dialog',
                    label: 'Dialog 对话框'
                  }, {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示'
                  }, {
                    value: 'popover',
                    label: 'Popover 弹出框'
                  }, {
                    value: 'card',
                    label: 'Card 卡片'
                  }, {
                    value: 'carousel',
                    label: 'Carousel 走马灯'
                  }, {
                    value: 'collapse',
                    label: 'Collapse 折叠面板'
                  }]
                }]
              }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                  value: 'axure',
                  label: 'Axure Components'
                }, {
                  value: 'sketch',
                  label: 'Sketch Templates'
                }, {
                  value: 'jiaohu',
                  label: '组件交互文档'
                }]
              }
        ]},
        
        {id:'8', title:'问题描述', name:'description', ph:'', isMust:false, type:'textarea', category:'处理过程信息', width:16, value:''},

        {id:'9', title:'是否产品问题', name:'productProblem', ph:'', isMust:false, type:'select', category:'结论信息', width:8, value:'', options:[
            {label:'是', value:'是'},
            {label:'否', value:'否'}
        ]},
        {id:'10', title:'备注', name:'remark', ph:'', isMust:false, type:'textarea', category:'结论信息', width:24, value:''},
        {id:'101', title:'备注2', name:'remark1', ph:'', isMust:false, type:'textarea', category:'结论信息', width:24, value:''},
        {id:'11', title:'编辑器', name:'editor', ph:'', isMust:false, type:'editor', category:'结论信息', width:24, value:[]},
        {id:'100', title:'证据截图', name:'proof_photo', ph:'', isMust:false, type:'upload', category:'结论信息', width:24, value:[], uploadedData:[]},

        {id:'13', title:'证据截图1', name:'proof_photo1', ph:'', isMust:false, type:'upload', category:'结论信息', width:24, value:[], uploadedData:[]},
    
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
};

export default configs;

