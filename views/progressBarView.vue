<template>
  <div class="plLoading">

    <progressBar :cmd="parentMessages"></progressBar>
    <div class="testBtn">
      <button  @click="start">开始连接</button>
      <button  @click="end">连接完成</button>
      <input type="text" placeholder="限时多少秒内连接完成(大于2s)" ref="limitTime"></input>
      <button @click='setLimitTime'>确定</button>
    </div>
  </div>

</template>

<script>


import progressBar from '../src/components/progressBar'


export default {
  name: 'plLoading',
  components:{
    progressBar:progressBar
  },
  data() {
      return {
        parentMessages: 'ddd',
        limitTime: null,
      };
    },
  created(){
    bus.$on('EVENT_TIMEOUT',function(){
      alert('超时错误')
    })
  },
  methods: {
    start: function (event) {
      this.parentMessages = 'start'
    },
    end: function (event) {
      this.parentMessages = 'end'
    },
    setLimitTime:function(event) {
      var isInteger = /^[0-9]*[1-9][0-9]*$/　　//判断是否为正整数
      var limitTime = this.$refs.limitTime.value
      if(isInteger.test(limitTime)){
        if(limitTime>2){
          this.parentMessages = limitTime
        }else{
        alert('请输入一个大于2的正整数')
        }
      }else{
        alert('请输入一个正整数')
      }
    }
  }
}
</script>

<style>
  .testBtn{
    position: relative;
    top: 100px;
    width: 100%;
    text-align: center;
    z-index: 999;
  }
  .testBtn input{
    width: 200px;
  }
</style>
