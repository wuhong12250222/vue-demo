<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="searchText" @keyup.enter.native="loadList(1)">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="6" style="width:95px">
        <el-button type="primary" icon="el-icon-search" style="background-color:#ccc;border-color:#ccc">搜索</el-button>
      </el-col>
      <el-col :span="6" style="width:110px">
        <el-button type="success" @click="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
    :data="tableFormData"
    border
    style="width: 100%;border:1px solid oldlace;margin-top:5px">
      <el-table-column
        prop="id"
        label="#"
        width="60"
        height="10px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        width="90"
        label="用户状态"
        align="center"
        >
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="stateChange(scope.row)">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="$refs.intoEditEl.showEdit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="handleDelete(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="$refs.intoRoleEl.showRole(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户添加" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addFormEl">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model.number="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <intoEdit ref="intoEditEl" @update-success="loadList"></intoEdit>
    <intoRole ref="intoRoleEl"></intoRole>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="100"
    style="margin-top:5px"
    :page-size="5"
    @current-change="loadList"
    :current-page.sync="page">
    </el-pagination>
  </div>
</template>

<script>
import { userlist, adduser, statechange, handledelete } from '../../api/user.js'
import intoEdit from './intoEdit'
import intoRole from './editRole'
export default {
  name: 'UserList',
  components: {
    intoEdit,
    intoRole
  },
  async created () {
    this.loadList()
  },
  data () {
    return {
      tableFormData: [],
      value1: true,
      value2: true,
      searchText: '',
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'change' }
        ]
      },
      page: 0
    }
  },
  methods: {
    async loadList (page = 1) {
      const { data: { data: { users } } } = await userlist({ pagenum: page, pagesize: 5, query: this.searchText })
      this.tableFormData = users
    },
    addUser () {
      this.$refs.addFormEl.validate(async valid => {
        if (valid) {
          const { meta: { status } } = await adduser(this.addForm)
          if (status === 201) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.$refs.addFormEl.resetFields()
            this.loadList()
          }
        } else {
          return false
        }
      })
    },
    async stateChange (item) {
      const { meta: { status }, data } = await statechange(item)
      if (status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`
        })
      }
    },
    handleDelete (item) {
      this.$confirm('确定删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta: { status } } = await handledelete(item.id)
        if (status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadList(this.page)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
