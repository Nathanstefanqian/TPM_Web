<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false">
    <!--
    <el-table
    :data="useList"
    style="width: 100%"
  >
    <el-table-column label="序号" type="index" align="center" width="80" fixed />
    <el-table-column label="点检内容" prop="content" align="center" width="400" show-overflow-tooltip />
    <el-table-column
      label="是否绑定扫码"
      prop="isBind"
      align="center"
      :formatter="formatterBind"
      show-overflow-tooltip
    />
    <el-table-column
      label="是否输入数据"
      prop="needInput"
      align="center"
      :formatter="formatterInput"
      show-overflow-tooltip
    />
    <el-table-column label="操作" fixed="right" align="center">
      <template slot-scope="{row}">
        <el-tooltip transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">
          <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)">
            <i class="vue-icon-update" /></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    </el-table> -->
    <canvas ref="c" @click="onMouseClick" />
    <button @click="getRef">获取ref</button>
    <button @click="getDefault">点我还原</button>
    <dialog-update ref="dialogUpdate" :maintain-id="maintainId" @getContentInfo="getContentInfo" />
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultDetailViewData from '@/utils/viewData/detail'
import models from '@/models'
import crud from '@/utils/crud'
import api from '@/api'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  components: {
    DialogUpdate: () => import('./updateContent')
  },
  data() {
    const curModels = models.maintian.plan
    const curApi = api.maintain.plan
    return {
      ...getDefaultDetailViewData(), ...curModels, curApi,
      ...{
        dialogTitle: 'threejs',
        model: curModels.detail,
        functions: []
      },
      contentList: [],
      useList: [],
      maintainId: null,
      scene: null,
      camera: null,
      ambientLight: null,
      spotLighttop: null,
      spotLightbottom: null,
      renderer: null,
      control: null,
      mesh: null,
      gltf: null,
      canvas: null,
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  // Todo
  // mounted() {
  //   this.canvas = this.$refs.c
  //   this.mywindow = document.getElementsByClassName('el-dialog__body')[0]
  //   this.initScene()
  //   this.initCamera()
  //   this.initLight()
  //   this.initRenderer()
  //   this.initControls()
  //   this.loadGltf()
  //   this.animate()
  // },
  methods: {
    ...crud,
    async initDetailAfter(row, data) {
      this.model = data
      this.maintainId = this.model.id
      this.getContentInfo(this.model.id)
    },
    getContentInfo(id) {
      const iddd = 1
      console.log(iddd)
      this.loading = true
      return api.maintain.plan.getContentList(id).then(res => {
        this.useList = res.data.items
        this.loading = false
      }).catch(reject => {
        this.loading = false
      })
    },
    // 是否绑定扫码
    formatterBind(rows, column) {
      return rows.isBind === null || rows.isBind === '0' ? '-' : '✔'
    },
    // 是否输入数据
    formatterInput(rows, column) {
      return rows.needInput === null || rows.needInput === '0' ? '-' : '✔'
    },
    // 临时btn运行threejs
    getRef() {
      this.canvas = this.$refs.c
      this.initScene()
      this.initCamera()
      this.initLight()
      this.initRenderer()
      this.initControls()
      this.loadGltf()
      this.animate()
    },
    // threejs代码
    initScene() {
      this.scene = new THREE.Scene()
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera.position.set(50, 0, 0)
      this.camera.lookAt(0, 0, 0)
    },
    initLight() {
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      this.spotLighttop = new THREE.SpotLight(0xffffff, 0.8)
      this.spotLightbottom = new THREE.SpotLight(0xffffff, 0.4)
      this.spotLighttop.position.set(0, 200, 0)
      this.spotLightbottom.position.set(0, -200, 0)
      this.scene.add(this.ambientLight, this.spotLightbottom, this.spotLighttop)
    },
    initRenderer() {
      const { canvas } = this
      this.renderer = new THREE.WebGLRenderer({ canvas })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(1200, 510)
      this.renderer.setClearColor(0xffffff, 1)
      this.renderer.render(this.scene, this.camera)
    },
    initControls() {
      this.control = new OrbitControls(this.camera, this.renderer.domElement)
      this.control.maxDistance = 50
    },
    loadGltf() {
      // 创建stl模型加载器对象
      var loader = new GLTFLoader()
      console.log('aaaaa')
      loader.load(`${this.publicPath}gltf/123.gltf`, obj => {
        this.gltf = obj.scene
        // 三维模型建立坐标、缩放、旋转
        obj.scene.position.set(0, 0, 0)
        obj.scene.rotation.set(0, 0, 0)
        obj.scene.scale.set(100, 100, 100)

        obj.scene.traverse(obj => {
          if (obj.isMesh) {
            obj.material = new THREE.MeshPhysicalMaterial({
              color: obj.material.color,
              roughness: 0.8
            })
          }
        })
        this.scene.add(obj.scene)
      })
    },
    animate() {
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate.bind(this))
    },
    onMouseClick(event) {
      console.log(event)
      const intersects = this.getIntersects(event)
      console.log(intersects)
      if (intersects.length !== 0 && intersects[0].object.type === 'Mesh') {
        this.mesh = intersects[0].object
        this.gltf.traverse(obj => {
          if (obj.isMesh) {
            obj.material = new THREE.MeshPhysicalMaterial({
              color: obj.material.color,
              roughness: 0.8,
              opacity: 0.2,
              transparent: true
            })
          }
        })
        this.mesh.material = new THREE.MeshPhysicalMaterial({
          color: this.mesh.material.color,
          roughness: 0.8
        })
      } else {
        console.log('未选中 Mesh!')
      }
    },
    getIntersects(event) {
      event.preventDefault()// 阻止默认的点击事件执行,

      // 声明 rayCaster 和 mouse 变量
      const rayCaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()

      const rect = this.canvas.getBoundingClientRect()
      const cx = rect.left
      const cy = rect.top
      // 通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
      mouse.x = ((event.clientX - cx) / 1200) * 2 - 1
      // 这里为什么是-号，没有就无法点中
      mouse.y = -((event.clientY - cy) / 510) * 2 + 1

      // 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      rayCaster.setFromCamera(mouse, this.camera)

      // 获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。
      // +true，是对其后代进行查找，这个在这里必须加，因为模型是由很多部分组成的，后代非常多。
      const intersects = rayCaster.intersectObjects(this.scene.children, true)

      // 返回选中的对象
      return intersects
    },
    getDefault() {
      this.gltf.traverse(obj => {
        if (obj.isMesh) {
          obj.material = new THREE.MeshPhysicalMaterial({
            color: obj.material.color,
            roughness: 0.8
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
