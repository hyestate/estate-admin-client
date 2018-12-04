<template>
  <div class="hello">
    <h1>MyTest</h1>
    <div :style="{ fontSize: postFontSize + 'em' }">
      <blog v-for="item in items" :key="item.id" :item="item" v-on:add="postFontSize+=0.1"></blog>
    </div>
  </div>
</template>

<script>
import blog from './Blog.vue';
export default {
  name: 'Mytest',
  data() {
    return {
    postFontSize:2, 
    items: [
      { id: 1, title: 'My journey with Vue' ,content:"mycontent xxxx"},
      { id: 2, title: 'Blogging with Vue' ,content:"mycontent xxxx"},
      { id: 3, title: 'Why Vue is so fun' ,content:"mycontent xxxx"}
    ]}
  },
  props: {
    msg: String
  },
  components:{
      blog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
