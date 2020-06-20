<template>
  <div>
    <!-- 页头面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- main,卡片区域 -->
    <el-card>
      <el-table :data="data" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="账号" prop="name" align="center"></el-table-column>
        <el-table-column label="用户名" prop="user" align="center"></el-table-column>
        <el-table-column label="是否可以操作" align="center">
          <!-- 自定义插槽接收数据，此时只有一个插槽，可以直接写v-slot ,但是多个时必须指定，v-slot:onetem。详情见官网 作用域插槽 -->
          <template v-slot="scop">
            <el-switch
              v-model="scop.row.auth"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
            <el-tooltip effect="dark" content="添加用户" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" @click="setUser"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增用户弹出框 -->
    <el-dialog
      title="新增用户"
      width="50%"
      :visible="boxShow"
      :show-close="false"
      center>
      <!-- 弹出框新增用户表单， 此处要规定label-width不然会独占一行，将输入框挤下另一行 -->
      <el-form
        label-position="right"
        label-width="80px"
        :rules="rules"
        :model="formData"
        ref="formData"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="formData.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2">
          <el-input v-model="formData.pass2" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canceBox">取 消</el-button>
        <el-button type="primary" @click="submitButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义表单验证规则
    // 检验二次密码的规则
    var pass2Cheack = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    // 检验电话号码的规则
    var cheackPhone = (rule, value, callback) => {
      if (!(/^1[3456789]\d{9}$/.test(value))) { // 不符合正则，就抛出错误
        callback(new Error('请输入正确的电话号码'))
      } else {
        callback()
      }
    }
    return {
      // 用户列表表格数据
      data: [
        {
          name: 'admin',
          user: '管理员',
          auth: false,
          leve: 1
        },
        {
          name: 'admin1',
          user: '超级管理员',
          auth: true,
          leve: 2
        },
        {
          name: 'admin2',
          user: '超人管理员',
          auth: false,
          leve: 3
        },
        {
          name: 'admin3',
          user: '超超级管理员',
          auth: false,
          leve: 1
        },
        {
          name: 'admin4',
          user: '中等管理员',
          auth: true,
          leve: 2
        },
        {
          name: 'admin5',
          user: '上等管理员',
          auth: true,
          leve: 2
        }
      ],
      // 添加用户弹框的显示
      boxShow: false,
      // 添加用户表单数据
      formData: {
        name: '',
        pass: '',
        pass2: '',
        email: '',
        phone: ''
      },
      // 添加用户表单验证规则
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }, // trigger 定义什么时候触发验证  required 定义前面显示的
          { min: 3, max: 10, message: '用户名在3到10个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 8, message: '密码长度在6-8位', trigger: 'blur' }
        ],
        pass2: [
          { validator: pass2Cheack, trigger: 'blur' } // validator 定义自定义规则，对应在dada当中定义的对象规则
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { validator: cheackPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 弹出框打开
    setUser () {
      this.boxShow = true
    },
    // 关闭弹出框
    closeBox () {
      this.boxShow = false
    },
    // 点取消按钮时
    canceBox () {
      this.closeBox() // 关闭弹窗
      // 重置表单 ，this.$refs.formData表示获取这个表单对象，这个对象上包含了许多方法和数据，resetFields()就是重置表单的一个方法
      this.$refs.formData.resetFields()
    },
    // 确定按钮提交表单
    submitButton () {
      // 获取表单对象方法，如果验证不通过 返回false ，通过则返回true, 这里的验证时整个表单的，也有单独一个表单项的方法
      this.$refs.formData.validate((value) => {
        if (value) {
          this.$message({
            message: '用户添加成功',
            type: 'success',
            duration: 5000
          })
          console.log(this.formData)
          // 提交成功后，重置表单
          this.closeBox()
        } else {
          this.$message({
            message: '请正确填写用户信息',
            type: 'error',
            duration: 5000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}
</style>
