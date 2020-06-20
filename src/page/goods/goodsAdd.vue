<template>
  <div>
    <!-- 页头面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 顶部提示信息 -->
      <el-alert title="添加商品信息" type="info" show-icon center></el-alert>

      <!-- 步骤条 -->
      <el-steps :active="activeIndex - 0" finish-status="success" align-center>
        <!-- 减 0 是为了将字符串转化为数字，因为祥和里绑定的是数字，而选项卡哪里绑定的字符串 -->
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 因为公用的是一个表单的数据，所以直接在这外层用 el-form包裹 ，不能放在tabs中-->
      <el-form ref="form" :model="formData" :rules="goodsAddRules">
        <!-- 选项卡菜单部分 -->
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="before_leave">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="formData.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="formData.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="formData.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_count">
              <el-input v-model="formData.goods_count" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 绑定控制显示参数
      activeIndex: '0',
      // 表单数据
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: null,
        goods_count: null
      },
      // 表单校验规则
      goodsAddRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_count: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      formRuleTF: false
    }
  },
  methods: {
    // 切换标签页之前的事件
    before_leave (newActiveName, oldActiveName) {
      let _this = this
      // 验证表单信息是否通过
      _this.$refs.form.validate(value => {
        if (!value) {
          // 此时代表验证不通过
          _this.formRuleTF = false
        } else {
          _this.formRuleTF = true
        }
      })
      // 当想从第一步切换到下一步时,如果验证不通过，则发送错误信息，返回false阻止标签页切换
      if (oldActiveName === '0' && !_this.formRuleTF === true) {
        this.$message({
          message: '请将基本信息填写完整',
          type: 'error',
          duration: 5000
        })
        return false
      } else {
        console.log('1111')
      }
    }
  }
}
</script>

<style>
.el-card {
  margin: 15px 0
}

.el-steps {
  margin: 15px 0
}
</style>
