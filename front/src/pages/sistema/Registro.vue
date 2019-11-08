<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Registro" icon="widgets" to="/sistema/registro" />
    </q-breadcrumbs>
    <div class="q-pa-md doc-container">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          type="number"
          v-model="registro.valor"
          label="Valor"
          hint="Valor do registro"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o valor']"
        />

        <q-input
          filled
          v-model="registro.obs"
          label="Observação"
          hint="Observação do registro"
        />

        <q-input
          filled
          v-model="registro.desc"
          label="Descrição"
          hint="Descrição do registro"
        />

        <div>
          <q-btn label="Enviar" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      registro: {}
    }
  }
}
</script>
