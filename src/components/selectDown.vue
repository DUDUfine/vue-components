<template>
    <div >
      <div class="du-form-select" id="selectArea">
        <div class="du-select" @click="isScrollSelect">
          <input type="text" placeholder="请选择一个城市" v-model="city.value" id="selectCity" @blur="selectBlur" required @keydown="selectSearchFilter">
          <img src="../../static/drop-icon.png" class="du-dropDown-menu-icon" style="width: 22px;height:22px" id="selecUpicon"/>
        </div>
        <transition name="list">
          <dl class="du-anim du-anim-upbit" v-show="selectShow" :class="{selectScroll: isActive}" >
            <dd value="" @click="setSelectData($event)" class="du-select-tip">请选择</dd>
            <dd v-for="(item,index) in selectlist.city" :value="item.key" @mousedown="setSelectData($event)">{{item.value}}</dd>
          </dl>
        </transition>

      </div>
    </div>
</template>

<script scroped>

export default {
  data () {
    return{
      city:{"key":"","value":""},
      selectShow:false,
      selectlist:"",
      isActive:false,
      date:"2018-03-14"
    }
  },
  props: ['selectData'],
  created(){
    //父组件传递来的selectData赋值
      this.selectlist = this.selectData;

    },
    computed: {
    },
  mounted:function(){
//      var self=this
//      ----------点击非下拉框下拉框收起Start-----------
//        document.onclick=function (event) {
//          var area=document.getElementById('selectArea');
//          var areadd=area.getElementsByTagName("dd");
//          for(var j=0;j<areadd.length;j++){
//            if(areadd[j]==event.target){
//              return ;
//            }
//          }
//          if(document.getElementById("selectCity")==event.target ||document.getElementById("selecUpicon")==event.target){
//            return ;
//          }
//          {
//            self.selectShow = !self.selectShow;
//            console.log(self.selectShow )
//          }
//        }
      //      ----------点击非下拉框下拉框收起End-----------

  },
  methods:{
    submitCity(){
      if(this.city.key==null||this.city.key=="") {
        alert("请选择一个城市！")
      }

    },

    setSelectData(event){
      //        this.selectShow=false;   //下拉框使用失焦方法时去掉
      this.city.key=event.currentTarget.getAttribute("value");
      this.city.value=event.currentTarget.innerText;
      this.$emit("selectDataChange",this.city)//将日期传入父页面

    },
    selectBlur(){
      console.log("下拉框失去焦点")
      this.selectShow=false;
    },
    isScrollSelect() {
      var self=this
      this.selectShow=true;
      var dl=document.getElementsByTagName("dl");
    //    setTimeout(function () {
    //      console.log("执行滚动"+dl[0].offsetHeight)
    //      if(dl[0].offsetHeight >100){
    //        self.isActive=true;
    //      }
    //    },2)
    },
    setDate (va) {
      this.date = va
    }
  },
  computed: {
    selectSearchFilter: function () {
      var newSelectData = ''
      if (!this.city) {
        return
      }
      var selectdata = this.selectlist.city[0]
      for (var key in selectdata) {
        if (selectdata[key].indexOf(this.inputData) > 0) {
          newSelectData.push(selectdata[key])
        }
      }
      return selectdata
    }
  }
};

</script>

<style scroped>
  @import "../../src/assets/css/du-public.css";

  .layuipage{

  }
  .form-btn{
    margin-top:10px;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter, .list-leave-to{
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
