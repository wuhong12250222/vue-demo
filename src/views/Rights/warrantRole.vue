<template>
  <div>
    <el-dialog title="授权角色" :visible.sync="dialogFormVisible">
      <el-tree
      :data="treeData"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultChecked"
      :props="defaultProps" ref="treeEl">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeysArr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRightList } from '../../api/rights.js'
import { submitRoleRights } from '../../api/role.js'
export default {
  name: 'warrantRole',
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      dialogFormVisible: false,
      defaultChecked: [],
      roleId: null
    }
  },
  methods: {
    async showwarrantRole (item) {
      const { data } = await getRightList('tree')
      this.treeData = data
      let tmp = []
      item.children.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            tmp.push(third.id)
          })
        })
      })
      this.defaultChecked = tmp
      this.dialogFormVisible = true
      this.roleId = item.id
    },
    async getCheckedKeysArr () {
      let temp = []
      const tree = this.$refs.treeEl
      temp = [...tree.getCheckedKeys(), ...(tree.getHalfCheckedKeys())].join(',')
      const { meta: { status } } = await submitRoleRights(this.roleId, temp)
      if (status === 200) {
        this.$message({
          type: 'success',
          message: '角色授权成功'
        })
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
</style>
