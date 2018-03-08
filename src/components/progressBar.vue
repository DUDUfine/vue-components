<template>
  <div class="plLoading">
    <div class="plLoadingNum">{{progress}}%</div>
      <div class="plLoadingCon">
        <div class="plLoadingShow" ref="plLoadingShow" :style="{width: plsStyleWidth+'%'}"></div>

        <div class="plLoCir" :style="{left: plsStyleWidth+'%'}" v-show="plcShow"></div>
      </div>

  </div>
</template>

<script scroped>

//以下为各种初始量
var totalWidth = 100
var pauseWidth = totalWidth*0.9 //设置在进度条总宽度的90%处停止
var limitTime,pauseTime,a,v0,t = 0,s0 = 0,nowWidth = 0
var myTimer=null
var state = "init"
export default {
  props:['cmd'],
  data() {
      return {
        plsStyleWidth: 0,
        progress: 0,
        plcShow:true
      };
    },
  watch:{
    cmd:function (newOrder, oldOrder){
        var isInteger = /^[0-9]*[1-9][0-9]*$/　　//判断是否为正整数

  　　  if(newOrder=='start'){
          this.start()
        }else if(newOrder=='end'){
          this.end()
        }else if(newOrder=='reset'){
          this.reset()
        }else if(isInteger.test(newOrder)){
          this.setDecelerationParam(newOrder*1000)     //当传入的是秒数将转成毫秒数
        }      　
  　　}
  },
  created(){
    this.setDecelerationParam(12*1000)
  },
  methods: {
    //进度条开始
    start: function (event) {
      if(state!='init') return
      state = 'start'
      var self = this

      myTimer = setInterval(function(){
          changeWidth()
        },1);

      function changeWidth(){
        t=t+10
        if (state=='wait') {
          if(t==limitTime){
            clearInterval(myTimer)
            state = 'timeout'
            bus.$emit("EVENT_TIMEOUT")

          }
          return
        }
        nowWidth=s0+v0*t +a*t*t/2
        self.plsStyleWidth=nowWidth
        self.progress= (nowWidth/totalWidth*100).toFixed(2)
        bus.$emit("EVENT_UPDATE_PROGRESS",self.progress)
        if(t==pauseTime){
          if(state=='end') {
            //点击连接完成后进入此处
            clearInterval(myTimer)
            self.plcShow = false
            state = 'finish'
            bus.$emit("EVENT_FINISH")
          }else if(state=='stop-reset'){
            clearInterval(myTimer)
            state='init'
            totalWidth = 100
            pauseWidth = totalWidth*0.9 //设置在进度条总宽度的90%处停止
            limitTime,pauseTime,a,v0,t = 0,s0 = 0,nowWidth = 0
            self.plsStyleWidth=0
            self.progress= 0
            self.plcShow = true
          }else{
            state = 'wait'
          }
        }
        if(state=='start-reset'){
          clearInterval(myTimer)
          state='init'
          totalWidth = 100
          pauseWidth = totalWidth*0.9 //设置在进度条总宽度的90%处停止
          limitTime,pauseTime,a,v0,t = 0,s0 = 0,nowWidth = 0
          self.plsStyleWidth=0
          self.progress= 0
          self.plcShow=true

        }
      }
    },
    //进度条结束
    end: function (event) {
        if (!(state == 'start'||state =='wait')) return
          state='end'
          this.setConstantParam()
    },
    reset: function (event){
     if(state=="finish"||state=="wait"||state=="timeout"||state=="start"){
       clearInterval(myTimer)
        state='init'
        totalWidth = 100
        pauseWidth = totalWidth*0.9 //设置在进度条总宽度的90%处停止
        limitTime,pauseTime,a,v0,t = 0,s0 = 0,nowWidth = 0
        this.plsStyleWidth=0
        this.progress= 0
        this.plcShow=true
      }else{
       clearInterval(myTimer)
        state='stop-reset'
        totalWidth = 100
        pauseWidth = totalWidth*0.9 //设置在进度条总宽度的90%处停止
        limitTime,pauseTime,a,v0,t = 0,s0 = 0,nowWidth = 0
        this.plsStyleWidth=0
        this.progress= 0
        this.plcShow=true
      }
      this.setDecelerationParam(12*1000)
    },
    //开始后设置参数
    setDecelerationParam(lim){
      limitTime=lim
      pauseTime = limitTime-2000
      a = -1*(2*pauseWidth)/(pauseTime*pauseTime)//匀变速公式
      v0 = -1*a*pauseTime//初始速度
    },
    //结束后设置参数
    setConstantParam(){
      pauseTime = 1*1000
      t=0
      s0=nowWidth
      a = 0
      v0=(totalWidth-nowWidth)/pauseTime
    }
  }
}
</script>

<style>
  .plLoading{
    position: relative;
  }
  .plLoadingContent{

  }
  .plLoadingCon{
    /*width: 500px;*/
    height: 16px;
    border-radius: 8px;
    background-color: #222222;
  }
  .plLoadingShow{
    height: 16px;
    border-radius: 8px;
    background-color: #0062b2;
    position: relative;
  }
  .plLoCir{
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #0062b2;
    box-shadow: 0 0 20px #008cff;
  }
  .plLoadingNum{
    font-size: 12px;
    color: #ffffff;
    /* margin-top: 20px; */
    text-align: center;
    width: 100%;
    z-index: 10;
    position: absolute;
  }
  .plLoadingContent button,.plLoadingContent input{
  	position: relative;
	  top:30px;

  }
</style>
