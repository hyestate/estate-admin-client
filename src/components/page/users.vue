<template>
    <div>
        <v-list type="users"></v-list>
    </div>
</template>

<script>
    import vList from './List.vue';
    import templateConfigs from '../../templateConfigs';
    import globalConfig from "../../config.js"
    import ErrorTip from '../common/ErrorTip';
    import api from '../../common/api.js';
    //import gql from 'graphql-tag'

    export default {
        data() {
           return {}
        },

        components:{
            ErrorTip,vList
        },
        
        mounted() {
            
        },
        computed: {
            
        },
        
        methods: {
            
        },
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