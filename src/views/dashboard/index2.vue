<template>
  <div class="app-container list">
    <div class="content">
      <div id="map" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adaptive from '@/directive/el-table'

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
  },
  destroyed() {
    this.destroyed = true
    clearInterval(this.interval)
  },
  methods: {
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

.el-dialog__wrapper ::deep .el-drawer__header {
  padding: 15px 20px;
  margin-bottom: 0;
  color: black;
}

::deep .el-drawer.setting {
  position: absolute;
  z-index: 200;
  background-color: rgba(255, 255, 255, 0.8);
}

::deep .el-drawer.setting .el-drawer__body {
  overflow-y: auto;
}

::deep .el-drawer.setting .setting-content {
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

.setting-content .setting-buoy .control-item ::deep .el-input__inner {
  text-align: center;
}

.setting-content .setting-buoy .control-item ::deep .el-badge__content.is-dot {
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
