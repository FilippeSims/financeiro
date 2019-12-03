<template>
    <q-page padding>
        <q-form @submit.prevent="create()" class="q-pa-md">
            <q-input class="q-mb-sm" color="yellow-9" filled v-model="toSave.nome" label="Nome" hint="Digite seu nome"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor digite seu nome']"/>
            <q-input class="q-mb-sm" color="yellow-9" v-model="toSave.sobrenome" filled label="Sobrenome" hint="Digite seu sobrenome"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor digite seu sobrenome']"/>
            <q-input class="q-mb-sm" color="yellow-9" v-model="toSave.email" filled label="E-mail" hint="Digite seu e-mail"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor digite seu e-mail']"/>
            <q-input type="password" class="q-mb-sm" color="yellow-9" v-model="toSave.senha" filled label="Senha" hint="Digite sua senha"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor digite sua senha']"/>
            <q-input type="password" class="q-mb-sm" color="yellow-9" v-model="toSave.senhaRepetida" filled label="Repetir Senha" hint="Repita sua senha"
            :rules="[ val => val && val.length > 0 || 'Por favor repita sua senha', val => val == toSave.senha || 'Senhas não coincidem' ]"/>
            <q-checkbox label="Aceito os termos e condições de uso" color="green" class="q-mt-sm q-mb-sm" v-model="aceitarTermos"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor digite seu nome']"/>
            <q-btn type="submit" color="yellow-9" class="full-width" label="Registra-se" unelevated v-if="aceitarTermos === true"/>
            <q-btn color="yellow-9" class="full-width" label="Registra-se" unelevated disabled v-else>
                <q-tooltip transition-show="flip-right" transition-hide="flip-left" content-class="bg-red" :offset="[0, 5]">
                    Aceite os termos!
                </q-tooltip>
            </q-btn>
        </q-form>
    </q-page>
</template>

<script>
window.axios = require('axios')
window.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
window.axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
  data () {
    return {
      aceitarTermos: false,
      toSave: {}
    }
  },
  methods: {
    create () {
      window.axios.post('http://api.absolutier.com.br/api/sistema/v1/usuarios', this.toSave)
        .then(res => {
          this.$q.notify({
            color: res.data.color,
            timeout: 1000,
            textColor: 'white',
            icon: res.data.icon,
            message: res.data.msg,
            position: 'top'
          })
          if (res.data.status === true) {
            this.$router.push('/')
          } else {
            this.toSave = {}
          }
        })
    }
  }
}
</script>
