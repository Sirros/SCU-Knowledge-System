<template>
  <div class="wp">
    <div  class="wpp">
      <span class="tit"><a-icon type="smile" theme="twoTone"></a-icon>注册</span>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            class="forim-ipt"
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入您的用户名!' }] },
            ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            class="forim-ipt"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入您的密码!' }] },
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-alert message="两次输入密码不一致，请重新输入！" v-show="pwsNoPass" type="error" show-icon />
          <a-input
            class="forim-ipt"
            v-decorator="[
              'rePassword',
              { rules: [{ required: true, message: '请再次确认您的密码!' }] },
            ]"
            type="password"
            placeholder="请再次确认密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading" class="login-form-button">
            注册
          </a-button>
          已经注册？<a @click="() => this.$router.push('/login')">返回登陆</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { request } from '../../network/request.js'

  export default {
    data() {
      return {
        loading: false,
        pwsNoPass: false,
        form: this.$form.createForm(this, { name: 'normal_register' })
      }
    },
    components: {
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.loading = true
        this.form.validateFields((err, values) => {
          this.loading = false
          if (!err) {
            console.log('表单数据: ', values)
            if(values.password !== values.rePassword) {
              console.log('两次密码不一致')
              this.pwsNoPass = true
            } else {
              this.pwsNoPass = false
              this.loading = true
              /**
               * 注册请求
               */
              // dosomething
              request({
                url: '/user/register',
                method: 'POST',
                data: values
              }).then(res => {
                console.log(res)
                this.loading = false;
                if(res.data.code === 10001) {
                  this.$message.warning({ content: '用户已存在，请重新确认', duration: 0.6 })
                } else if(res.data.code === 10000) {
                  this.$message.success({ content: '注册成功，自动登录...', duration: 1 })
                  sessionStorage.setItem('userName', res.data.data.user.username)
                  sessionStorage.setItem('userToken', res.data.data.token)
                  // vuex 状态存储
                  this.$store.dispatch('setUser', res.data.data.user.username)
                  this.$store.dispatch('setToken', res.data.data.token)
                  console.log(this.$store.state.isLogin)
                  this.$router.push('/sys/home') // 成功跳转
                }
              }).catch(err => {
                  this.$message.warning({ content: '注册失败，请稍后再试...', duration: 0.6 })
                  this.loading = false
              })
            }
          }
        });
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