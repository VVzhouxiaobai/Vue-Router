<template>
  <div>
      <quill-editor
        class="quill"
        v-model="progs"
       >
      </quill-editor>
    <el-button type="primary" @click="change">提交</el-button>
    <div class="content"></div>
  </div>

</template>

<script>
  import $ from  "jquery"
  export default {
    data() {
      return{
        progs: ''
      }
    },
    methods: {
      change: function () {
        console.log(this.progs);
        $(".content").html(this.progs)
      }
    }
  }
</script>
<style scoped>
  button{
    display: block;
    margin: 10px 0;
  }
  .content p img{
    width: 200px;
  }
</style>
