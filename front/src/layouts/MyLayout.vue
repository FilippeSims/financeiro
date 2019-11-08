<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-grey-10" >
        <q-toolbar-title>
          <q-icon name="attach_money" size="28px" />Financeiro
        </q-toolbar-title>
        <q-btn color="yellow-9" icon="account_circle" label="Login" to="/sistema" rounded unelevated/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
