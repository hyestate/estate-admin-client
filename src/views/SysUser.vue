<template>
  <div>
    <h1>sss</h1>
    <ol>
      <li v-for="item in tableData" :key=item.id>
        {{ item.name}}
      </li>
    </ol>
  </div>
</template>


<script>

export default {
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let rsp = await this.$axios.get("http://127.0.0.1:9001/sysUsers")
      if(rsp.status==200){
        this.tableData=rsp.data.rows
      }else{
        console.log(ds)
      }
    }
  }
}
</script>

