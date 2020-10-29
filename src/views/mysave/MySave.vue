<template>
  <div class="my-save">
    <div class="save-card">
      <div class="button-group">
        <a-button class="back-button" type="button" @click="goBack">返回</a-button>
      </div>
      <a-card :title="mapName" >
        <mind-map v-if="havaData" :data="myData" :height="600" />
      </a-card>
    </div>
  </div>
</template>

<script>
  import { request } from '../../network/request'
  import MindMap from '../bp/Brain.vue'

  export default {
    name: 'MySave',
    data() {
      return {
        myData: {},
        mapName: '',
        havaData: false
      }
    },
    components: {
      MindMap
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    },
    created() {
      console.log(this.$route.query.name);
      this.mapName = this.$route.query.name;
      request({
        url: '/mindmap/getMindMap',
        method: 'post',
        data: {
          mapName: this.mapName
        }
      }).then(r => {
        console.log(r);
        if(r.data.code === 10000) {
          this.myData = JSON.parse(JSON.stringify(r.data.data))
          this.havaData = true
          console.log(this.myData);
        } else {
          this.$message.success({ content: '暂无数据', duration: 1 })
        }
      }).catch(e => {
        this.$message.error({ content: '服务器错误', duration: 1 })
      })
    }
  }
</script>

<style>
  .my-save {
    position: absolute;
    left: 256px;
    top: 68px;
    bottom: 0;
    right: 0;
  }
  .save-card {
    height: 100%;
    background: #f0f2f5;
    padding: 30px;
  }
  .button-group {
    width: 100%;
  }
  .back-button {
    margin-right: 15px;
    margin-bottom: 5px;
    border: none;
  }
</style>
