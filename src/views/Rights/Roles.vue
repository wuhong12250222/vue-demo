<template>
  <div>
    <el-button type="success" style="margin-bottom:10px" @click="$refs.addRoleEl.dialogFormVisible = true">添加用户</el-button>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.rights" :key="first.id">
            <el-col :span="4" style="display:flex;align-item:center;margin-bottom:5px">
              <el-tag
              closable
              @close="handleTagDeleteRIght(scope.row, first)"
              >
                {{ first.authName }}
              </el-tag>
              <i class="el-icon-arrow-right" style="font-size:20px;margin-left:35px;font-weight:900;margin-top:5px"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="4" style="margin-bottom:15px;display:flex;align-item:center">
                  <el-tag
                  closable
                  type="success"
                  @close="handleTagDeleteRIght(scope.row, second)">
                    {{ second.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right" style="font-size:20px;margin-left:20px;font-weight:900;margin-top:5px"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                  closable
                  type="warning"
                  v-for="third in second.children" :key="third.id"
                  style="margin-right:5px;margin-bottom:5px"
                  @close="handleTagDeleteRIght(scope.row, third)">
                    {{ third.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="300">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.editRoleEl.showEditRole(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="$refs.warrantRoleEL.showwarrantRole(scope.row)">角色授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addRole ref="addRoleEl" @addRole_success="getRoleList"></addRole>
    <editRole ref="editRoleEl" @edit-success="getRoleList"></editRole>
    <warrantRole ref="warrantRoleEL"></warrantRole>
  </div>
</template>

<script>
import { showrole } from '../../api/user.js'
import { handledelete, deleteRoleRight } from '../../api/role.js'
import addRole from './addRole.vue'
import editRole from './editRole.vue'
import warrantRole from './warrantRole.vue'

export default {
  name: 'Role',
  components: {
    addRole,
    editRole,
    warrantRole
  },
  created () {
    this.getRoleList()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getRoleList () {
      const { data, meta: { status } } = await showrole()
      if (status === 200) {
        console.log(data)
        data.forEach(item => {
          item.rights = item.children
          delete item.children
        })
        this.tableData = data
      }
    },
    handleDelete (roleId) {
      this.$confirm('确定删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta: { status } } = await handledelete(roleId)
        if (status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRoleList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleTagDeleteRIght (role, third) {
      const { data, meta: { status } } = await deleteRoleRight(role, third)
      if (status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        role.children = data
      }
    }
  }
}
</script>

<style scoped>
</style>
