<template>
  <div id="app">
    <div>
      <span>时间控件</span>
      <du-date :selDate="date" @changeDate="setDate"></du-date>
    </div>
    <div>
      <span>下拉框</span>
      <br/>
      <div class="selectDown">
        <select-down :selectData="selectData" @selectDataChange="selectDataChange"></select-down>
      </div>
      <button class="du-btn" type="buton" @click="submitSelect">提交</button>
    </div>
    <div style="height: 500px;">
      <span>轮播图</span>
      <carousel >
        <div class="carousel-item"><div class="carousel-img" >第一个轮播图内容</div></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel1.png"/></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel2.png"/></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel3.png"/></div>
        <div class="carousel-item"><img class="carousel-img" src="../static/images/carousel4.png"/></div>
      </carousel>
    </div>
    <div>
      <span>进度条</span>
      <!--<progress-bar-view></progress-bar-view>-->
      <!--<div class="plLoading">-->
        <progressBar :cmd="parentMessages"></progressBar>
        <div class="progressBtn">
          <button  @click="start">开始连接</button>
          <button  @click="end">连接完成</button>
          <input type="text" placeholder="限时多少秒内连接完成(大于2s)" ref="limitTime"></input>
          <button @click='setLimitTime'>确定</button>
        </div>
      <!--</div>-->
    </div>


  </div>

</template>

<script>
  import duDate from './components/duDate.vue'
  import selectDown from './components/selectDown.vue'
  import carousel from './components/carousel.vue'
  import selectlist from './../static/select.json'
//  import progressBarView from './../views/progressBarView.vue'
  import progressBar from './components/progressBar.vue'
export default {
  name: 'App',
  components:{
    duDate,
    selectDown,
    carousel,
//    progressBarView,
    progressBar
  },
  data(){
    return{
      date:"2018-03-14",
      selectData:selectlist,
      selectedItem:"",
      parentMessages: 'ddd',
      limitTime: null,
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
  top: 100px;
  width: 100%;
  text-align: center;
  z-index: 999;
}
.progressBtn input{
  width: 200px;
}
</style>
