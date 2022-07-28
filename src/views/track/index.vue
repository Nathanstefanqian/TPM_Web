<template>
  <div class="app-container list">
    <div ref="toolbar" class="toolbar">
      <div class="tool-group">
        <el-select v-if="user.roleType <=2" v-model="query.companyId" class="query-item" style="width: 150px" placeholder="所属企业" filterable clearable @change="value=>handleChangeCompany(value)">
          <el-option v-for="item in companies" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <el-select v-model="query.taskId" class="query-item" style="width: 150px" placeholder="任务" filterable clearable @change="value=>handleChangeTask(value)">
          <el-option v-for="item in tasks" :key="item.key" :label="item.text" :value="item.key" />
        </el-select>
        <span v-for="item in buoys" :key="item.imei" class="query-buoy">
          <el-checkbox v-model="item.checked" :label="item.text" />
        </span>
        <el-button class="tool tool-query" type="primary" icon="el-icon-search" @click="handleGetTrackData">获取轨迹数据</el-button>
      </div>
    </div>
    <div v-show="imeis.length>0" class="info-wrapper">
      <div v-for="(imei,index) in imeis" :key="index" class="info">
        <i class="legend" :style="{backgroundColor:pathColors[index]}" />
        <h6> {{ buoys.find(f => f.key === imei).text }} <span class="imei">(IMEI：{{ imei }})</span></h6>
        <div class="info-item">
          <span class="info-item-label">时间：</span>
          <span class="info-item-value" style="width: 170px">{{ datas[index][currentIndex[index]].time }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-label">位置：</span>
          <span class="info-item-value">{{ datas[index][currentIndex[index]].lonGcj }}, {{ datas[index][currentIndex[index]].latGcj }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-label">速度：</span>
          <span class="info-item-value" style="width: 90px">{{ datas[index][currentIndex[index]].velocity }}米/秒</span>
          <span class="info-item-label">流向：</span>
          <span class="info-item-value" style="width: 60px">{{ datas[index][currentIndex[index]].directionAng }}°</span>
          <span class="info-item-label">深度：</span>
          <span class="info-item-value">{{ datas[index][currentIndex[index]].depth }}米</span>
        </div>
      </div>
    </div>
    <div id="map" />
    <div v-show="imeis.length>0" class="control-panel">
      <div class="speed-times">
        <el-select v-model="currentSpeedTimes" placeholder="倍速" style="width: 110px" @change="handleChangeSpeedTimes()">
          <el-option v-for="item in speedTimesOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-button v-show="playStatus==='stop'" type="primary" plain @click="start">开始</el-button>
      <el-button v-show="playStatus==='playing'" type="warning" plain @click="pause">暂停</el-button>
      <el-button v-show="playStatus==='pause'" type="success" plain @click="resume">继续</el-button>
      <el-button v-show="playStatus==='playing'||playStatus==='pause'" type="danger" plain @click="stop">停止</el-button>
    </div>
  </div>
</template>

<script>
import { Loading, Message } from 'element-ui'
import { mapGetters } from 'vuex'
import AMap from 'AMap'
import AMapUI from 'AMapUI'
import api from '@/api'
import adaptive from '@/directive/el-table'

export default {
  name: 'Track',
  directives: { adaptive },
  data() {
    return {
      query: { companyId: null, taskId: null, imei: null },
      companies: [],
      tasks: [],
      buoys: [],
      loading: false,

      map: null,
      pathSimplifierIns: null,
      pathNav: [],

      datas: [],
      imeis: [],
      pathData: [],
      speedData: [],
      currentSpeedTimes: 1,
      currentIndex: [],

      playStatus: 'stop',

      speedTimesOptions: [
        { value: 1, label: '1倍速' },
        { value: 2, label: '2倍速' },
        { value: 5, label: '5倍速' },
        { value: 10, label: '10倍速' },
        { value: 20, label: '20倍速' },
        { value: 50, label: '50倍速' },
        { value: 100, label: '100倍速' },
        { value: 200, label: '200倍速' }
      ],
      pathColors: ['#00ffff', '#ffff00', '#9999ff', '#ff33ff', '#3333ff', '#ffccff', '#0099ff', '#cc6600', '#66ff99', '#cc9900'],
      navColors: ['#2dc8c8', '#cdcd32', '#7575c0', '#c728c7', '#2626c5', '#d194d1', '#0077c6', '#a35100', '#54c479', '#9b7400']
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    if (this.user.roleType <= 2) {
      this.getCompanies()
    } else {
      this.getTasks(this.user.companyId)
    }
  },
  mounted() {
    this.initMap()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    // 根据登录用户角色获取企业列表
    getCompanies() {
      api.company.getSelectlist().then(response => {
        this.companies = response.data || []
      })
    },
    // 切换企业
    handleChangeCompany(companyId) {
      // 清空任务列表
      this.tasks = []
      // 清空任务查询条件
      this.query.taskId = null
      // 清空浮标列表、查询条件
      this.handleChangeTask(null)
      if (companyId != null) {
        this.getTasks(companyId)
      }
    },
    // 获取任务
    getTasks(companyId) {
      api.task.getSelectlist(companyId).then(response => {
        this.tasks = response.data || []
      })
    },
    // 切换任务
    handleChangeTask(taskId) {
      this.buoys = []
      this.query.imei = []
      this.clearTrackData()
      if (taskId != null) {
        this.getBuoys(taskId)
      }
    },
    // 获取浮标
    getBuoys(taskId) {
      api.buoy.getSelectlistByTaskId(taskId).then(response => {
        if (response.data.length <= 0) return false
        this.buoys = response.data.map(m => {
          return { ...m, checked: true }
        })
      })
    },
    // 地图加载
    initMap() {
      this.map = new AMap.Map('map', {
        zoom: 5,
        // zoom: 12,
        center: [107.45, 33.68],
        // center: [120.829, 32.037],
        layers: [
          new AMap.TileLayer.Satellite(),
          new AMap.TileLayer.RoadNet()
        ]
      })
    },
    clearTrackData() {
      // 清空前次数据
      // this.stop()
      if (this.pathSimplifierIns) {
        this.pathSimplifierIns.clearPathNavigators()
        this.pathSimplifierIns.setData(null)
      }
      this.pathNav = []
      this.datas = []
      this.imeis = []
      this.pathData = []
      this.speedData = []
      this.currentSpeedTimes = 1
      this.currentIndex = []
      this.playStatus = 'stop'
    },
    // 获取轨迹数据（历史数据）
    handleGetTrackData() {
      this.clearTrackData()
      if (!this.query.taskId) {
        Message.warning('请选择任务')
        return
      }
      this.query.imei = this.buoys.filter(f => f.checked).map(m => m.key)
      if (!this.query.imei || this.query.imei.length <= 0) {
        Message.warning('请选择浮标')
        return
      }
      this.loading = Loading.service({ target: '#map' })
      this.query.imei = this.buoys.filter(f => f.checked).map(m => {
        return m.key
      })
      api.historyData.getList({ taskId: this.query.taskId, imei: this.query.imei }, { current: 1, size: 1000000 }, { prop: 'buoy_data.time', order: 'ascending' }).then(response => {
        if (response.data.items === null || response.data.items.length === 0) {
          this.loading.close()
          Message.info('当前选择的任务浮标无轨迹数据')
          return false
        }

        // 数据分类处理
        for (const imei of this.query.imei) {
          const data = response.data.items.filter(f => f.imei === imei)
          if (data.length === 0) continue
          this.imeis.push(imei)
          this.datas.push(data)
          this.pathData.push({ name: imei, path: data.map(m => [+m.lonGcj, +m.latGcj]) })
          this.speedData.push(data.map(m => +m.velocity * 3.6))
          this.currentIndex.push(0)
        }

        // 画轨迹
        this.drawTrack()
        this.loading.close()
      }).catch(() => {
        this.loading.close()
      })
    },
    // 画轨迹
    drawTrack() {
      const that = this
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        // 创建巡航轨迹路线
        if (!that.pathSimplifierIns) {
          that.pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            map: that.map,
            getPath: function(pathData, pathIndex) {
              return pathData.path
            },
            getHoverTitle: function(pathData, pathIndex, pointIndex) {
              if (pointIndex >= 0) {
                const data = that.datas[pathIndex][pointIndex]
                return '时间：' + data.time + '<br/>位置：' + data.lonGcj + ', ' + data.latGcj + '<br/>速度：' + data.velocity + 'm/s, 角度：' + data.directionAng + '°, 深度：' + data.depth + 'm'
              }
            },
            renderOptions: {
              pathTolerance: 1,
              keyPointTolerance: 0,
              renderAllPointsIfNumberBelow: 100,
              pathLineStyle: {
                lineWidth: 4,
                borderWidth: 1,
                borderStyle: '#ffffff',
                dirArrowStyle: true
              },
              dirArrowStyle: {
                stepSpace: 35,
                strokeStyle: '#ffffff',
                lineWidth: 2
              },
              startPointStyle: {
                radius: 5,
                fillStyle: '#109618'
              },
              endPointStyle: {
                radius: 5,
                fillStyle: '#ff0000'
              },
              keyPointStyle: {
                radius: 3,
                fillStyle: 'rgba(8, 126, 196, 1)',
                lineWidth: 1,
                strokeStyle: '#ffffff'
              },
              keyPointHoverStyle: {
                radius: 3,
                fillStyle: null,
                lineWidth: 2,
                strokeStyle: '#ff0000'
              },
              getPathStyle: function(pathItem, zoom) {
                return {
                  pathLineStyle: {
                    strokeStyle: that.pathColors[pathItem.pathIndex]
                  },
                  pathLineHoverStyle: {
                    strokeStyle: that.pathColors[pathItem.pathIndex]
                  },
                  pathLineSelectedStyle: {
                    strokeStyle: that.pathColors[pathItem.pathIndex]
                  }
                }
              }
            }
          })
        }
        that.pathSimplifierIns.clearPathNavigators()
        // 设置数据
        that.pathSimplifierIns.setData(that.pathData)

        // 巡航器
        for (let i = 0; i < that.imeis.length; i++) {
          const pathNav = that.pathSimplifierIns.createPathNavigator(i, {
            loop: false,
            speed: that.speedData[i][0] * that.currentSpeedTimes, // 千米/小时
            pathNavigatorStyle: {
              width: 20,
              height: 20,
              lineJoin: 'round',
              content: 'defaultPathNavigator',
              fillStyle: that.navColors[i],
              strokeStyle: '#ffffff',
              lineWidth: 1,
              pathLinePassedStyle: {
                lineWidth: 1,
                strokeStyle: '#ffffff',
                borderWidth: 0,
                borderStyle: null,
                dirArrowStyle: false
              }
            }
          })
          that.pathNav.push(pathNav)
          // 回放移动事件
          pathNav.on('move', function() {
            const idx = this.getCursor().idx
            that.$set(that.currentIndex, i, idx)
            that.pathNav[i].setSpeed(that.speedData[i][idx] * that.currentSpeedTimes)
          })
        }
      })
    },
    start() {
      this.playStatus = 'playing'
      for (let i = 0; i < this.pathNav.length; i++) {
        this.pathNav[i].start()
      }
    },
    pause() {
      this.playStatus = 'pause'
      for (let i = 0; i < this.pathNav.length; i++) {
        this.pathNav[i].pause()
      }
    },
    resume() {
      this.playStatus = 'playing'
      for (let i = 0; i < this.pathNav.length; i++) {
        this.pathNav[i].resume()
      }
    },
    stop() {
      this.playStatus = 'stop'
      for (let i = 0; i < this.pathNav.length; i++) {
        this.pathNav[i].stop()
      }
    },
    handleChangeSpeedTimes() {
      for (let i = 0; i < this.pathNav.length; i++) {
        this.pathNav[i].setSpeed(this.speedData[i][this.currentIndex[i]] * this.currentSpeedTimes)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.app-container {
  position: relative;
}

.toolbar {
  position: absolute;
  z-index: 100;
  top: 20px;
  left: 20px;
  border-radius: 0 4px 4px 0;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
}

.toolbar .query-buoy {
  margin: 0 7px;
}

#map {
  position: relative;
  height: 100%;
  width: 100%;
}

.info-wrapper {
  position: absolute;
  z-index: 100;
  top: 80px;
  left: 20px;
  max-height: calc(100% - 100px);
  box-sizing: border-box;
  padding: 15px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
  overflow-y: auto;
}

.info {
  position: relative;
  padding: 10px;
  width: 340px;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}

.info .legend {
  display: inline-block;
  position: absolute;
  z-index: 1;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  top: 15px;
  right: 15px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .5);
}

.info h6 {
  padding: 0;
  margin: 0;
  height: 24px;
  line-height: 24px;
  color: #409EFF;
  font-weight: bold;
  font-size: 14px;
}

.info h6 .imei {
  color: #555;
}

.info-item {
  height: 24px;
  line-height: 24px;
}

.info-item-label {
  margin-left: 5px;
  text-align: right;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: #555;
}

.info-item-value {
  margin-left: 0;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: black;
}

.control-panel {
  position: absolute;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 4px;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
}

.control-panel .speed-times {
  width: 110px;
  display: inline-block;
  margin-right: 10px;
}

</style>
