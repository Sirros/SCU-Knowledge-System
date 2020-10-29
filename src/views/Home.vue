<template>
  <div class="home">
    <div class="home-card">
      <a-card style="width: 100%; border: none; ">
        <a-form :form="form" @submit="handleSearch">
          <a-form-item>
            <a-input
              class="form-ipt"
              allow-clear
              v-decorator="[
                'pathology',
                { rules: [{ required: false, message: '请输入查询内容!' }] },
              ]"
              placeholder="请按疾病名称/临床表现/病因/病理变化搜索"
            ></a-input>
            <a-button id="search-btn" html-type="submit"><a-icon type="search" />搜索</a-button>
          </a-form-item>
        </a-form>
        <!-- <div v-show="aList.length" class="result"> -->
        <div class="result">
          <a-list item-layout="horizontal" :data-source="aList">
            <a-list-item v-for="(item, index) in aList" :key="index" >
              <span @click="listClick(item.rootId)" class="result-item">{{item.content}}</span>
            </a-list-item>
          </a-list>
          <a-modal v-model="visible" title="MindMap" width="90%" cancelText="关闭" okText="确定" @ok="handleOk">
            <a-button v-if="!modelLoading" type="button" @click="saveMP">保存脑图</a-button>
            <div style="text-align: center; width: 100%; height:900px; line-height: 900px;">
              <a-spin v-if="modelLoading" />
              <mind-map v-if="!modelLoading && Object.keys(resultListMPData).length > 0" :data="resultListMPData" :height="1000" />
            </div>
          </a-modal>
        </div>
        <!-- <a-empty v-show="!aList.length && !searchLoading" /> -->
        <div style="width: 100%; height: 80px; text-align: center;">
          <a-spin v-if="searchLoading" />
        </div>
      </a-card>
      
      <!-- 图片展示卡片 -->
      <a-card title="常见病理" style="width: 100%; border: none; margin-top: 30px;">
        <div class="img-card">
          <div>
            <div class="btn-group" @click="check">
              <a-button type='primary' @click="() => checkMapName = '牙周组织'">牙周组织</a-button>
              <a-button type='primary' @click="() => checkMapName = '嘴唇'">嘴唇</a-button>
              <a-button type='primary' @click="() => checkMapName = '牙体'">牙体</a-button>
              <a-button type='primary' @click="() => checkMapName = '软腭'">软腭</a-button>
            </div>
            <div style="height: 650px;">
              <img v-if="!topBtnClick" class="img" src="../static/3.png" title="" alt="33" />
              <a-button v-if="topBtnClick" @click="topGoBack" type="">返回</a-button>
              <a-spin v-if="tcheckLoading" />
              <mind-map v-if="topBtnClick && Object.keys(data).length > 0 && !tcheckLoading" :data="data" :height="getHeight" />
            </div>
          </div>
           <a-divider />
          <div>
            <div class="btn-group" @click="check">
              <a-button type='primary' @click="() => checkMapName = '舌下腺'">舌下腺</a-button>
              <a-button type='primary' @click="() => checkMapName = '腮腺'">腮腺</a-button>
              <a-button type='primary' @click="() => checkMapName = '下颚下腺'">下颚下腺</a-button>
              <a-button type='primary' @click="() => checkMapName = '颌骨'">颌骨</a-button>
              <a-button type='primary' @click="() => checkMapName = '口腔颌面部其他组织来源的肿瘤和瘤样病变'">口腔颌面部其他组织来源的肿瘤和瘤样病变</a-button>
            </div>
            <div style="height: 650px;">
              <img v-if="!bottomBtnClick" class="img" src="../static/4.png" title="" alt="44" />
              <a-button v-if="bottomBtnClick" @click="bottomGoBack" type="">返回</a-button>
              <a-spin v-if="bcheckLoading" />
              <mind-map v-if="bottomBtnClick && Object.keys(data).length > 0 && !bcheckLoading" :data="data" :height="getHeight" />
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { request } from '../network/request.js'
import MindMap from './bp/Brain.vue'

