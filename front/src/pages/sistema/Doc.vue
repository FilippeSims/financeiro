<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Doc" icon="widgets" to="/sistema/doc" />
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
          v-model="toSave.valordoc"
          label="Valor"
          hint="Valor do Doc"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o valor']"
        />
        <q-date v-model="toSave.dtdoc" minimal/>
        <q-input
          filled
          dense
          v-model="toSave.fornecedordoc"
          label="Fornecedor"
          hint="Fornecedor do Doc"
          hide-underline="true"
          type="textarea"
          rows="1"
        />
        <q-select dense filled v-model="toSave.tpcontroledoc" label="Tipo de Controle" hint="Tipo de Controle do Doc" :options="optionsTipoControle"/>
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
            <th scope="col">Número Doc</th>
            <th scope="col">Valor Doc</th>
            <th scope="col">Data Doc</th>
            <th scope="col">Fornecedor Doc</th>
            <th scope="col">Tipo de Controle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(doc, keyRegistro) in docs" :key="keyRegistro">
            <td data-label="Ação Reg"> <q-checkbox  v-bind:val="doc.ndoc" v-model="checkReg"/> </td>
            <td data-label="Número Reg" v-if="doc.ndoc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Reg" v-else> {{ doc.ndoc }} </td>
            <td data-label="Valor Reg" v-if="doc.valordoc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Valor Reg" v-else> {{ 'R$ ' + doc.valordoc }} </td>
            <td data-label="Data Reg" v-if="doc.dtdoc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Data Reg" v-else> {{ doc.dtdoc | formatDate }} </td>
            <td data-label="Observação Reg" v-if="doc.fornecedordoc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Observação Reg" v-else> {{ doc.fornecedordoc }} </td>
            <td data-label="Descrição Reg" v-if="doc.tpcontroledoc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Descrição Reg" v-else> {{ doc.tpcontroledoc }} </td>
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
      docs: { data: [] },
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
      window.axios.get(`${process.env.API}/doc`).then(res => {
        this.docs = res.data
      })
    },
    remove (id) {
      if (confirm('Você tem certeza que deseja apagar?')) {
        window.axios.delete(`${process.env.API}/doc/` + id)
          .then(() => {
            this.getList()
            this.checkReg = []
          })
      }
    },
    create () {
      window.axios.post(`${process.env.API}/doc`, this.toSave)
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
      window.axios.put(`${process.env.API}/doc/` + this.toSave.ndoc, this.toSave)
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
      const campos = this.docs
      const campoId = campos.find(obj => obj.ndoc === id)
      this.toSave = campoId
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
