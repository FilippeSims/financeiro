<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Registro" icon="widgets" to="/sistema/registro" />
    </q-breadcrumbs>
    <div id="tituloForm" v-if="inserirForm === true">
      <b>Inserir registro</b>
    </div>
    <div id="tituloForm" v-if="editarForm === true && checkReg.length < 2 && checkReg.length != 0" >
      <b>Editar registro</b>
    </div>
      <q-form @submit.prevent="save()" class="q-gutter-md q-mt-sm" v-if="inserirForm === true || editarForm === true && checkReg.length < 2 && checkReg.length != 0">
        <q-input
          filled
          dense
          prefix="R$"
          mask="#.##"
          reverse-fill-mask
          v-model="toSave.valorreg"
          label="Valor"
          hint="Valor do registro"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o valor']"
        />
        <q-input
          filled
          dense
          v-model="toSave.obsreg"
          label="Observação"
          hint="Observação do registro"
          hide-underline="true"
          type="textarea"
          rows="3"
        />
        <q-input
          filled
          dense
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
      <table>
        <thead>
          <tr>
            <th scope="col">Ação</th>
            <th scope="col">Número Registro</th>
            <th scope="col">Data Registro</th>
            <th scope="col">Valor Registro</th>
            <th scope="col">Observação Registro</th>
            <th scope="col">Descrição Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registro, keyRegistro) in registros" :key="keyRegistro">
            <td data-label="Ação Reg"> <q-checkbox  v-bind:val="registro.nreg" v-model="checkReg"/> </td>
            <td data-label="Número Reg" v-if="registro.nreg === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Reg" v-else> {{ registro.nreg }} </td>
            <td data-label="Data Reg" v-if="registro.dtreg === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Data Reg" v-else> {{ registro.dtreg | formatDate }} </td>
            <td data-label="Valor Reg" v-if="registro.valorreg === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Valor Reg" v-else> {{ 'R$ ' + formatPrice(registro.valorreg) }} </td>
            <td data-label="Observação Reg" v-if="registro.obsreg === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Observação Reg" v-else> {{ registro.obsreg }} </td>
            <td data-label="Descrição Reg" v-if="registro.descreg === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Descrição Reg" v-else> {{ registro.descreg }} </td>
          </tr>
        </tbody>
      </table>
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
    formatPrice (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    getList () {
      window.axios.get(`${process.env.API}/registro`, { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.registros = res.data
      })
    },
    remove (id) {
      if (confirm('Você tem certeza que deseja apagar?')) {
        window.axios.delete(`${process.env.API}/registro/` + id, { headers: { 'x-access-token': this.token.tokenUser } })
          .then(res => {
            this.getList()
            this.checkReg = []
            this.$q.notify({
              color: res.data.color,
              timeout: 10000,
              textColor: 'white',
              icon: res.data.icon,
              message: res.data.msg,
              position: 'top'
            })
          })
      }
    },
    create () {
      window.axios.post(`${process.env.API}/registro`, this.toSave, { headers: { 'x-access-token': this.token.tokenUser } })
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
      window.axios.put(`${process.env.API}/registro/` + this.toSave.nreg, this.toSave, { headers: { 'x-access-token': this.token.tokenUser } })
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
