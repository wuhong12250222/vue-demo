<template>
  <div>
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" ref="addFormEl">
        <el-form-item label="当前的用户" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addForm.username" autocomplete="off" disabled style="border:none"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="addForm.rid" placeholder="请选择">
            <el-option :value="-1" label="请选择"></el-option>
            <el-option :value="0" label="超级管理员"></el-option>
            <el-option v-for="item in roles" :label="item.roleName" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { showrole, getInfo, handlerole } from '../../api/user.js'
export default {
  name: 'editRole',
  data () {
    return {
      formLabelWidth: '120px',
      addForm: {},
      dialogFormVisible: false,
      rules: {},
      roles: []
    }
  },
  methods: {
    async showRole (item) {
      const { data: info } = await getInfo(item.id)
      this.addForm = info
      const { data } = await showrole()
      this.roles = data
      this.dialogFormVisible = true
    },
    async handleRole () {
      const { id, rid } = this.addForm
      const { meta: { status } } = await handlerole(id, rid)
      if (status === 200) {
        this.$message({
          type: 'success',
          message: '分配角色成功'
        })
        this.dialogFormVisible = false
      }
    }
  }
}
</script>

<style scoped>
</style>
