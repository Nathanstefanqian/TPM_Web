<template>
  <el-dialog v-loading="loading" :custom-class="'dialog-fullscreen dialog-'+dialogClass" :title="dialogTitle" :visible.sync="visible" :modal="false" :modal-append-to-body="false">
    <el-form ref="form" label-position="right" :rules="rules" :model="model" :label-width="labelWidth||'120px'">
      <el-row>
        <el-col :xl="6" :lg="8" :md="10" :sm="12" :xs="24">
          <el-form-item label="流程名称" prop="name">
            <el-input v-model="model.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="流程类型" prop="type">
            <el-radio v-model="model.type" :label="1" border>报修</el-radio>
            <el-radio v-model="model.type" :label="2" border>委外</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="流程预览">
            <el-steps align-center :space="400">
              <el-step v-for="(item,index) in flowDatas" :key="index" :title="item.name" :description="item.checkerName">
                <div slot="description">
                  <div>
                    {{ item.checkerName }}
                    <span v-if="item.username != null">({{ item.username }})</span>
                  </div>
                  <!--                  <el-button v-if="active ===index" type="default" @click="handleChangePerson(item)">修改</el-button>-->
                </div>
              </el-step>
            </el-steps>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="流程编辑">
            <el-button class="tool tool-create" type="primary" size="small" icon="vue-icon-create" @click="handleCreate">添加节点</el-button>
            <el-table :data="flowDatas" style="width: 100%">
              <el-table-column label="序号" type="index" align="center" width="65" fixed />
              <el-table-column label="流程节点名称" prop="name" align="center" show-overflow-tooltip />
              <el-table-column label="处理人" prop="checkerName" align="center" show-overflow-tooltip />
              <el-table-column label="操作" fixed="right" align="center" width="180">
                <template slot-scope="{row}">
                  <el-tooltip transition="false" :hide-after="1000" class="item" content="编辑" placement="top-end">
                    <el-button type="primary" plain class="button-operate button-update" size="mini" @click="handleUpdate(row)"><i class="vue-icon-update" /></el-button>
                  </el-tooltip>
                  <el-tooltip transition="false" :hide-after="1000" class="item" content="删除" placement="top-end">
                    <el-button type="danger" plain class="button-operate button-delete" size="mini" @click="deleteNode(row)"><i class="vue-icon-delete" /></el-button>
                  </el-tooltip>
                  <el-tooltip transition="false" :hide-after="1000" class="item" content="上移" placement="top-end">
                    <el-button plain size="mini" class="button-operate button-delete" @click="moveup(row)"><i class="el-icon-top" /></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitUpdate">提交</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
    <dialog-create ref="dialogCreate" />
    <dialog-update ref="dialogUpdate" />
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import getDefaultUpdateViewData from '@/utils/viewData/update'
import models from '@/models'
import rules from './rules'
import crud from '@/utils/crud'
import api from '@/api'

export default {
  components: {
    DialogCreate: () => import('./createnode'),
    DialogUpdate: () => import('./updatenode')
  },
  data() {
    const curModels = models.system.workFlow
    const curApi = api.system.workFlow
    const nodeApi = api.system.flowNodes
    return {
      ...getDefaultUpdateViewData(), ...curModels, curApi, rules,
      nodeApi,
      ...{
        dialogTitle: '编辑签核流程',
        model: curModels.update,
        // roleTypes: [],
        // companies: [],
        roles: [],
        flowDatas: []
      }
    }
  },
  computed: {
    ...mapGetters(['enums', 'user'])
  },
  created() {
    this.curApi.getFlowTypes()
  },
  methods: {
    ...crud,
    // 初始化数据之后 row：行绑定数据；data：接口返回数据
    async initUpdateAfter(row, data) {
      this.model = data
      this.getFlowNode(this.model.id)
    },
    // 获取流程各节点
    getFlowNode(id) {
      this.loading = true
      return api.system.workFlow.getFlows(id).then(res => {
        this.flowDatas = res.data
        // if (this.flowDatas.checkOrder === 1) {
        //   this.disabled = true
        // }else {
        //   this.disabled = false
        // }
        this.loading = false
      }).catch(reject => {
        this.loading = false
      })
    },

    deleteNode(row) {
      console.log(row.id)
      this.deleteData([row.id])
    },

    deleteData(ids) {
      this.$confirm('数据删除后，不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 钩子，删除前执行。返回true，执行删除；返回false，退出
        if (this.deleteSubmitBefore) {
          if (!this.delegeSubmitBefore()) return
        }
        // this.loading.deletes = true
        this.nodeApi.del(ids).then(response => {
          // 钩子，删除后执行。无返回值
          if (this.deleteSubmitAfter) this.delegeSubmitAfter()
          // 重新获取数据
          // this.getDatas()
          this.getFlowNode(this.model.id)
          // this.loading.deletes = false
        }).catch(() => {
          // this.loading.deletes = false
        })
      })
    },

    moveup(row) {
      console.log(row.id)
      this.$confirm('此条流程将移至上一个节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.nodeApi.moveupSort(row.id).then(res => {
          this.getFlowNode(this.model.id)
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
