<template>
  <div>
    <!-- 页头面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- main,卡片区域 -->
    <el-card>
      <el-table :data="roleData" border stripe="">
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template v-slot="listData">
            <el-row v-for="(roleDataOne,id1) in listData.row.children" :key="id1" :class="['bottomborder', id1 === 0 ? 'topborder' : '']">
              <el-col :span="8">
                <el-tag>{{roleDataOne.name}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="16">
                <el-row v-for="(roleDataTwo,id2) in roleDataOne.children" :key="id2" :class="[id2 === 0 ? '' : 'topborder']">
                  <el-col :span="8">
                    <el-tag type="success" closable>{{roleDataTwo.name}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag type="warning" closable v-for="(roleDataThree,id3) in roleDataTwo.children" :key="id3">{{roleDataThree.name}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" align="center" prop="name"></el-table-column>
        <el-table-column label="角色描述" align="center" prop="nameDes"></el-table-column>
        <el-table-column label="操作" align="center" width="400px">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="roleDelete">删除</el-button>
          <el-button type="warning" icon="el-icon-setting" @click="roleAuth">分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="分配权限"
      :visible.sync="roleDialog"
      width="30%"
    >
    <!-- 添加树形结构 -->
      <el-tree :data="roleData" :props="defaultProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialog = false">取 消</el-button>
        <el-button type="primary" @click="roleDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格数据
      roleData: [
        {
          name: '角色1',
          nameDes: '管理人员1',
          children: [
            {
              name: '一级一',
              children: [
                {
                  name: '二级1',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                },
                {
                  name: '二级2',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                },
                {
                  name: '二级3',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                }
              ]
            },
            {
              name: '一级二',
              children: [
                {
                  name: '二级1',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                },
                {
                  name: '二级2',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                },
                {
                  name: '二级3',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                }
              ]
            },
            {
              name: '一级三',
              children: [
                {
                  name: '二级1',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                },
                {
                  name: '二级2',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                },
                {
                  name: '二级3',
                  children: [
                    {name: '三级1'},
                    {name: '三级2'},
                    {name: '三级3'}
                  ]
                }
              ]
            }
          ]
        },
        {
          name: '角色2',
          nameDes: '管理人员1',
          children: []
        },
        {
          name: '角色3',
          nameDes: '管理人员1',
          children: []
        },
        {
          name: '角色4',
          nameDes: '管理人员1',
          children: []
        },
        {
          name: '角色5',
          nameDes: '管理人员1',
          children: []
        }
      ],
      // 控制分配权限的显示隐藏
      roleDialog: false,
      // 控制弹出框树形结构
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    // 删除按钮
    roleDelete () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功! 哇咔咔'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除，哇咔咔'
        })
      })
    },
    // 点击分配权限按钮，打开对话框
    roleAuth () {
      this.roleDialog = true
    }
  }
}
</script>

<style>
.el-card {
  margin-top: 15px;
}

.topborder {
  border-top: 1px solid #eee;
}

.el-tag {
  margin: 7px;
}

.bottomborder {
  border-bottom: 1px solid #eee;
}

.el-row {
  display: flex;
  align-items: center;
}
</style>
