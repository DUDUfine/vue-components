<template>
  <div id="app">
    <div>
      <span>时间控件</span>
      <du-date :selDate="date" @changeDate="setDate"></du-date>
    </div>
  </div>
</template>

<script>
  import duDate from './components/duDate.vue'
export default {
  name: 'App',
  components:{
    duDate
  },
  data(){
    return{
      date:"2018-03-14"
    }
  },
  components:{
    duDate
  },

  methods:{
    setDate(va){
      console.log("日期666"+va)
      this.date=va
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
