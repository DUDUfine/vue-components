<template>
    <div class="datapicker">
      <div class="data-inline">
        <input v-model="selDate" type="text" class="datainput" placeholder="yyyy-MM-dd" @click="showCalanderView" />
      </div>
      <div class="data-panel"  v-show="showCalander">
        <div class="panel-header">
          <img src="../../static/images/more-left.png"  class="du-prev-y"   @click="getYear('PRE')">
          <div  class="du-prev-m"  @click="getPreMonth"></div>
          <div class="du-year-month">
            <span class="sel-year">{{year}}年</span>
            <span class="sel-month">{{month+1}}月</span>
          </div>
          <div src="../../static/images/left.png"  class="du-next-m" @click="getNextMonth"></div>
          <img src="../../static/images/more-left.png"  class="du-next-y"    @click="getYear('NEXT')">
        </div>
        <div class="panel-body">
          <table class="calendar-table">
            <thead>
              <tr>
                <td>日</td>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td>六</td>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="row in 6">
                <td v-for="col in 7" :class="calanderList[row][col].class"  @click="getSelectDate(calanderList[row][col])">
                  {{calanderList[row][col].day}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel-footer">
          <button type="button" class="du-simple-btn" @click="handleBtn('CLEAR')">清空</button>
          <button type="button"  class="du-simple-btn" @click="handleBtn('NOW')">现在</button>
          <button type="button"  class="du-simple-btn" @click="handleBtn('COMFIRM')">确定</button>
        </div>
      </div>
    </div>
</template>

<script scroped>

    export default {
      name:"du-date",
      data(){
        return {
          MonthDays:"",
          trCount:"",
          firstDay:"",
          year:"",
          month:"",
          day:"",
          showCalander:false
        }
      },
      props:{
        selDate:String

      },created(){
        console.log("this.selDate"+this.selDate)
        this.calendar(this.selDate)


      },
      methods:{
        //是否润年（润年2月份29天）
        isLeapYear(year){
          return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)?1:0;
        },
        //根据行列初始化日历返回日期：年、月、日、class
        getCalendarDay(row,col){  //row、col从1开始
          var day=(row-1)*7+col-this.firstDay   //日历中的日期天
          var tmp={}
          if(day<=0) {//日历中上个月的日期-天
            tmp.day=day + this.getPreMonthDay();
            tmp.year=(this.month-1)<0?(this.year-1):this.year;
            tmp.month=(this.month-1)<0?11:(this.month)
            tmp.class="preMonth"
            return tmp;
          }else if(day>this.dayMonth[this.month]) {//日历中下个月的日期-天

            tmp.day=day- this.dayMonth[this.month];
            tmp.year=(this.month+1)>11?(this.year+1):this.year;
            tmp.month=(this.month+1)>11?0:(this.month+1+1)
            tmp.class="nextMonth"
            return tmp;
          }else {
            tmp.day=day;
            tmp.year=this.year;
            tmp.month=this.month+1

            if(this.day==day){//如果当前天和选择的天一致添加activeDate类
              tmp.class="curMonth activeDate"
            }else {
              tmp.class="curMonth"
            }
            return tmp;
          }

        },
        getPreMonthDay(){ //获取上一个月的天数
          var premonth=this.month-1
          if( premonth<0){   //或this.month<1
            return this.dayMonth[11]
          }else {
            return this.dayMonth[premonth]
          }
        },
        getPreMonth(){//获取上一个月（包括年）
          var premonth=this.month-1
          if(premonth>=0){
            this.month=this.month-1
          }else {
            this.year--
            this.month=11;
          }
          var date=new Date(this.year,this.month,this.day)
          this.calendar(date);//初始化日历
        },
        getNextMonth(){
          var premonth=this.month+1
          if(premonth<=11){
            this.month=this.month+1
          }else {
            this.year++
            this.month=1;
          }
          var date=new Date(this.year,this.month,this.day)
          this.calendar(date);
        },
        getYear(v1){
          if(v1==("NEXT")){
            this.year++;
          }else if(v1==("PRE")){
            this.year--
          }
          var date=new Date(this.year,this.month,this.day)
          this.calendar(date)
        },
        calendar(date){//初始化日历
          var myDate=null;
          if(date){
            myDate=new Date(date);
          }else {
            myDate=new Date();
          }
          this.year=myDate.getFullYear();
          this.month=myDate.getMonth()
          this.day=myDate.getDate();
          this.monthDays=this.dayMonth[this.month];
          var firstDate=new Date(this.year,this.month,1);
          this.firstDay=firstDate.getDay(); //当前月的第一天是星期几
        },
        getSelectDate(obj){//选择日期后将日历隐藏并将日期传给父页面
          this.showCalander=false
          this.$emit("changeDate",this.dateFormat(obj.year,obj.month,obj.day))//将日期传入父页面
        },
        handleBtn(val){
          if(val=="CLEAR"){//清除按钮
//            this.selDate=""
            this.$emit("changeDate","")//将日期传入父页面
          }else if(val=="NOW"){
            var nowData=new Date()
            this.$emit("changeDate",this.dateFormat(nowData.getFullYear(),(nowData.getMonth()+1),nowData.getDate()))
          }else if(val=="COMFIRM"){
            this.showCalander=false
          }
        },
        showCalanderView(){
          this.showCalander=true
        },
        dateFormat(year,month,day){
          return year+"-"+month+"-"+day
        }
      },
      watch:{
        //监听selDate，selDate改变时重新绘制日历
        selDate:function (date) {
          this.calendar(date)
        }
      },
      computed:{
        //月份天数数组，放于computed可以缓存，当依赖year改变时才重新计算
        dayMonth:function () {
          return [31,28+this.isLeapYear(this.year),31,30,31,30,31,31,30,31,30,31]
        },
        //将日历的进行缓存
        calanderList:function(){
          var canlanderList=[[],[],[],[],[],[],[]]
          for(var row=1;row<=6;row++){
            for(var col=1;col<=7;col++){
              canlanderList[row][col]=this.getCalendarDay(row,col)
            }
          }
          return canlanderList
        }
      }

    }
