<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-grey-10" >
        <q-toolbar-title>
            <q-icon name="attach_money" size="28px"/>Financeiro
        </q-toolbar-title>
        <q-btn color="yellow-9" icon="account_circle" label="Login" rounded unelevated>
          <q-menu transition-show="flip-right" transition-hide="flip-left" :offset="[0, 4]" unelevated>
            <div class="loginCampo">
              <q-form @submit.prevent="logar()">
                <q-input square color="yellow-9" label="E-mail" v-model="login.email" hint="Digite seu e-mail"/>
                <q-input square color="yellow-9" label="Senha" v-model="login.senha" hint="Digite sua senha"/>
                <q-btn type="submit" color="yellow-9" class="q-mt-sm full-width" label="Entrar" unelevated/>
                <p class="q-mt-sm q-mb-sm">ou</p>
                <q-btn color="yellow-9" class="full-width" label="Registra-se" to="/registrar" unelevated/>
              </q-form>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
window.axios = require('axios')
window.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
window.axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      login: {}
    }
  },
  methods: {
    logar () {
      window.axios.post('http://api.absolutier.com.br/api/sistema/v1/login', this.login)
        .then(res => {
          console.log(res)
          if (res.data.token !== null) {
            localStorage.setItem('token', res.data.token)
            window.location = '/sistema'
          }
          this.$q.notify({
            color: res.data.color,
            timeout: 1000,
            textColor: 'white',
            icon: res.data.icon,
            message: res.data.msg,
            position: 'top'
          })
        })
    }
  }
}
</script>
