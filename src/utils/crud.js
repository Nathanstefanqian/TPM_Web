import _ from 'lodash'
import { parseTime } from '@/utils'

// =========================================列表=========================================
/**
 * 从接口获取列表数据
 */
function getDatas(setting) {
  const params = { ...{ showLoading: true }, ...setting }
  if (params.showLoading) this.loading.table = true
  this.queryReal = _.cloneDeep(this.query)
  this.curApi.getList(this.queryReal, this.page, this.sort).then(response => {
    this.datas = response.data.items || response.data
    this.page.total = response.data.total
    // 钩子，获取数据后执行。无返回值
    if (this.getDatasAfter) this.getDatasAfter()
    this.loading.table = false
  }).catch(() => {
    this.loading.table = false
  })
}

/**
 * 清空查询条件
 */
function clearAndInitQuery() {
  this.query = _.cloneDeep(this.queryEmpty)
}

/**
 * 查询
 */
function handleQuery() {
  this.page.current = 1
  // 钩子，查询之前数据处理
  if (this.queryBefore) {
    if (!this.queryBefore())
      return false
  }
  this.queryReal = _.cloneDeep(this.query)
  this.getDatas()
}

/**
 * 查询条件中的日期时间选择器清空事件
 * @param value
 */
function handleChangeQueryDate(value) {
  if (value === null) this.handleQuery()
}

/**
 * 排序
 */
function handleSort(data) {
  if (this.sort !== null) {
    this.sort.prop = data.prop
    this.sort.order = data.order
  }
  this.getDatas()
}

// =========================================添加=========================================
/**
 * 初始化添加页面
 */
async function initCreate() {
  this.visible = true
  // 钩子，获取编辑数据之前执行。无返回值
  if (this.initCreateBefore) await this.initCreateBefore()
}

/**
 * 打开添加窗口
 */
function handleCreate() {
  this.$refs.dialogCreate.initCreate().then(() => {
  })
}

/**
 * 提交添加数据
 */
