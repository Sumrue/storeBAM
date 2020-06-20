<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-button type="primary" @click="sortBox">
        添加分类
      </el-button>

      <!-- 表格区域 -->
      <el-table
        :data="goodsSortData"
        row-key="sortName"
        border
        stripe
        :tree-props="{children: 'children'}"
      >
        <el-table-column label="分类名称" prop="sortName" align="center"></el-table-column>
        <el-table-column label="是否有效" align="center">
          <template v-slot="scope">
            <i class="el-icon-error" v-if="scope.row.isVlaid"></i>
            <i class="el-icon-success" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === '1'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '2'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="sortBoxShow"
      width="50%"
      >
      <!-- 添加级联选择器 -->
      <!-- 需要注意的是，element级联选择器label 和value 都是有默认的，自己数据匹配时需要在prop中国设置 -->
      <el-cascader
        v-model="cascaderValue"
        :options="goodsSortData"
        :props="{ expandTrigger: 'hover', label: 'sortName', value: 'sortName' }"
        >
      </el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortBoxShow = false">取 消</el-button>
        <el-button type="primary" @click="sortBoxShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 商品分类数据
      goodsSortData: [
        {
          keyId: '1a',
          sortName: '家电',
          isValid: true,
          level: '1',
          children: [
            {
              sortName: '电视',
              isValid: true,
              level: '2',
              keyId: '11a',
              children: [
                {
                  sortName: '彩虹电视',
                  isValid: true,
                  keyId: '111a',
                  level: '3'
                },
                {
                  sortName: '星星电视',
                  isValid: true,
                  keyId: '112a',
                  level: '3'
                },
                {
                  sortName: '华为电视',
                  isValid: true,
                  keyId: '113a',
                  level: '3'
                },
                {
                  sortName: '小米电视',
                  isValid: true,
                  keyId: '114a',
                  level: '3'
                },
                {
                  sortName: '锤子电视',
                  isValid: true,
                  keyId: '115a',
                  level: '3'
                }
              ]
            },
            {
              sortName: '冰箱',
              isValid: true,
              level: '2',
              keyId: '12',
              children: [
                {
                  sortName: '彩虹冰箱',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '星星冰箱',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '华为冰箱',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '小米冰箱',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '锤子冰箱',
                  isValid: true,
                  level: '3'
                }
              ]
            },
            {
              sortName: '洗衣机',
              isValid: true,
              level: '2',
              keyId: '13',
              children: [
                {
                  sortName: '彩虹洗衣机',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '星星洗衣机',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '华为洗衣机',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '小米洗衣机',
                  isValid: true,
                  level: '3'
                },
                {
                  sortName: '锤子洗衣机',
                  isValid: true,
                  level: '3'
                }
              ]
            }
          ]
        },
        {
          keyId: '2',
          sortName: '手机',
          isValid: true,
          level: '1'
        },
        {
          keyId: '3',
          sortName: '家纺',
          isValid: true,
          level: '1'
        },
        {
          keyId: '4',
          sortName: '鞋帽',
          isValid: true,
          level: '1'
        },
        {
          keyId: '5',
          sortName: '小零食',
          isValid: true,
          level: '1'
        }
      ],
      // 控制添加分类框的显示与隐藏
      sortBoxShow: false,
      // 级联选择器绑定值
      cascaderValue: []
    }
  },
  methods: {
    // 添加分类框的弹出
    sortBox () {
      this.sortBoxShow = true
    }
  }
}
</script>

<style>
.el-card {
  margin-top: 15px;
}

.el-icon-error, .el-icon-success {
  color: #67C23A;
}

.el-table {
  margin-top: 10px;
}
</style>
