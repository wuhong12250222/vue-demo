<template>
  <div>
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
      <el-form :model="formData" :rules="rules" ref="editRoleEl">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="formData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
          <el-input v-model="formData.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getEditRole, submitEditRole } from '../../api/role.js'
export default {
  name: 'addRole',
  created () {
    this.showEditRole()
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '180px',
      formData: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async showEditRole (roleId) {
      const { data, meta: { status } } = await getEditRole(roleId)
      if (status === 200) {
        this.dialogFormVisible = true
        this.formData = data
      }
    },
    handleEditRole () {
      this.$refs.editRoleEl.validate(async valid => {
        if (valid) {
          const { meta: { status } } = await submitEditRole(this.formData)
          if (status === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$emit('edit-success')
            this.dialogFormVisible = false
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
