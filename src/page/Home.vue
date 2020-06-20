<template>
  <el-container class="home-container">
    <el-header height="45px">
      <div id="header-title">商城后台管理系统</div>
      <div>
        <el-button type="info">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activePath"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
        <!-- 双层循环，循环出菜单栏数据 -->
          <el-submenu v-for="(menu,index) in menuData" :key="index" :index="menu.path">
            <template slot="title">
              <!-- 动态绑定，利用index来动态设置一级菜单图标 -->
              <i :class="menuIcon[index]"></i>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(menuItem,id) in menu.item" :key="id" :index="menuItem.path">
                <i class="el-icon-menu"></i>
                <span>{{menuItem.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  metaInfo: { // 配置每个页面的TDK  引用了插件
    title: '首页',
    meta: [
      {
        name: 'keyworlds',
        content: '首页,官网首页'
      },
      {
        name: 'description',
        content: '这是首页的描述信息'
      }
    ]
  },
  data () {
    return {
      // 菜单导航数据
      menuData: [
        {
          name: '用户管理',
          path: 'users',
          item: [
            {
              name: '用户列表',
              path: 'userList'
            }
          ]
        },
        {
          name: '权限管理',
          path: 'auth',
          item: [
            {
              name: '角色列表',
              path: 'roleList'
            },
            {
              name: '权限列表',
              path: 'authList'
            }
          ]
        },
        {
          name: '商品管理',
          path: 'goods',
          item: [
            {
              name: '商品列表',
              path: 'goodsList'
            },
            {
              name: '分类参数',
              path: 'sortPara'
            },
            {
              name: '商品分类',
              path: 'goodsSort'
            },
            {
              name: '添加商品',
              path: 'goodsAdd'
            }
          ]
        },
        {
          name: '订单管理',
          path: 'order'
        },
        {
          name: '数据统计',
          path: 'datas'
        }
      ],
      // 默认菜单高亮显示动态数据
      activePath: 'userList',
      // 一级菜单图标数据
      menuIcon: ['el-icon-user', 'el-icon-setting', 'el-icon-goods', 'el-icon-tickets', 'el-icon-pie-chart']
    }
  },
  created () {
    // 测试封装axios
    this.$api.modleOne.firstGetRequest().then(
      res => {
        console.log(res)
      }
    )
    this.getRouterPath()
  },
  methods: {
    // 获取当前页面的路由地址，设置成默认显示项，目的是配合监听路由无法在当前页面刷新时默认显示问题
    getRouterPath () {
      this.activePath = this.$route.path.replace('/', '')
    }
  },
  watch: {
    // 监听路由变化，但是无法监听到刷新
    '$route.path' (newUrl, oldUrl) {
      this.activePath = newUrl.replace('/', '') // 如果路由变化了，就将去除 ’/‘后的路由地址字符串赋值给menuActive ，用于当前菜单栏的高亮显示
    }
  }
}
</script>

<style scoped>
.el-header {
  background: rgb(48, 53, 56);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#header-title {
  color: #000;
}

.el-aside {
  background-color: #545c64;
}

.home-container {
  height: 100%;
}

/* 菜单栏部分展开凸起问题 */
.el-menu {
  border: none;
}
</style>
