<template>
  <div ref="editor" style="text-align:left"></div>
</template>

<script>
import E from 'wangeditor'
import { upload } from '../../api/goods.js'
export default {
  name: 'RichEdit',
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.customUploadImg = async (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      // 上传代码返回结果之后，将图片插入到编辑器中
      console.log(files)
      const { data } = await upload(files[0])
      insert(`http://localhost:8888/${data.tmp_path}`)
    }
    editor.customConfig.onchange = (html) => {
      this.$emit('update:content', html)
    }
    editor.create()
  },
  data () {
    return {
      editContent: ''
    }
  }
}
</script>

<style scoped>
</style>
