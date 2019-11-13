<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Registro" icon="widgets" to="/sistema/registro" />
    </q-breadcrumbs>
    <div class="q-pa-md doc-container">
      <q-form @submit.prevent="save()" class="q-gutter-md" v-if="inserir === true">
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
          <q-btn label="Enviar" type="submit" color="primary" class="q-mb-sm float-left"  unelevated/>
        </div>
      </q-form>

      <q-btn class="q-mb-sm float-right" color="primary" icon="add_circle" label="Inserir" v-on:click="inserirShow(true)" v-if="inserir === false" unelevated/>
      <q-btn class="q-mb-sm float-right" color="red" icon="remove_circle" label="Fechar" v-on:click="inserirShow(false)" v-else unelevated/>
      <table border="1px" width="100%">
        <tr>
          <th>TituloM</th>
          <th>TituloM</th>
          <th>TituloM</th>
        </tr>
        <tr>
          <td>Conteúdo</td>
          <td>Conteúdo</td>
          <td>Conteúdo</td>
        </tr>
      </table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      registro: {},
      inserir: false
    }
  },
  methods: {
    save () {

    },
    inserirShow (status) {
      this.inserir = status
    }
  }
}
</script>
