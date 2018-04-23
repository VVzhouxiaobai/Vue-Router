/**
 * Created by zhouxiaobai on 2017/8/15.
 */
/*
* Vue的插件，用来获取和设置LocalStorage存储
* */
let local = {
	//存储数据
  save(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  },
  //读取数据
  fetch(key){
    return JSON.parse(localStorage.getItem(key)) || {}
  }
};

export default {
  install: function(vm){
    //console.log(vm);
    vm.prototype.$local = local;
  }
}

