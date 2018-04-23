<template>
  <div style="height:100%;">
    <header-nav></header-nav>
    <!--<div calss="breadcrumb">
      <router-link to="/">首页</router-link>
      /
      <span :style="{color:'#97a8be'}">{{flag}}</span>
    </div>-->
    <div class="tab">
      <el-menu
        :router="true"
        :default-active="default_active"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#ffd04b">
        <el-menu-item index="/doc" >
          <i class="el-icon-menu"></i>
          <span slot="title">文档</span>
        </el-menu-item>
        <el-menu-item index="/table">
          <i class="el-icon-document"></i>
          <span slot="title">基础表格</span>
        </el-menu-item>
        <el-menu-item index="/echarts">
          <i class="el-icon-setting"></i>
          <span slot="title">图表</span>
        </el-menu-item>
        <el-menu-item index="/editor">
          <i class="el-icon-edit"></i>
          <span slot="title">编辑器</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right_content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import Header from '@/components/header'

  let flags = {
      project: "我的项目",
      workbench: "工作台",
      doc: "文档"
  };

  export default{
    data(){
      return {
        flag: '',
        default_active:''
      }
    },
    mounted(){
      //console.log(1111);
      //console.log(this.$route.path);
      this.default_active = this.$route.path;
    },
    watch: {
      $route(){
        this.flag = flags[this.$route.path.slice(1)]
      }
    },
    beforeRouteEnter(to, from, next){
      next((vm) => {
        vm.flag = flags[to.path.slice(1)]
      })
    },
      components: {
          headerNav: Header
      },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
