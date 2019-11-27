<template>
  <q-page>
  </q-page>
</template>

<script>
export default {
  methods: {
    sair () {
      localStorage.removeItem('token')
      this.$q.notify({
        color: 'green',
        timeout: 1000,
        textColor: 'white',
        icon: 'tag_faces',
        message: 'Registro editado com sucesso!',
        position: 'top'
      })
      window.location = '/'
    }
  },
  mounted () {
    this.sair()
  }
}
</script>
