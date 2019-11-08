<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

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
        <q-scroll-area class="fit">
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
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: 'home',
    label: 'Início',
    to: '/sistema',
    separator: true
  },
  {
    icon: 'control_point',
    label: 'Registro',
    to: '/sistema/registro',
    separator: false
  },
  {
    icon: 'control_point',
    label: 'Lançamentos',
    to: '/sistema/lanc',
    separator: true
  },
  {
    icon: 'logout',
    label: 'Sair',
    to: '/logout',
    separator: false
  }
]

export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true,
      menuList
    }
  }
}
</script>
