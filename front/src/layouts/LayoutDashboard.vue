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
        show-if-above
        :width="250"
        :breakpoint="400"
        content-class="bg-grey-4"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list v-for="(menuItemPai, index) in menuPai" :key="index">
            <q-item clickable v-ripple v-if="menuItemPai.submenu === false" :to="menuItemPai.to">
              <q-item-section avatar>
                <q-icon :name="menuItemPai.icon" :color="menuItemPai.color"/>
              </q-item-section>
              <q-item-section>
                {{ menuItemPai.label }}
              </q-item-section>
            </q-item>
            <q-expansion-item expand-separator v-if="menuItemPai.submenu === true" :icon="menuItemPai.icon" :label="menuItemPai.label">
              <q-list v-for="(menuItem, index) in menuList" :key="index">
                <q-item clickable :active="menuItem.label === ''" :to="menuItem.to" v-ripple v-if="menuItemPai.pai === menuItem.pai">
                  <q-item-section avatar>
                    <q-icon :name="menuItem.icon" :color="menuItem.color" />
                  </q-item-section>
                  <q-item-section>
                    {{ menuItem.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-separator v-if="menuItemPai.separator" />
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

const menuPai = [
  {
    icon: 'home',
    label: 'Início',
    submenu: false,
    to: '/sistema/',
    separator: true,
    rule: 'guest'
  },
  {
    icon: 'home',
    label: 'Cadastrar',
    submenu: true,
    pai: 'cadastrar',
    to: null,
    separator: true,
    rule: 'guest'
  },
  {
    icon: 'home',
    label: 'Registrar',
    submenu: true,
    pai: 'registro',
    to: null,
    separator: true,
    rule: 'guest'
  },
  {
    icon: 'logout',
    label: 'Sair',
    submenu: false,
    to: '/sistema/sair',
    separator: true,
    rule: 'guest'
  }
]

const menuList = [
  {
    icon: 'control_point',
    label: 'Registro',
    pai: 'cadastrar',
    to: '/sistema/registro',
    separator: false,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Lançamentos',
    pai: 'registro',
    to: '/sistema/lanc',
    separator: false,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Doc',
    pai: 'registro',
    to: '/sistema/doc',
    separator: false,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Pagar',
    pai: 'registro',
    to: '/sistema/pagar',
    separator: false,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Contabilizar',
    pai: 'cadastrar',
    to: '/sistema/contab',
    separator: true,
    rule: 'guest'
  },
  {
    icon: 'control_point',
    label: 'Plano de Contas',
    pai: 'cadastrar',
    to: '/sistema/planoconta',
    separator: true,
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
      menuPai,
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
