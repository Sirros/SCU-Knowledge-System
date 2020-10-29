<template>
  <div class="wp">
    <div  class="wpp">
      <span class="tit"><a-icon type="like"></a-icon>口腔医学多维知识系统</span>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            class="form-ipt"
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入您的用户名称!' }] },
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            class="form-ipt"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入您的密码!' }] },
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading" class="login-form-button">
            登陆
          </a-button>
          还没注册？<a @click="goToRegister">现在注册！</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { request } from '../../network/request';

export default {
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: 'normal_login' })
    }
  },
  components: {
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err && values) {
          console.log('表单数据: ', values)
          /**
           * 登陆请求
           */
          request({
            url: '/user/login',
            method: 'post',
            data: values
          }).then(result => {
            // 本地状态存储
            if(result.data.code === 10000) {
              sessionStorage.setItem('userName', result.data.data.user.username)
              sessionStorage.setItem('userToken', result.data.data.token)
              console.log(sessionStorage.getItem('userName'))
              // vuex 状态存储
              this.$store.dispatch('setUser', sessionStorage.getItem('userName'))
              this.$store.dispatch('setToken', sessionStorage.getItem('userToken'))
              console.log(this.$store.getters.getToken)
              console.log(this.$store.getters.getUser)
            }
            this.loading = false
            // 消息提示
            this.$message.success({ content: '登陆成功！', duration: 1 })
            this.$router.push('/sys/home') // 成功跳转
            
          }).catch(error => {
            console.log(error)
            this.loading = false
            this.$message.warning({ content: '登陆失败！请重新登录', duration: 1 })
          })
        } else {
          this.loading = false
        }
      });
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
  .wp {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wpp {
    height: 400px;
    width: 400px;
  }
  .tit {
    display: block;
    font-size: 22px;
    text-align: center;
    margin-bottom: 30px;
  }
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
</style>