<template>
  <div style="height: 100%;">
    <router-view />
    <div class="head">
      <div class="head-content">
        <a class="a-title" href="/">口腔医学多维知识系统</a>
      </div>
      <div class="info">
        <div class="userName">
          <div v-show="!isLogin">
            <template>
              <a-dropdown>
                <a-button style="border:none; height: 64px;">未登录</a-button>
                <a-menu slot="overlay">
                  <a-menu-item>
                      <a-button style="border:none;" @click="goToLogin"><a-icon type="login" />去登录</a-button>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </div>
          <div v-show="isLogin">
            <template>
              <a-dropdown>
                <a-button style="border: none; height: 64px;">{{this.$store.state.user}}</a-button>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a-button style="border:none;" @click="goToLogin"><a-icon type="logout" />退出登录</a-button>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </div>
        </div>
      </div>
    </div>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['1']"
      mode="inline"
      theme="light"
      :inline-collapsed="collapsed"
      style="position:fixed; top:69px; bottom:0; width: 256px;"
    >
      <a-menu-item key="1" @click='menuClick'>
        <a-icon type="appstore" />
        <span>首页</span>
      </a-menu-item>
      <!-- <a-sub-menu key="2">
        <span slot="title"><a-icon type="read" /><span>知识库</span></span>
        <a-menu-item key="21" @click='menuClick'>
          牙体
        </a-menu-item>
        <a-menu-item key="22" @click='menuClick'>
          牙周组织
        </a-menu-item>
      </a-sub-menu> -->
      <a-sub-menu key="3">
        <span slot="title"><a-icon type="coffee" /><span>个人中心</span></span>
        <a-menu-item key="31" @click='menuClick'>
          我的笔记
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    isLogin() {
      if(sessionStorage.getItem('userToken') && sessionStorage.getItem('userName')) {
        this.$store.commit('userStatue', sessionStorage.getItem('userName'))
      } else {
        this.$store.commit('userStatue', null)
      }
      return this.$store.getters.getLogin
    }
  },
  methods: {
    menuClick(e) {
      if(e.key === '1' && this.$route.path !== '/sys/home') {
        this.$router.push('/sys/home')
      }
      if(e.key === '21' && this.$route.path !== '/sys/repository/21') {
        this.$router.push({
          path: `/sys/repository/21`
        })
      }
      if(e.key === '22' && this.$route.path !== '/sys/repository/22') {
        this.$router.push({
          path: '/sys/repository/22'
        })
      }
      if(e.key === '31' && this.$route.path !== '/sys/about') {
        this.$router.push('/sys/about')
      }
    },
    goToLogin() {
      this.$store.dispatch('setUser', null);
      if(this.$store.state.isLogin) {
        this.$message.success({ content: '退出登录', duration: 0.7 })
      }
      this.$router.push('/login')
    }
  },
  created() {
    // console.log(this.$store.getters.getUser)
    // console.log(this.$store.getters.getToken)
  },
  watch: {
    $route(nval, oval) {
      console.log(nval)
      console.log(oval)
    }
  }
};
</script>

<style>
  body, html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .ant-menu-item {
    height: 64px;
    line-height: 64px;
  }
  .head {
    background-color: #fff;
    height: 68px;
    line-height: 68px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    box-shadow: 0px 0px 2px #888888;
  }
  .head-content {
    width: 256px;
    height: 68px;
    line-height: 68px;
    font-size: 19px;
    font-weight: 600;
    text-align: center;
    /* border-bottom: 1px solid #e8e8e8; */
  }
  .a-title:link, .a-title:visited {
    color: black;
  }
  .info {
    flex: 1;
  }
  .info .userName {
    width: 220px;
    height: 70px;
    line-height: 70px;
    margin-left: auto;
    /* margin-right: 0px; */
  }
</style>