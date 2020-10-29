<template>
  <div class="about">
    <div class="about-card">
      <a-card title="笔记" >
        <!-- <a-empty /> -->
        <a-card-grid class="card-i" style="width:25%;text-align:center" v-for="(item, index) in pList" :key="index" @click="goToBP(index)">
          {{ item.name }}
        </a-card-grid>
        <a-empty v-if="pList.length === 0" />
      </a-card>
    </div>
  </div>
</template>

<script>
import { request } from '../network/request.js'

export default {
  data() {
    return {
      pList: [
        // { name: '笔记一', id: 1 },
        // { name: '笔记二', id: 2 }
      ],
      MPData: {}
    }
  },
  methods: {
    goToBP(index) {
      this.$router.push({
        path: '/sys/bp',
        query: {
          name: this.pList[index].name
        }
      })
    }
  },
  created() {
    console.log('created')
    this.$store.dispatch('setToken', sessionStorage.getItem('userToken'))
    let token = this.$store.getters.getToken;
    if(token) {
      console.log(token)
      request({
        url: '/mindmap/getMyMindMap',
        method: 'get',
        headers: {
          token: token
        }
      }).then(r => {
        console.log(r)
        if(r.data.code === 10000) {
          this.pList = r.data.data.list;
        }
      }).catch(e => {
        this.$message.error({ content: '获取脑图失败', duration: 1 })
      })
    } else {
      this.$message.warning({ content: '请先登陆', duration: 1 })
      // this.$router.push({ path: '/login' })
    }
  },
  mounted() {
    console.log('mounted')
    console.log(this.$store.state.token)
    console.log(sessionStorage.getItem('userToken'))
  }
}
</script>

<style scoped>
  .about {
    position: absolute;
    left: 256px;
    top: 68px;
    bottom: 0;
    right: 0;
  }
  .about-card {
    height: 100%;
    background: #f0f2f5;
    padding: 30px;
  }
  .card-i:hover {
    cursor: pointer;
  }
</style>
