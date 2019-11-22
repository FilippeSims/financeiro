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
              <q-form>
                <q-input square color="yellow-9" label="E-mail" hint="Digite seu e-mail"/>
                <q-input square color="yellow-9" label="Senha" hint="Digite sua senha"/>
                <q-btn color="yellow-9" class="q-mt-sm full-width" label="Entrar" unelevated/>
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
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
