<template>
  <div>
      <el-row style="margin:30px 0px">
        <el-col :span="24"><div class="grid-content bg-purple-dark"><h3>添加商品信息</h3></div></el-col>
      </el-row>
      <el-steps :active="active" finish-status="success" style="margin-top:20px;margin-left:45px">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
        <el-step title="步骤 5"></el-step>
      </el-steps>
      <el-tabs tab-position="left"
      style="height: 200px;margin-top:30px;overflow:unset;margin-right:30px"
      v-model="activeName"
      @tab-click="TagesChange">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form" :model="basicForm" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="basicForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model.number="basicForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model.number="basicForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model.number="basicForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="basicForm.goods_cat"
              :props="selfDefine"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="是否促销">
              <el-radio-group v-model="basicForm.is_promote">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.prevent="tagesPosition('second',2)">下一步</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="second">
          <el-row v-for="item1 in categoriesArrs" :key="item1.attr_id">
            <el-col :span="4">{{item1.attr_name}}</el-col>
            <el-col :span="18">
              <el-checkbox-group size="small" v-model="item1.select_val">
                <el-checkbox :label="item2" border
                v-for="item2 in item1.attr_vals.split(',')" :key="item2.attr_id"
                style="margin-bottom:10px">
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-form>
            <el-form-item style="margin:20px">
                <el-button type="primary" @click.prevent="tagesPosition('third',3)">下一步</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="third">
          <el-form ref="formParamsEl" :model="formParams" label-width="150px">
            <el-form-item :label="item.attr_name" v-for="item in categoriesParams" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
            <el-form-item style="margin:20px">
              <el-button type="primary" @click="tagesPosition('four', 4)">下一步</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="four">
          <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadHeaders"
          :on-success="handleUploadSuccess"
          :file-list="fileList"
          list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-form>
            <el-form-item style="margin-top:150px">
              <el-button type="primary" @click="tagesPosition('five', 5)">下一步</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="five">
          <RichEdit :content.sync="basicForm.goods_introduce"></RichEdit>
          <el-form>
            <el-form-item style="margin-top:150px">
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { getcategories, getcategoriesArrs, handlesubmit } from '../../api/goods.js'
import RichEdit from '../RichEdit/RichEdit.vue'
export default {
  name: 'addGoods',
  created () {
    this.getCategories()
  },
  components: {
    RichEdit
  },
  data () {
    return {
      active: 1,
      basicForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        is_promote: '',
        goods_cat: [],
        goods_introduce: ''
      },
      options: [],
      categoriesArrs: [],
      categoriesParams: [],
      selfDefine: {
        label: 'cat_name',
        value: 'cat_id'
      },
      activeName: 'first',
      formParams: {},
      uploadHeaders: {
        Authorization: window.localStorage.getItem('token')
      },
      fileList: []
    }
  },
  methods: {
    async handleSubmit () {
      const goodscategoriesArrs = this.categoriesArrs.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.select_val.join(',')
        }
      }).filter(item => item.attr_value.length > 0)
      const goodscategoriesParams = this.categoriesParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })
      const pics = this.fileList.map(item => {
        const a = document.createElement('a')
        a.href = item.url
        return {
          pic: a.pathname
        }
      })
      const arrs = [...goodscategoriesArrs, goodscategoriesParams]
      const { meta: { status } } = await handlesubmit(this.basicForm, arrs, pics)
      if (status === 201) {
        this.$message({
          type: 'success',
          message: '商品添加成功'
        })
      }
    },
    async getCategories () {
      const { data } = await getcategories()
      this.options = data
    },
    tagesPosition (num1, num2) {
      if (this.basicForm.goods_cat.length === 0) {
        return this.$message({
          type: 'error',
          message: '请选择商品分类'
        })
      }
      if (num1 === 'second') {
        this.getCategoriesArrs()
      } else if (num1 === 'third') {
        this.getCategoriesParams()
      }
      this.activeName = num1
      this.active = num2
    },
    TagesChange (currentTags) {
      if (currentTags.label === '商品参数') {
        if (this.basicForm.goods_cat.length === 0) {
          this.activeName = 'first'
          return this.$message({
            type: 'error',
            message: '请选择商品分类'
          })
        }
        this.getCategoriesArrs()
        this.active = 2
      } else if (currentTags.label === '商品属性') {
        if (this.basicForm.goods_cat.length === 0) {
          this.activeName = 'first'
          return this.$message({
            type: 'error',
            message: '请选择商品分类'
          })
        }
        this.getCategoriesParams()
        this.active = 3
      }
    },
    async getCategoriesArrs () {
      const attrid = this.basicForm.goods_cat[this.basicForm.goods_cat.length - 1]
      const { data } = await getcategoriesArrs(attrid)
      data.forEach(item => {
        item.select_val = item.attr_vals.split(',')
      })
      this.categoriesArrs = data
    },
    async getCategoriesParams () {
      const attrid = this.basicForm.goods_cat[this.basicForm.goods_cat.length - 1]
      const { data } = await getcategoriesArrs(attrid, 'only')
      this.categoriesParams = data
    },
    handleUploadSuccess (response, file, fileList) {
      this.fileList.push({
        url: `http://localhost:8888/${response.data.tmp_path}`
      })
    }
  }
}
</script>

<style scoped>
</style>