export default {
  name: 'Home',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'home_search' }),
      aList: [  // 搜索结果列表
        // {
        //   content: '1111111111111111111',
        //   rootId: 1484
        // }
      ],
      topBtnClick: false,     // 第一幅图的主题
      bottomBtnClick: false,  // 第二幅图的主题
      data: {},               // 主题的脑图数据
      checkMapName: '',       // 查看的主题
      visible: false,         // 模态框可见
      resultListMPData: {},   // 模态框内的导图数据
      modelLoading: false,    // 模态框内的 loading
      searchLoading: false,   // 搜索 loading
      tcheckLoading: false,   // 查看top主题 loading
      bcheckLoading: false,   // 查看top主题 loading
      saveRootId: ''          // 要保存的脑图id
    }
  },
  components: { MindMap },
  computed: {
    getHeight() {
        return document.body.scrollHeight - 68
      }
  },
  methods: {
    // 搜索
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        this.searchLoading = true;
        if (!err) {
          console.log('表单数据: ', values)
          // 搜索请求
          request({
            url: '/mindmap/search',
            method: 'get',
            params: {
              keyword: values.pathology
            }
          }).then(r => {
            console.log(r)
            if(r.data.code === 10000) {
              this.searchLoading = false;
              this.$message.success({ content: '查询成功', duration: 1 })
              this.aList = r.data.data.result || [];
            } else if(r.data.code === 10001) {
              this.searchLoading = false;
              this.$message.success({ content: '数据库中找不到匹配数据', duration: 1 })
            }
          }).catch(error => {
            console.log(error)
            this.searchLoading = false;
          })
        }
      })
    },
    // 模态框确认
    handleOk() {
      this.visible = false;
    },
    // 搜索列表点击
    listClick(id) {
      console.log('rootId: ', id);
      // this.visible = true;
      this.modelLoading = true;
      // 获取模态框脑图
      request({
        url: '/mindmap/getMindMap',
        method: 'post',
        data: {
          rootId: parseInt(id)
        }
      }).then(r => {
        if(r.data.code === 10000) {
          this.resultListMPData = JSON.parse(JSON.stringify(r.data.data))
          this.visible = true
          console.log(this.resultListMPData)
          this.saveRootId = id
          this.modelLoading = false;
          console.log(this.saveRootId)
        } else {
          this.$message.warning({ content: '暂无数据',  duration: 1 })
          this.visible = false;
        }
      }).catch(e => {
        this.$message.warning({ content: '脑图获取失败，请重试', duration: 1 })
        this.visible = false;
      })
    },
    // 保存脑图
    saveMP() {
      console.log(this.saveRootId)
      this.$store.dispatch('setToken', sessionStorage.getItem('userToken'))
      console.log(this.$store.getters.getToken)
      // if(this.saveRootId) {
        request({
          url: '/mindmap/saveMindMap',
          method: 'post',
          data: {
            rootId: parseInt(this.saveRootId)
          },
          headers: {
            token: this.$store.getters.getToken
          }
        }).then(r => {
          if(r.data.code === 10000) {
            this.$message.success({ content: '保存成功！', duration:1 })
          } else {
            this.$message.error({ content: '保存失败，请重试', duration: 1 })
          }
        }).catch(e => {
          this.$message.error({ content: '服务器错误...', duration: 1 })
        })
      // }
    },
    // 上-返回按钮
    topGoBack() {
      this.topBtnClick = false;
    },
    // 下-返回按钮
    bottomGoBack() {
      this.bottomBtnClick = false;
    },
    // 查看导图
    check() {
      this.topBtnClick = false;
      this.bottomBtnClick = false;
      let names = ['牙周组织', '嘴唇', '牙体', '软腭'];
      if(names.includes(this.checkMapName)) {
        console.log('上面')
        this.topBtnClick = true;
        this.tcheckLoading = true;

      } else {
        console.log('下面')
        this.bcheckLoading = true;
        this.bottomBtnClick = true;
      }
      // 获取导图
      request({
        url: '/mindmap/getMindMap',
        method: 'post',
        data: {
          mapName: this.checkMapName
        }
      }).then(r => {
        console.log(r)
        this.saveRootId = r.data.data.rootId
        if(r.data.code === 10000) {
          this.data = JSON.parse(JSON.stringify(r.data.data))
          if(Object.keys(this.data).length === 0) {
            this.$message.warning({ content: '暂无数据', duration: 1 })
          }
          this.tcheckLoading = false;
          this.bcheckLoading = false;
          this.modelLoading = false;
        }
      }).catch(error => {
        console.log(error)
        this.tcheckLoading = false;
        this.bcheckLoading = false;
      })
    }
  },
}
</script>

<style scoped>
  .home {
    position: absolute;
    left: 256px;
    top: 68px;
    bottom: 0;
    right: 0;
  }
  .home-card {
    height: 100%;
    background: #f0f2f5;
    /* padding: 30px; */
  }
  .form-ipt {
    width: 30%;
  }
  #search-btn {
    margin-left: 10px;
  }
  .img-card {
    width: 100%;
  }
  .img {
    width: 100%;
    border: none;
  }
  .img-card .btn-group button {
    margin-right: 20px;
    margin-bottom: 15px;
  }
  .result-item:hover {
    color: #1890ff;
    cursor: pointer;
  }
  .result-item {
    /* background-color: red; */
    font-size: 16px;
    
  }
</style>
