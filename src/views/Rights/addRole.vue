<template>
  <div>
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="formData" ref="addRoleEl">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="formData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="formData.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { handleAddRole } from '../../api/role.js'
export default {
  name: 'addRole',
  props: ['a'],
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '180px',
      formData: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    async handleAddRole () {
      const { meta: { status } } = await handleAddRole(this.formData)
      if (status === 201) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$refs.addRoleEl.resetFields()
        this.dialogFormVisible = false
        this.$emit('addRole_success')
      }
    }
  }
}
</script>

<style scoped>
</style>
