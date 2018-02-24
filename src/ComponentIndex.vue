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
  </div>

</template>

<script>
  import duDate from './components/duDate.vue'
  import selectDown from './components/selectDown.vue'
  import selectlist from './../static/select.json'
export default {
  name: 'App',
  components:{
    duDate,
    selectDown
  },
  data(){
    return{
      date:"2018-03-14",
      selectData:selectlist,
      selectedItem:""
    }
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

    }
  },
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/

  .selectDown{
    display: inline-block;
    width: 500px;
  }
</style>
