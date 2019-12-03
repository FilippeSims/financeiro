<template>
    <q-layout v-if="token.tokenUser === null">
    <q-page-container>
      <q-banner dense inline-actions class="text-white bg-red">
      Você não tem autorização para acessar essa página, faça login!
      <template v-slot:action>
        <q-btn flat color="white" label="Fazer login" to="/" />
      </template>
    </q-banner>
    <q-icon name="warning" class="text-red absolute-center" style="font-size: 12rem;"/>
    </q-page-container>
  </q-layout>

  <q-layout view="hHh Lpr fFf" v-else> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) The Header -->
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          <q-icon name="attach_money" size="28px" />Financeiro
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-4"
    >
        <q-scroll-area class="fit" style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === ''" :to="menuItem.to" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" :color="menuItem.color" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
           <q-separator v-if="menuItem.separator" />
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px" v-for="(user, dados) in usuario" :key="dados">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ user.nomeusuario + ' ' + user.sobrenomeusuario}}</div>
            <div>{{ user.emailusuario }}</div>
            <div>{{ user.ruleusuario }}</div>
          </div>
        </q-img>
    </q-drawer>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

const menuList = [
  {
    icon: 'home',
    label: 'Início',
    to: '/sistema',
    separator: true,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Registro',
    to: '/sistema/registro',
    separator: false,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Lançamentos',
    to: '/sistema/lanc',
    separator: false,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Doc',
    to: '/sistema/doc',
    separator: false,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Pagar',
    to: '/sistema/pagar',
    separator: true,
    rule: 'guest'
  },
  {
    icon: 'logout',
    label: 'Sair',
    to: '/sistema/sair',
    separator: false,
    rule: 'guest'
  }
]

let tokenUser = localStorage.getItem('token')
window.axios = require('axios')
window.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
window.axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
window.axios.defaults.headers.get['x-access-token'] = tokenUser

export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true,
      menuList,
      token: { tokenUser },
      usuario: { data: [] }
    }
  },
  methods: {
    dadosUsuario () {
      window.axios.get(`${process.env.API}/usuario`, { headers: { 'x-access-token': this.token.tokenUser } })
        .then(res => {
          this.usuario = res.data
        })
    }
  },
  mounted () {
    this.dadosUsuario()
  }
}
</script>
