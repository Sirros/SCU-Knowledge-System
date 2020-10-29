<template>
  <div class="repository">
    <mind-map :data="data" :height="getHeight" />
  </div>
</template>

<script>
import MindMap from '../bp/Brain.vue'
  export default {
    data() {
      return {
        data: 
        {
          "id": "id1",
          "label": "遗属补助小专项",
          "children": 
          [
            {
              "id": "id1-1",
              "label": "已死亡",
              "children": 
              [
                {
                  "id": "id1-1-1",
                  "label": "问题数：35个"
                },
                {
                  "id": "id1-1-2",
                  "label": "人数：50人"
                },
                {
                  "id": "id1-1-3",
                  "label": "资金：340万"
                }
              ]
            },
            {
              "id": "id1-2",
              "label": "姓名与身份证不符",
              "children": [
                {
                  "id": "id1-2-1",
                  "label": "问题数：35个"
                },
                {
                    "id": "id1-2-2",
                    "label": "人数：50人"
                },
                {
                  "id": "id1-2-3",
                  "label": "资金：340万",
                }
              ]
            }
          ]
        }
      }
    },
    components: {
      MindMap
    },
    updated() {
      // console.log(this.$route.path)
    },
    computed: {
      getHeight() {
        // console.log(document.body.scrollHeight - 68)
        return document.body.scrollHeight - 68
      }
    },
    created() {
      // 根据我点的是第几个去请求数据，拿到脑图数据，然后赋值给 mindMapData
    },
    mounted() {
      
    },
    watch: {
      $route(val) {
        // console.log(val)
      }
    }
  }
</script>

<style>
  .repository {
    position: absolute;
    left: 256px;
    top: 68px;
    bottom: 0;
    right: 0;
  }
  .repository-card {
    height: 100%;
  }
  .mp {
    height: 100%;
  }
</style>
