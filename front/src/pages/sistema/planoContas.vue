<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Registro" icon="widgets" to="/sistema/registro" />
    </q-breadcrumbs>
    <div id="tituloForm" v-if="inserirForm === true">
      <b>Inserir Plano Contas</b>
    </div>
    <div id="tituloForm" v-if="editarForm === true && checkReg.length < 2 && checkReg.length != 0" >
      <b>Editar Plano Contas</b>
    </div>
    {{ toSave }}
      <q-form @submit.prevent="save()" class="q-gutter-md q-mt-sm" v-if="inserirForm === true || editarForm === true && checkReg.length < 2 && checkReg.length != 0">
        <q-input
          filled
          dense
          v-model="toSave.codconta"
          label="Código"
          hint="Código Plano de Conta"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o código plano de conta']"
        />
        <q-input
          filled
          dense
          v-model="toSave.descricaoconta"
          label="Descrição"
          hint="Descrição do Plano de Contas"
          hide-underline="true"
        />
        <q-input
          filled
          dense
          v-model="toSave.analitico"
          label="Analítico"
          hint="Analíico do Plano de Conta"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o analítico do plano de conta']"
        />
        <q-input
          filled
          dense
          v-model="toSave.tipoconta"
          label="Tipo"
          hint="Tipo do Plano de Conta"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o tipo do plano de conta']"
        />
        <q-input
          filled
          dense
          prefix="R$"
          v-model="toSave.saldoconta"
          label="Saldo"
          hint="Saldo do Plano de Conta"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite o saldo do plano de conta']"
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
            <th scope="col">Número</th>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>
            <th scope="col">Analítico</th>
            <th scope="col">Tipo</th>
            <th scope="col">Saldo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(planoConta, keyRegistro) in planoContas" :key="keyRegistro">
            <td data-label="Ação Reg"> <q-checkbox  v-bind:val="planoConta.nconta" v-model="checkReg"/> </td>
            <td data-label="Número" v-if="planoConta.nconta === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número" v-else> {{ planoConta.nconta }} </td>
            <td data-label="Código" v-if="planoConta.codconta === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Código" v-else> {{ planoConta.codconta }} </td>
            <td data-label="Descrição" v-if="planoConta.descricaoconta === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Descrição" v-else> {{ (planoConta.descricaoconta) }} </td>
            <td data-label="Observação Reg" v-if="planoConta.analitico === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Observação Reg" v-else> {{ planoConta.analitico }} </td>
            <td data-label="Descrição Reg" v-if="planoConta.tipoconta === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Descrição Reg" v-else> {{ planoConta.tipoconta }} </td>
            <td data-label="Descrição Reg" v-if="planoConta.saldoconta === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Descrição Reg" v-else> {{ planoConta.saldoconta }} </td>
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
      planoContas: { data: [] },
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
      window.axios.get(`${process.env.API}/planocontas`, { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.planoContas = res.data
      })
    },
    remove (id) {
      if (confirm('Você tem certeza que deseja apagar?')) {
        window.axios.delete(`${process.env.API}/planocontas/` + id, { headers: { 'x-access-token': this.token.tokenUser } })
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
      window.axios.post(`${process.env.API}/planocontas`, this.toSave, { headers: { 'x-access-token': this.token.tokenUser } })
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
      window.axios.put(`${process.env.API}/planocontas/` + this.toSave.nconta, this.toSave, { headers: { 'x-access-token': this.token.tokenUser } })
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
      const campos = this.planoContas
      const campoId = campos.find(obj => obj.nconta === id)
      this.toSave = campoId
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
