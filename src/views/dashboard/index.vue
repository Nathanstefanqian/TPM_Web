<template>
  <div class="app-container list">
    <div class="content" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AMap from 'AMap'
import api from '@/api'
import adaptive from '@/directive/el-table'
import { parseTime } from '@/utils'
import { Message } from 'element-ui'

export default {
  name: 'NoKeepAliveDashboard',
  directives: { adaptive },
  data() {
    return {
      map: null,
      datas: [],
      settingData: [],
      interval: null,
      settingVisible: false,
      refreshTime: null,
      timeColor: '#409EFF',
      destroyed: false
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  mounted() {
    // this.initMap()
  },
  destroyed() {
    this.destroyed = true
    clearInterval(this.interval)
  },
  methods: {
    getRealtimeData() {
      const self = this
      api.realtimeData.getList(null, { current: 1, size: 1000 }, null).then(response => {
        this.map.clearMap()
        if (this.destroyed) return
        this.datas = response.data.items
        // 更新设置区
        const newSettingData = this.datas.map(m => {
          const exist = this.settingData.find(f => f.imei === m.imei)
          if (exist) {
            return { imei: m.imei, reportInterval: exist.reportInterval, ledFlashInterval: exist.ledFlashInterval }
          } else {
            return { imei: m.imei, reportInterval: null, ledFlashInterval: null }
          }
        })
        this.settingData = newSettingData

        // 更新地图
        this.datas.forEach((data) => {
          if (this.destroyed) return
          // 创建点标记
          const marker = new AMap.Marker({
            map: this.map,
            position: [+data.lonGcj, +data.latGcj],
            title: data.buoyCode,
            icon: new AMap.Icon({
              image: '/images/buoy.png',
              size: new AMap.Size(57, 91),
              imageSize: new AMap.Size(19, 30)
            })
          })
          this.$nextTick(() => {
            if (this.$refs['info-' + data.imei].length <= 0) return
            // 创建信息窗
            const infoWindow = new AMap.InfoWindow({
              isCustom: true,
              content: this.$refs['info-' + data.imei][0].innerHTML,
              offset: new AMap.Pixel(16, -45),
              anchor: 'bottom-center'
            })
            // 事件监听
            marker.on('click', function() {
              infoWindow.open(self.map, marker.getPosition())
            })
          })
        })
        // 调整地图视域
        if (this.datas.length > 0) {
          this.map.setFitView()
        }
        // 更新刷新时间
        this.refreshTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
        this.timeColor = '#F56C6C'
        setTimeout(() => {
          this.timeColor = '#409EFF'
        }, 500)
      })
    },
    // 初始化地图
    initMap() {
      this.map = new AMap.Map('map', {
        zoom: 5,
        center: [107.45, 33.68],
        layers: [
          new AMap.TileLayer.Satellite(),
          new AMap.TileLayer.RoadNet()
        ]
      })
      this.map.on('complete', () => {
        this.getRealtimeData()
        this.interval = setInterval(() => {
          this.getRealtimeData()
        }, 4000)
      })
      // AMap.plugin(['AMap.MapType', 'AMap.ToolBar', 'AMap.Scale'], function() {
      //   this.map.addControl(new AMap.MapType())
      //   this.map.addControl(new AMap.ToolBar())
      //   this.map.addControl(new AMap.Scale())
      // })
    },
    handleLedOn(imei) {
      api.buoy.ledOn(imei)
    },
    handleLedOff(imei) {
      api.buoy.ledOff(imei)
    },
    handleReboot(imei) {
      api.buoy.reboot(imei)
    },
    handleSetReportInterval(imei, interval) {
      if (!interval || !Number.isFinite(+interval)) {
        Message.error('请填写数值')
        return
      }
      api.buoy.setReportInterval(imei, interval)
    },
    handleSetLedFlashInterval(imei, interval) {
      if (!interval || !Number.isFinite(+interval)) {
        Message.error('请填写数值')
        return
      }
      api.buoy.setLedFlashInterval(imei, interval)
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  height: 100%;
  width: 100%;
  position: relative;
}

#map {
  height: 100%;
  width: 100%;
}

#refresh-time {
  position: absolute;
  z-index: 1;
  right: 15px;
  top: 15px;
  color: #555;
  font-size: 14px;
  padding: 15px 20px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
}

#refresh-time .time {
  color: #409EFF;
  font-weight: bold;
}

.open-setting {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 15px;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #409EFF;
  font-size: 14px;
  border-radius: 0 40px 40px 0;
  cursor: pointer;
  box-shadow: 4px 0 6px rgba(0, 0, 0, .5);
}

.el-dialog__wrapper {
  width: 460px !important;
}

.el-dialog__wrapper /deep/ .el-drawer__header {
  padding: 15px 20px;
  margin-bottom: 0;
  color: black;
}

/deep/ .el-drawer.setting {
  position: absolute;
  z-index: 200;
  background-color: rgba(255, 255, 255, 0.8);
}

/deep/ .el-drawer.setting .el-drawer__body {
  overflow-y: auto;
}

/deep/ .el-drawer.setting .setting-content {
  padding: 0 20px 20px;
  color: #222;
  font-size: 14px;
}

.setting-content .setting-buoy {
  background-color: rgba(255, 255, 255, .8);
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  padding: 10px;
}

.setting-content .setting-buoy .info-item {
  height: 24px;
  line-height: 24px;
}

.setting-content .setting-buoy .info-item-label {
  margin-left: 10px;
  text-align: right;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: #555;
}

.setting-content .setting-buoy .info-item-value {
  margin-left: 5px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: black;
}

.setting-content .setting-buoy h6 {
  padding: 0;
  margin: 0;
  height: 24px;
  line-height: 24px;
  color: #409EFF;
  font-weight: bold;
  font-size: 14px;
}

.setting-content .setting-buoy h6 .imei {
  color: #555;
}

.setting-content .setting-buoy .control-item {
  height: 34px;
  line-height: 34px;
}

.setting-content .setting-buoy .control-item /deep/ .el-input__inner {
  text-align: center;
}

.setting-content .setting-buoy .control-item /deep/ .el-badge__content.is-dot {
  height: 10px;
  width: 10px;
  right: 13px;
  top: 11px;
  border: 0
}

.setting-content .setting-buoy .control-item .el-badge + .el-badge,
.setting-content .setting-buoy .control-item .el-input + .el-button {
  margin-left: 10px;
}

.info-wrapper {
  display: none;
}

.info {
  padding: 10px;
  width: 250px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #999;
  font-size: 14px;
}

.info .info-item {
  height: 24px;
  line-height: 24px;
}

.info .info-item-label {
  width: 70px;
  text-align: right;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: #444;
  font-weight: bold;
}

.info .info-item-value {
  margin-left: 5px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: black;
  font-weight: bold;
}

</style>