function submitCreate() {
  console.log('submitCreate')
  this.$refs.form.validate((valid) => {
    if (!valid) return false
    this.loading = true
    // 钩子，添加提交前执行。返回true，执行删除；返回false，退出
    if (this.submitCreateBefore) {
      if (!this.submitCreateBefore()) {
        this.loading = false
        return false
      }
    }
    // 拷贝数据提交
    const data = _.pick(this.model, Object.keys(this.createReal))
    this.curApi.create(data).then(() => {
      // 钩子，添加提交后执行。无返回值
      this.$refs['form'].resetFields()
      this.visible = false
      if (this.submitCreateAfter) this.submitCreateAfter()
      // 重新加载列表页
      this.$parent.getDatas()
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  })
}

/**
 * 提交添加数据带返回id
 */
function submitCreateWithNewID() {
  console.log('submitCreateWithNewID')
  this.$refs.form.validate((valid) => {
    if (!valid) return false
    this.loading = true
    // 钩子，添加提交前执行。返回true，执行删除；返回false，退出
    if (this.submitCreateBefore) {
      if (!this.submitCreateBefore()) {
        this.loading = false
        return false
      }
    }
    // 拷贝数据提交
    const data = _.pick(this.model, Object.keys(this.createReal))
    this.curApi.create(data).then((response) => {
      // that.curModels.id = response.data
      this.$refs['form'].resetFields()
      this.visible = false
      console.log(response)
      // 钩子，添加提交后执行。无返回值
      if (this.submitCreateAfter) this.submitCreateAfter(response.data)
      // 重新加载列表页
      this.$parent.getDatas()
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  })
}

// =========================================编辑=========================================
/**
 * 初始化编辑页面
 */
async function initUpdate(row) {
  this.rowData = _.clone(row)
  const that = this
  this.visible = true
  this.loading = true
  // 钩子，获取编辑数据之前执行。无返回值
  if (this.initUpdateBefore) await this.initUpdateBefore(row)
  await getUpdateInitData()
  this.$nextTick(() => {
    this.$refs.form.clearValidate()
  })

  /**
   * 获取编辑页面初始化数据
   */
  function getUpdateInitData() {
    return that.curApi.get(row.id).then(response => {
      that.model = { ...that.model, ...response.data }
      // 钩子，获取编辑数据之后执行。无返回值
      if (that.initUpdateAfter) {
        that.initUpdateAfter(row, response.data).then(() => {
          that.loading = false
        })
      } else {
        that.loading = false
      }
    }).catch(() => {
      that.loading = false
    })
  }
}

/**
 * 打开更新窗口
 */
function handleUpdate(row) {
  this.$refs.dialogUpdate.initUpdate(row).then(() => {
  })
}

/**
 * 提交更新数据
 */
function submitUpdate() {
  this.$refs.form.validate((valid) => {
    if (!valid) return false
    this.loading = true
    // 钩子，编辑提交前执行。返回true，执行删除；返回false，退出
    if (this.submitUpdateBefore) {
      if (!this.submitUpdateBefore()) {
        this.loading = false
        return false
      }
    }
    // 拷贝数据提交
    const data = _.pick(this.model, Object.keys(this.updateReal))
    this.curApi.update(data).then(() => {
      this.$refs['form'].resetFields()
      this.visible = false
      // 钩子，编辑提交后执行。无返回值
      if (this.submitUpdateAfter) this.submitUpdateAfter()
      // 重新加载列表页
      this.$parent.getDatas()
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  })
}

function resetUpdate() {
  this.initUpdate(this.rowData).then(() => { })
}

// =========================================删除=========================================

/**
 * 删除按钮点击
 */
function handleDelete(row) {
  this.deleteData([row.id])
}

/**
 * 批量删除按钮点击
 */
function handleDeletes() {
  if (this.$refs.listTable.selection.length === 0) {
    this.$message({ type: 'warning', message: '请在下面表格的左侧勾选需要删除的数据', duration: 4000 })
    return false
  }
  const ids = []
  for (const item of this.$refs.listTable.selection) {
    ids.push(item.id)
  }

  this.deleteData(ids)
}

function deleteData(ids) {
  this.$confirm('数据删除后，不可恢复, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 钩子，删除前执行。返回true，执行删除；返回false，退出
    if (this.deleteSubmitBefore) {
      if (!this.delegeSubmitBefore()) return
    }
    this.loading.deletes = true
    this.curApi.del(ids).then(response => {
      // 钩子，删除后执行。无返回值
      if (this.deleteSubmitAfter) this.delegeSubmitAfter()
      // 重新获取数据
      this.getDatas()
      this.loading.deletes = false
    }).catch(() => {
      this.loading.deletes = false
    })
  })
}

// =========================================详情=========================================
/**
 * 初始化详情页面
 */
async function initDetail(row) {
  const that = this
  this.visible = true
  this.loading = true
  // 钩子，获取详情数据之前执行。无返回值
  if (this.initDetailBefore) await this.initDetailBefore(row)
  await getDetailInitData()

  function getDetailInitData() {
    return that.curApi.get(row.id).then(response => {
      that.model = response.data
      // 钩子，获取编辑数据之后执行。无返回值
      if (that.initDetailAfter) {
        that.initDetailAfter(row, response.data).then(() => {
          that.loading = false
        })
      } else {
        that.loading = false
      }
    }).catch(() => {
      that.loading = false
    })
  }
}

/**
 * 打开详情窗口
 */
function handleDetail(row) {
  this.$refs.dialogDetail.initDetail(row).then(() => { })
}

// =========================================导出=========================================

/**
 * 导出
 */
function handleExport() {
  this.loading.export = true
  this.curApi.exportExcel(this.queryReal, this.page, this.sort).then(response => {
    const blob = new Blob([response])
    const fileName = this.exportFileName + '.xlsx'
    const a = document.createElement('a')
    a.onload = () => {
      URL.revokeObjectURL(a.href)
    }
    a.download = fileName
    a.style.display = 'none'
    a.href = URL.createObjectURL(blob)
    a.click()
    this.loading.export = false
  }).catch(() => {
    this.loading.export = false
  })
}

/**
 * 导出
 */
function handleExportCsv() {
  const that = this
  if (this.page.total > 20000) {
    this.$confirm('数据量较大，请进行适当检索，缩小范围之后再导出，是否仍然执行导出操作?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      doExport()
    }).catch(() => {
      return false
    })
  } else {
    doExport()
  }

  function doExport() {
    that.loading.export = true
    that.curApi.exportCsv(_.cloneDeep(that.query), that.page, that.sort).then(response => {
      const blob = new Blob([`\ufeff${response}`], { type: 'text/plain;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)

      const fileName = that.exportFileName + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + '.csv'
      const a = document.createElement('a')
      a.onload = () => {
        URL.revokeObjectURL(url)
      }
      a.download = fileName
      a.style.display = 'none'
      a.href = url
      a.click()
      that.loading.export = false
    }).catch(() => {
      that.loading.export = false
    })
  }
}

export default {
  getDatas,
  clearAndInitQuery,
  handleQuery,
  handleChangeQueryDate,
  handleSort,
  initCreate,
  handleCreate,
  submitCreate,
  initUpdate,
  handleUpdate,
  submitUpdate,
  resetUpdate,
  handleDelete,
  handleDeletes,
  deleteData,
  handleDetail,
  initDetail,
  handleExport,
  handleExportCsv,
  submitCreateWithNewID
}
