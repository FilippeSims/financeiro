<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Registro" icon="widgets" to="/sistema/registro" />
    </q-breadcrumbs>
    <div class="q-pa-md doc-container">
    <div id="tituloForm" v-if="inserirForm === true">
      <b>Inserir registro</b>
    </div>
    <div id="tituloForm" v-if="editarForm === true && checkReg.length < 2 && checkReg.length != 0" >
      <b>Editar registro</b>
    </div>
      <q-form @submit.prevent="save()" class="q-gutter-md" v-if="inserirForm === true || editarForm === true && checkReg.length < 2 && checkReg.length != 0">
        <q-input
          filled
          type="number"
          v-model="toSave.valorreg"
          label="Valor"
          hint="Valor do registro"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o valor']"
        />
        <q-input
          filled
          v-model="toSave.obsreg"
          label="Observação"
          hint="Observação do registro"
          hide-underline="true"
          type="textarea"
          rows="3"
        />
        <q-input
          filled
          v-model="toSave.descreg"
          label="Descrição"
          hint="Descrição do registro"
          hide-underline="true"
          type="textarea"
          rows="3"
        />
        <div>
          <q-btn type="submit" color="green" icon="send" class="q-mb-sm float-left"  unelevated/>
        </div>
      </q-form>
      <q-btn class="q-mb-sm float-right" color="green" icon="add_circle" v-on:click="inserirShow(true)" v-if="inserirForm === false" unelevated/>
      <q-btn class="q-mr-sm float-right" color="red" icon="remove_circle" v-on:click="inserirShow(false), editarShow(false)" v-if="inserirForm === true || editarForm === true && checkReg.length != 0" unelevated/>
      <q-btn class="q-mr-sm float-right" color="red" icon="delete_forever" v-on:click="remove(checkReg)" v-if="inserirForm === false && checkReg.length > 0" unelevated/>
      <q-btn class="q-mr-sm float-right" color="primary" icon="edit" @click.prevent="toUpdate(checkReg[0])" v-on:click="editarShow(true)" v-if="inserirForm === false && checkReg.length > 0 && checkReg.length < 2" unelevated/>
      <table border="1px" width="100%">
        <tr>
          <th>Ação</th>
          <th>Número Registro</th>
          <th>Data Registro</th>
          <th>Valor Registro</th>
          <th>Observação Registro</th>
          <th>Descrição Registro</th>
        </tr>
        <tr v-for="(registro, keyRegistro) in registros" :key="keyRegistro">
          <th> <q-checkbox  v-bind:val="registro.nreg" v-model="checkReg"/> </th>
          <th> {{ registro.nreg }} </th>
          <th> {{ registro.dtreg | formatDate }} </th>
          <th> {{ registro.valorreg }} </th>
          <th> {{ registro.obsreg }} </th>
          <th> {{ registro.descreg }} </th>
        </tr>
      </table>
    </div>
  </q-page>
</template>

<script>
let tokenUser = localStorage.getItem('token')
export default {
  data () {
    return {
      registros: { data: [] },
      checkReg: [ ],
      toSave: {},
      inserirForm: false,
      editarForm: false,
      updateStatus: false,
      token: { tokenUser }
    }
  },
  methods: {
    save () {
      if (this.updateStatus) {
        this.update()
      } else {
        this.create()
      }
    },
    inserirShow (status) {
      this.inserirForm = status
      this.toSave = {}
      this.checkReg = []
    },
    editarShow (status) {
      this.editarForm = status
    },
    getList () {
      window.axios.get('http://localhost:3000/api/sistema/v1/registro', { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.registros = res.data
      })
    },
    remove (id) {
      if (confirm('Você tem certeza que deseja apagar?')) {
        window.axios.delete('http://localhost:3000/api/sistema/v1/registro/' + id, { headers: { 'x-access-token': this.token.tokenUser } })
          .then(() => {
            this.getList()
            this.checkReg = []
          })
      }
    },
    create () {
      window.axios.post('http://localhost:3000/api/sistema/v1/registro', this.toSave)
        .then(() => {
          this.toSave = {}
          this.inserirForm = false
          this.editarForm = false
          this.getList()
          this.$q.notify({
            color: 'green',
            timeout: 1000,
            textColor: 'white',
            icon: 'tag_faces',
            message: 'Registro inserido com sucesso!',
            position: 'top'
          })
        })
    },
    update () {
      window.axios.put('http://localhost:3000/api/sistema/v1/registro/' + this.toSave.nreg, this.toSave)
        .then(() => {
          this.updateStatus = false
          this.toSave = {}
          this.inserirForm = false
          this.editarForm = false
          this.getList()
          this.$q.notify({
            color: 'green',
            timeout: 1000,
            textColor: 'white',
            icon: 'tag_faces',
            message: 'Registro editado com sucesso!',
            position: 'top'
          })
        })
    },
    toUpdate (id) {
      this.updateStatus = id
      const campos = this.registros
      const campoId = campos.find(obj => obj.nreg === id)
      this.toSave = campoId
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
