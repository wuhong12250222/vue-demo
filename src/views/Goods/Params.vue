<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-cascader
          expand-trigger="hover"
          :options="options"
          :props="{
            value: 'cat_id',
            label: 'cat_name'
          }"
          v-model="selectedOptions"
          >
          </el-cascader>
        </div>
      </el-col>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="动态参数">
        <el-button type="success" style="margin-bottom:15px">添加参数名称</el-button>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
           <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="18">
                  <el-tag
                  v-for="(tag,index) in scope.row.attr_vals.split(',')"
                  :key="index"
                  closable
                  type=""
                  style="margin:5px 5px">
                    {{tag}}
                  </el-tag>
                  <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm(scope.row)"
                  style="width:150px">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                </el-col>
              </el-row>
            </template>
            </el-table-column>
          <el-table-column
          type="index"
          width="60">
          </el-table-column>
          <el-table-column
          prop="attr_name"
          label="商品参数"
          width="400">
          </el-table-column>
          <el-table-column
          label="操作"
          width="400">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性">
        <el-button type="success" style="margin-bottom:15px">添加静态属性</el-button>
        <el-table
        :data="tableData2"
        border
        style="width: 100%">
          <el-table-column
          type="index"
          width="60">
          </el-table-column>
          <el-table-column
          prop="attr_name"
          label="属性名称"
          width="400">
          </el-table-column>
          <el-table-column
          prop="attr_vals"
          label="属性值"
          width="400">
          </el-table-column>
          <el-table-column
          label="操作"
          width="400">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getcategories, getcategoriesArrs } from '../../api/goods.js'
export default {
  name: 'Params',
  created () {
    this.getCategories()
    this.getCategoriesArrs()
  },
  watch: {
    selectedOptions: {
      handler (newVal, oldVal) {
        this.getCategoriesArrs()
      },
      deep: true
    }
  },
  data () {
    return {
      options: [],
      selectedOptions: [1, 3, 6],
      tableData: [],
      tableData2: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    async getCategories () {
      const { data } = await getcategories()
      this.options = data
    },
    async getCategoriesArrs () {
      const attrid = this.selectedOptions[this.selectedOptions.length - 1]
      const { data } = await getcategoriesArrs(attrid)
      const { data: data2 } = await getcategoriesArrs(attrid, 'only')
      this.tableData = data
      this.tableData2 = data2
      console.log(this.tableData2)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm (item) {
      let inputValue = this.inputValue
      if (inputValue) {
        item.attr_vals = item.attr_vals.split(',').push(inputValue).join(',')
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleEdit () {},
    handleDelete () {}
  }
}
</script>

<style scoped>
</style>