</script>

<style scroped>
  /*@import "../../node_modules/layui-src/dist/css/layui.css";*/
  @import "../../src/assets/css/du-public.css";
  .datapicker {
    width: 300px;
    position: relative;
    font-size: 14px;
  }
  .data-panel{
    border: 1px solid #9e9e9e;
    margin-top: 5px;
    width:100% ;
    position: absolute;
    z-index: 999;
    /*height: 400px;*/
    box-shadow: 1px 2px 3px #a3a3a3;
    background-color: #fff;
  }
  .panel-header,panel-footer{
    line-height: 40px;
    height: 40px;
    text-align: center;
  }
.panel-body{
  /*height: 250px;*/
  padding: 15px;
  border-top: 1px solid #9e9e9e;
  border-bottom: 1px solid #9e9e9e;
}
  .du-year-month{
    display: inline;
    vertical-align: middle;
  }
  .laydate-icon{
    padding-left: 15px;
    padding-right: 20px;
  }
  .panel-footer{
    padding: 5px 5px;
    text-align: right;
  }
  .du-simple-btn{
    background-color: white;
    padding: 3px 5px;
    border: 1px solid #9e9e9e;

  }
  .calendar-table{
    width: 100%;
    text-align: center;
  }

  .calendar-table tr{
    line-height: 30px;
    text-align: center;
  }
  .calendar-table td{
    cursor: pointer;
  }
  .preMonth, .nextMonth{
    color: #9e9e9e;
  }
  .curMonth{
    color: #101420;
  }

  .this-day{
    background-color: purple;
  }
  .activeDate{
    background-color: #009688!important;
    color: #fff!important;
  }

  .du-next-m,.du-prev-m{
    background-image: url("../../static/images/left.png");
    width: 15px;
    height: 15px;
    display: inline-block;
    line-height: 40px;
    vertical-align: middle;
    margin-left: 20px;
    margin-right: 20px;
  }

  .du-prev-y,.du-next-y{
     width: 18px;
    height: 18px;
    line-height: 40px;
    vertical-align: middle;

  }

  .du-next-m,.du-next-y{
    transform:rotate(180deg);
    -ms-transform:rotate(180deg); 	/* IE 9 */
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); 	/* Opera */
  }
</style>
