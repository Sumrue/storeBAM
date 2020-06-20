<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 级联选择器 -->
      <!-- 需要注意的是，element级联选择器label 和value 都是有默认的，自己数据匹配时需要在prop中国设置 -->
      <el-cascader
        v-model="sortValue"
        :options="goodsSortData"
        :props="{ expandTrigger: 'hover', label: 'sortName', value: 'sortName' }"
        @change="checkCasc"
      >
      </el-cascader>

      <!-- 选项卡区域 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="动态参数" name="first" :disabled="tabsShow">{{sortValue[2]}}</el-tab-pane>
        <el-tab-pane label="静态参数" name="second" :disabled="tabsShow">{{sortValue[2]}}</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分类参数数据
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
      // 级联选择器绑定值
      sortValue: [],
      activeName: 'first',
      tabsShow: true
    }
  },
  methods: {
    checkCasc (value) {
      // 当选中项不是三级时
      if (value.length !== 3) {
        // 置空
        this.sortValue = []
        // 不是三级时禁用选项卡，并且弹出错误提示
        this.tabsShow = true
        this.$message({
          message: '选项参数不存在，请重新选择',
          duration: 3000
        })
      } else { // 选中项时3级时的操作
        this.tabsShow = false
      }
    }
  }
}
</script>

<style>
.el-card {
  margin-top: 15px;
}
</style>
