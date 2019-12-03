<template>
  <q-page>
  </q-page>
</template>

<script>
export default {
  methods: {
    sair () {
      this.$q.notify({
        color: 'red',
        timeout: 1000,
        textColor: 'white',
        icon: 'tag_faces',
        message: 'Você saiu do sistema!',
        position: 'top'
      })
      localStorage.removeItem('token')
      window.location = '/'
    }
  },
  mounted () {
    this.sair()
  }
}
</script>
