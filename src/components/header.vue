<template>
	<div class="clearFix el-menu--dark">
        <span class="title">后台管理系统实例</span>
    <div class="user-info-box" v-show="isLogin">
      <div class="el-submenu__title">
        <img src="../assets/portrait.png">
        <span>{{userName}}</span>
      </div>
      <div class="header-menu">
        <ul class="menu-nav">
          <li class="el-menu-item" @click="loginOut">登出</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      name: 'Header',
      data(){
          return{
              userName: '',
              isLogin: false
          }
      },
      created(){
        let info = this.$local.fetch('miaov')
        this.isLogin = info.login
        this.userName = info.userName
      },
      methods: {
        loginOut(){
          this.$local.save('miaov',null);
          this.$router.push("/login")
        }
      }
  }
</script>
<style>
 .clearFix .title{
   font-size: 26px;
   height: 56px;
   line-height: 56px;
   letter-spacing: 4px;
   color: #bfcbd9;
   margin-left: 30px;
 }
</style>
