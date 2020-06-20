<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="15">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="goodsValue" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="14">
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table border stripe :data="goodsListData">
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="商品名称" align="center" prop="name"></el-table-column>
        <el-table-column label="商品价格(元)" align="center" prop="price"></el-table-column>
        <el-table-column label="商品重量(克)" align="center" prop="weight"></el-table-column>
        <el-table-column label="创建时间" align="center" prop="creatTime"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // table表格数据
      goodsListData: [
        {
          name: '苹果',
          price: '10000',
          weight: 999,
          creatTime: '2019-03-06'
        },
        {
          name: '华为',
          price: '20000',
          weight: 9991,
          creatTime: '2019-03-07'
        },
        {
          name: '小米',
          price: '30000',
          weight: 9995,
          creatTime: '2019-03-08'
        },
        {
          name: '锤子',
          price: '40000',
          weight: 9995,
          creatTime: '2019-03-09'
        },
        {
          name: 'OPPO',
          price: '50000',
          weight: 9993,
          creatTime: '2019-03-10'
        },
        {
          name: 'vivo',
          price: '60000',
          weight: 9991,
          creatTime: '2019-03-11'
        },
        {
          name: '三星',
          price: '10000',
          weight: 9992,
          creatTime: '2019-03-12'
        }
      ],
      goodsValue: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped>

.el-card {
  margin-top: 15px;
}

.el-table {
  margin-top: 10px;
}
</style>
