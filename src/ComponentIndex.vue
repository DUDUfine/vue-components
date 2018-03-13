<template>
  <div id="app">
    <div class="com-item">
      <span class="title-name">时间控件</span>
      <du-date :selDate="date" @changeDate="setDate"></du-date>
    </div>
    <div class="com-item">
      <span class="title-name">下拉框</span>
      <br/>
      <div class="selectDown">
        <select-down :selectData="selectData" @selectDataChange="selectDataChange"></select-down>
      </div>
      <button class="du-btn" type="buton" @click="submitSelect">提交</button>
    </div>

    <div class="com-item">
      <span class="title-name">轮播图</span>
      <carousel >
        <div class="carousel-item"><div class="carousel-img" style="padding-top: 130px;font-size: 40px;color: #fff">第一个自定义html轮播图内容</div></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel1.png"/></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel2.png"/></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel3.png"/></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel4.png"/></div>
      </carousel>
    </div>

    <div style="width: 80%;" class="com-item">
      <span class="title-name">进度条</span>
      <!--<progress-bar-view></progress-bar-view>-->
      <!--<div class="plLoading">-->
        <progressBar :cmd="parentMessages"></progressBar>
        <div class="progressBtn">
          <button  @click="progressBarStart" class="du-btn">开始连接</button>
          <button  @click="progressBarEnd" class="du-btn">连接完成</button>
          <button  @click="progressBarReset" class="du-btn">重置</button>
          <input type="text" placeholder="限时多少秒内连接完成(大于2s)" ref="limitTime"/>
          <button @click='setLimitTime' class="du-btn">确定</button>
        </div>
    </div>


  </div>

</template>

<script>
  import duDate from './components/duDate.vue'
  import selectDown from './components/selectDown.vue'
  import carousel from './components/carousel.vue'
  import selectlist from './../static/select.json'
  import progressBar from './components/progressBar.vue'
export default {
  name: 'App',
  components:{
    duDate,
    selectDown,
    carousel,
    progressBar
  },
  data(){
    return{
      date:"2018-03-14",
      selectData:selectlist,
      selectedItem:"",
      parentMessages: '',  //用于进度条传递“start”、“end”、“timeout”信息
      limitTime: 12,
    }
  },
  created(){
    bus.$on('EVENT_TIMEOUT',function(){
      alert('超时错误')
    })
  },
  methods:{
    setDate(va){

      this.date=va
    },
    selectDataChange(val){

      this.selectedItem=JSON.stringify(val);
    },
    submitSelect(){
      if(!this.selectedItem){
        alert("请选择")
      }else {
        alert(JSON.stringify(this.selectedItem))
      }

    },
    progressBarStart: function (event) {
      this.parentMessages = 'start'
    },
    progressBarEnd: function (event) {
      this.parentMessages = 'end'
    },
    setLimitTime:function(event) {
      var isInteger = /^[0-9]*[1-9][0-9]*$/　　//判断是否为正整数(一位或2位小数)
      var limitTime = this.$refs.limitTime.value
      if(isInteger.test(limitTime)){
        if(limitTime>2){
          this.parentMessages = limitTime
          alert("设置完成~")
        }else{
          alert('请输入一个大于2的两位正整数')
        }
      }else{
        alert('请输入一个两位正整数')
      }

    },
    progressBarReset:function (event) {
      this.parentMessages = 'reset'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}

  .selectDown{
    display: inline-block;
    width: 500px;
  }

.progressBtn{
  position: relative;
  top: 20px;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  z-index: 999;
}
.progressBtn input{
  width: 250px;
}
  .title-name{
    font-weight: bold;
    display: inline-block;
    padding: 30px 0 10px 0;
  }

.com-item{
  padding-bottom: 20px;
  color: #3aa294;
  border-bottom: 2px dotted #246764;
}
  .title-name{
    font-weight: bold;
    display: inline-block;
    padding: 30px 0 10px 0;
  }

.com-item{
  padding-bottom: 20px;
  color: #3aa294;
  border-bottom: 2px dotted #246764;
}

</style>
