<template>
  <div>
    <el-table
    :data="tableRights"
    border
    style="width: 100%">
      <el-table-column
        type="index"
        width="80">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        label="层级"
        width="180">
        <template slot-scope="scope">
          {{ ['一级', '二级', '三级'][scope.row.level] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRightList } from '../../api/rights.js'
export default {
  name: 'Rights',
  created () {
    this.loadRights()
  },
  data () {
    return {
      tableRights: []
    }
  },
  methods: {
    async loadRights () {
      const { data, meta: { status } } = await getRightList('list')
      if (status === 200) {
        this.tableRights = data
      }
    }
  }
}
</script>

<style scoped>
</style>
