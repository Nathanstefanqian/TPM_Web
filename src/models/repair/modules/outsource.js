import _ from 'lodash'
const base = {
    /**
     * 
     */
    id: null,

    /**
     * 报修单id
     */
    repairApplyId: null,
    /**
   * 选择工作流id
   */
    flowId: null,
    /**
     * 委外原因
     */
    reason: null,

    /**
     * 维修人员姓名
     */
    outDept: null,

    /**
     * 工期要求
     */
    estimatedTime: null,

    /**
     * 预计费用
     */
    estimatedFee: null,

    /**
     * 签核状态1--3  9结案
     */
    status: null,

    /**
     * 实际时间
     */
    actualTime: null,

    /**
     * 实际费用
     */
    actualFee: null,

    /**
     * 实际维修内容
     */
    actualContent: null,
}
const queryEmpty = {
    repairApplyId: null,
    outDept: null,
}

const query = _.cloneDeep(queryEmpty)
// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = {
    repairApplyId: null,
    flowId: null,
    reason: null,
    outDept: null,
    estimatedTime: null,
    status: null,
    actualTime: null,
    actualFee: null,
    actualContent: null,
}
const update = _.cloneDeep(base)
const updateReal = {
    id: null,
    repairApplyId: null,
    flowId: null,
    reason: null,
    outDept: null,
    estimatedTime: null,
    status: null,
    actualTime: null,
    actualFee: null,
    actualContent: null,
}
const detail = _.cloneDeep(base)
export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }