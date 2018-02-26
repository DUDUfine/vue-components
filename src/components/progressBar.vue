<template>
  <div class="plLoading">
    <div class="plLoadingContent">
      <div class="plLoadingCon">
        <div class="plLoadingShow" ref="plLoadingShow" :style="{width: plsStyleWidth+'px'}"></div>
        <div class="plLoCir" :style="{left: plsStyleWidth+'px'}" v-show="plcShow"></div>
      </div>
      <div class="plLoadingNum">{{progress}}%</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

//以下为各种初始量
// var totalWidth = document.getElementsByClassName("plLoadingCon")[0].clientwidth
var totalWidth = 500
var pauseWidth = totalWidth*0.9 //设置在进度条总宽度的90%处停止 
var limitTime,pauseTime,a,v0,t = 0,s0 = 0,nowWidth = 0

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
        }else if(isInteger.test(newOrder)){
          this.setDecelerationParam(newOrder*1000)
        }      　 
  　　} 
  },
  created(){
    this.setDecelerationParam(12*1000)
  },
  methods: {
    start: function (event) {  
      if(state!='init') return
      state = 'start'
      var self = this   
      
      var myTimer = setInterval(function(){
          changeWidth()
        },10);

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
          }
          else{
            state = 'wait'
          }         
        }
      }     
    },
    end: function (event) {
        if (!(state == 'start'||state =='wait')) return
          state='end'
          this.setConstantParam()
    },
    setDecelerationParam(lim){
      limitTime=lim
      pauseTime = limitTime-2000
      a = -1*(2*pauseWidth)/(pauseTime*pauseTime)//匀变速公式
      v0 = -1*a*pauseTime//初始速度
    },
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
    width: 80%;
    height: 38%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50px;
  }
  .plLoadingContent{
    width: 500px;
    height: 220px;
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -250px;
  }
  .plLoadingCon{
    width: 500px;
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
    font-size: 14px;
    color: #0062b2;
    margin-top: 20px;
    text-align: center;
  }
  .plLoadingContent button,.plLoadingContent input{
  	position: relative;
	  top:30px;

  }
</style>