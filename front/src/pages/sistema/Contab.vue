<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Doc" icon="widgets" to="/sistema/contab" />
    </q-breadcrumbs>
   <div id="tituloForm" v-if="inserirForm === true">
      <b>Inserir registro</b>
    </div>
    <div id="tituloForm" v-if="editarForm === true && checkReg.length < 2 && checkReg.length != 0" >
      <b>Editar registro</b>
    </div>
      <q-form @submit.prevent="save()" class="q-gutter-md" v-if="inserirForm === true || editarForm === true && checkReg.length < 2 && checkReg.length != 0">
        <q-input
          filled
          dense
          prefix="R$"
          v-model="toSave.valorcontab"
          label="Valor"
          hint="Valor do Doc"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o valor']"
        />
        <q-date v-model="toSave.datacontab" minimal/>
        <q-input
          filled
          dense
          v-model="toSave.nlanc"
          label="Lançamento"
          hint="Número do Lançamento"
          hide-underline="true"
          type="textarea"
          rows="1"
        />
        <q-input
          filled
          dense
          v-model="toSave.nconta"
          label="Conta"
          hint="Número da Conta"
          hide-underline="true"
          type="textarea"
          rows="1"
        />
        <q-input
          filled
          dense
          v-model="toSave.tipocontab"
          label="Tipo"
          hint="Tipo de Contabilização"
          hide-underline="true"
          type="textarea"
          rows="1"
        />
        <q-input
          filled
          dense
          v-model="toSave.obscontab"
          label="Observação"
          hint="Observação da Contabilização"
          hide-underline="true"
          type="textarea"
          rows="1"
        />
        <div>
          <q-btn type="submit" color="green" icon="send" class="q-mb-sm float-left"  unelevated/>
        </div>
      </q-form>
        <q-btn class="q-mb-sm float-right" color="green" icon="add_circle" v-on:click="inserirShow(true)" v-if="inserirForm === false" unelevated dense/>
      <q-btn class="q-mr-sm float-right" color="red" icon="remove_circle" v-on:click="inserirShow(false), editarShow(false)" v-if="inserirForm === true || editarForm === true && checkReg.length != 0" unelevated dense/>
      <q-btn class="q-mr-sm float-right" color="red" icon="delete_forever" v-on:click="remove(checkReg)" v-if="inserirForm === false && checkReg.length > 0" unelevated dense/>
      <q-btn class="q-mr-sm float-right" color="primary" icon="edit" @click.prevent="toUpdate(checkReg[0])" v-on:click="editarShow(true)" v-if="inserirForm === false && checkReg.length > 0 && checkReg.length < 2" unelevated dense/>
        <table>
        <thead>
          <tr>
            <th scope="col">Ação</th>
            <th scope="col">Número Contab</th>
            <th scope="col">Data</th>
            <th scope="col">Número Lanc</th>
            <th scope="col">Número Conta</th>
            <th scope="col">Tipo de Contab</th>
            <th scope="col">Valor Contab</th>
            <th scope="col">Obs Contab</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contab, keyRegistro) in contabs" :key="keyRegistro">
            <td data-label="Ação Reg"> <q-checkbox  v-bind:val="contab.ncontab" v-model="checkReg"/> </td>
            <td data-label="Número Contab" v-if="contab.ncontab === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Contab" v-else> {{ contab.ncontab }} </td>
            <td data-label="Data" v-if="contab.datacontab === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Data" v-else> {{ contab.datacontab | formatDate }} </td>
            <td data-label="Número Lanc" v-if="contab.nlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Lanc" v-else> {{ contab.nlanc }} </td>
            <td data-label="Número Conta" v-if="contab.nconta === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Conta" v-else> {{ contab.nconta }} </td>
            <td data-label="Tipo de Contab" v-if="contab.tipocontab === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Tipo de Contab" v-else> {{ contab.tipocontab }} </td>
            <td data-label="Valor Contab" v-if="contab.valorcontab === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Valor Contab" v-else> {{ contab.valorcontab }} </td>
            <td data-label="Obs Contab" v-if="contab.obscontab === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Obs Contab" v-else> {{ contab.obscontab }} </td>
          </tr>
        </tbody>
      </table>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      checkReg: [ ],
      toSave: {},
      contabs: { data: [] },
      inserirForm: false,
      editarForm: false,
      optionsTipoControle: [
        'Patrimônio', 'Consumo', 'Rateio'
      ]
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
      window.axios.get(`${process.env.API}/contab`).then(res => {
        this.contabs = res.data
      })
    },
    remove (id) {
      if (confirm('Você tem certeza que deseja apagar?')) {
        window.axios.delete(`${process.env.API}/contab/` + id)
          .then(() => {
            this.getList()
            this.checkReg = []
          })
      }
    },
    create () {
      window.axios.post(`${process.env.API}/contab`, this.toSave)
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
      window.axios.put(`${process.env.API}/contab/` + this.toSave.ncontab, this.toSave)
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
      const campos = this.contabs
      const campoId = campos.find(obj => obj.ncontab === id)
      this.toSave = campoId
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
