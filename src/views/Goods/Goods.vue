<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="searchText" @keyup.enter.native="loadGoodsList">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="6" style="width:95px">
        <el-button type="primary" icon="el-icon-search" style="background-color:#ccc;border-color:#ccc">搜索</el-button>
      </el-col>
      <el-col :span="6" style="width:110px">
        <el-button type="success" @click="$router.push('/addGoods')">添加商品</el-button>
      </el-col>
    </el-row>
    <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:10px">
      <el-table-column
        type="index"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
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
    <el-pagination
    background
    style="margin-top:10px"
    layout="prev, pager, next"
    :total="100"
    :page-size="5"
    @current-change="loadGoodsList">
    </el-pagination>
  </div>
</template>

<script>
import { getAllGoods } from '../../api/goods.js'
import dayjs from '../../../node_modules/dayjs/dayjs.min.js'
export default {
  name: 'Goods',
  created () {
    this.loadGoodsList()
  },
  components: {
  },
  data () {
    return {
      dialogFormVisible: false,
      tableData: [],
      searchText: ''
    }
  },
  methods: {
    async loadGoodsList (page = 1) {
      const { data: { goods }, meta: { status } } = await getAllGoods({ pagenum: page, pagesize: 5, query: this.searchText })
      if (status === 200) {
        goods.forEach(item => {
          item.add_time = this.setTime(item.add_time)
        })
        this.tableData = goods
      }
    },
    setTime (item) {
      return dayjs(item).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>
</style>
