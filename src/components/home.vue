<template>
  <div class="main">
    <div class="home-header">
      <img src="../assets/sun.png" alt="">
      <span class="title">My Zone</span>
      <div class="portrait" :class={portraitLogin:isLogin}>
        <router-link  v-if="!isLogin" to="/login" tag="span">登录</router-link>
        <img  v-if="isLogin" src="../assets/portrait.png" alt="">
      </div>

    </div>
    <div class="phrase">
      后台管理实例
    </div>
    <div class="btns">
      <router-link to="/table" tag="div" class=" trans">我的项目</router-link>
      <router-link to="/doc" tag="div" class=" trans">我的文档</router-link>
    </div>
  </div>
</template>

<script>
	export default{
		name: 'home',
		data() {
			return {
				isLogin: false
			}
		},
		created(){
			//拿到登录信息
      //console.log(this.$local.fetch)
			let info = this.$local.fetch('miaov')
      console.log(info);
			this.isLogin = info.login;
		}
	}
</script>
<style>

</style>
