<template>
  <div>
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addFormEl">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { showedit, submitEdit } from '../../api/user.js'
export default {
  name: 'intoEdit',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      addForm: {},
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async showEdit (item) {
      const { meta: { status }, data } = await showedit(item.id)
      if (status === 200) {
        this.addForm = data
        this.dialogFormVisible = true
      }
    },
    updateEdit () {
      this.$refs.addFormEl.validate(async (valid) => {
        if (valid) {
          const { meta: { status } } = await submitEdit(this.addForm)
          if (status === 200) {
            this.$message({
              type: 'success',
              message: '用户数据更新成功'
            })
            this.dialogFormVisible = false
            this.$emit('update-success')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
