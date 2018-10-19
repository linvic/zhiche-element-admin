<template>
  <div class="map-contain">
    <div id = "map">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:"car_monitor",
    data() {
      return {

      }
    },
    mounted(){
      this.initMap()
    },
    created(){


    },
    methods:{
    //  初始化地图
      initMap(){
        let map = new BMap.Map("map");            // 创建Map实例
        let point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point,15);
        map.enableScrollWheelZoom();                 //启用滚轮放大缩小
      }
    }
  }
</script>
<style lang="scss" scoped>
  .map-contain{
    width: 100%;
    height: 100%;
    margin:0;
    position: relative;
    font-family:"微软雅黑";
  }
  #map{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin:0;
    font-family:"微软雅黑";
  }
</style>