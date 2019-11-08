<template>
    <q-page padding>
        <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/sistema" />
            <q-breadcrumbs-el label="Lançamentos" icon="widgets" to="/sistema/lanc" />
        </q-breadcrumbs>
        <div class="q-pa-md doc-container">
            <q-form @submit="onSubmit" class="q-gutter-md">
                <q-toggle label="Existe registro?" left-label v-model="toggleFormReg" />
                <q-select filled v-model="registro.nReg" :options="options" label="Número Registro" hint="Número do Registro" v-if="toggleFormReg === true" />
                <q-input filled type="number" v-model="registro.valor" label="Valor" hint="Valor do registro" lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor digite o valor']" />
                <q-input filled v-model="registro.obs" label="Data" hint="Data do lançamento" />
                <q-input filled v-model="registro.obs" label="Objeto" hint="Objeto do lançamento" />
                <q-input filled v-model="registro.desc" label="Parte" hint="Parte do lançamento" />
                <q-input filled v-model="registro.desc" label="Centro Contábil" hint="Centro Contábil lançamento" />
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
      toggleFormReg: false,
      registro: {},
      options: ['Google', 'Facebook']
    }
  }
}
</script>
