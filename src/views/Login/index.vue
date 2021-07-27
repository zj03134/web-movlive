<template>
  <div>
    <van-nav-bar title="黑马头条 - 登录" />
    <van-form @submit="onSubmitFn">
      <van-field
        v-model="formLogin.mobile"
        type="tel"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        required
        :rules="[{ required: true, message: '请填写手机号', trigger: 'onChange', pattern: /^1[3456789]\d{9}$/ }]"
      />
      <van-field
        v-model="formLogin.code"
        type="password"
        name="code"
        label="密码"
        placeholder="请输入密码"
        required
        :rules="[{ required: true, message: '请填写密码', trigger: 'onChange', pattern: /^\d{6}$/ }]"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { loginAPI } from '@/api/login'
import { MyNotify } from '@/utils/Notify.js'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      formLogin: {
        // 手机号
        mobile: '13888888888',
        // 默认只能用246810后台规定了
        code: '246810'
      }
    }
  },
  methods: {
    ...mapActions(['asyncLoginAction']),
    async onSubmitFn() {
      try {
        await this.asyncLoginAction(this.formLogin)
        MyNotify({ type: 'success', message: '登录成功' })
        // 跳转到Layout页面
        this.$router.replace({
          path: this.$route.query.path || '/layout'
        })
      } catch (err) {
        MyNotify({ type: 'warning', message: '手机号或密码错误' })
      }
    }
  }
}
</script>
