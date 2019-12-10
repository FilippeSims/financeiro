<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Pagar" icon="widgets" to="/sistema/pagar" />
    </q-breadcrumbs>
    <div id="formLanc" v-if="inserirForm === true || editarForm === true && checkReg.length < 2 && checkReg.length != 0">
    <div id="tituloForm" v-if="inserirForm === true">
      <b>Inserir registro</b>
    </div>
    <div id="tituloForm" v-if="editarForm === true && checkReg.length < 2 && checkReg.length != 0" >
      <b>Editar registro</b>
    </div>
      <q-toggle v-model="toggleFormReg" checked-icon="check" unchecked-icon="clear" color="green" label="Existe registro?" keep-color/>
      <div id="registroLanc" v-if="toggleFormReg === true">
        <q-form @submit.prevent="save()" class="q-gutter-md">
          <div class="paginacao q-mb-sm">
            <q-btn
              :disabled="pageNumber === 0"
              v-on:click="pageNumber -= 1"
              icon="navigate_before"
              color="primary"
              unelevated
              dense
            />
            <q-btn
              :disabled="pageNumber >= pageCount -1"
              v-on:click="pageNumber += 1"
              class="q-ml-sm"
              icon="navigate_next"
              color="primary"
              unelevated
              dense
            />
          </div>
          <li class="listReg" v-for="(lanc, keyRegistro) in paginatedData" :key="keyRegistro" @click.prevent="lancn(lanc.nlanc)">
            <q-btn round size="8px" color="positive" icon="check" outline unelevated/>
            <q-badge class="q-ml-sm" color="light-blue-4">
             Número: {{ lanc.nlanc }}
            </q-badge>
            <q-badge class="q-ml-sm" color="pink-4">
              Data: {{ lanc.dtlanc | formatDate }}
            </q-badge>
            <q-badge class="q-ml-sm" color="orange-5">
              Valor: {{ lanc.vlrlanc }}
            </q-badge>
          </li>
          <q-input dense filled label="Número Registro" hint="Número do registro" v-model="toSave.nlanc" disable/>
          <q-input dense filled label="Valor" hint="Valor do lançamento" prefix="R$" mask="#.##" reverse-fill-mask v-model="toSave.vlrlanc" />
          <q-input dense filled v-model="toSave.dtlanc" label="Data" hint="Data do pagar" />
          <q-input dense filled v-model="toSave.nformapagar" label="Forma de pagamento" hint="Forma de pagamento" />
          <q-input dense filled v-model="toSave.obspagar" label="Observação" hint="Observação do pagar" />
          <q-input dense filled v-model="toSave.pagopagar" label="Pago" hint="Pago?" />
          <div>
            <q-btn type="submit" color="green" icon="send" class="q-mb-sm float-left" unelevated />
          </div>
        </q-form>
      </div>
      <div id="semRegistroLanc" v-else>
        <q-form @submit.prevent="save()" class="q-gutter-md">
          <q-input dense filled v-model="toSave.nlanc" label="Número lançamento" hint="Número do lançamento" v-if="editarForm === true" />
          <q-input dense filled prefix="R$" mask="#.##" reverse-fill-mask v-model="toSave.vlrpagar" label="Valor" hint="Valor do Pagar" />
          <q-date v-model="toSave.dtpagar" minimal/>
          <q-input dense filled v-model="toSave.nformapagar" label="Objeto" hint="Forma de pagamento" />
          <q-input dense filled v-model="toSave.obspagar" label="Observação" hint="Observação do pagar" />
          <q-input dense filled v-model="toSave.pagopagar" label="Pago" hint="Pago?" />
        <div>
          <q-btn type="submit" color="green" icon="send" class="q-mb-sm float-left" unelevated />
        </div>
        </q-form>
      </div>
      </div>
      <q-btn class="q-mb-sm float-right" color="green" icon="add_circle" v-on:click="inserirShow(true)" v-if="inserirForm === false" unelevated/>
      <q-btn class="q-mr-sm float-right" color="red" icon="remove_circle" v-on:click="inserirShow(false), editarShow(false)" v-if="inserirForm === true || editarForm === true && checkReg.length != 0" unelevated/>
      <q-btn class="q-mr-sm float-right" color="red" icon="delete_forever" v-on:click="remove(checkReg)" v-if="inserirForm === false && checkReg.length > 0" unelevated/>
      <q-btn class="q-mr-sm float-right" color="primary" icon="edit" @click.prevent="toUpdate(checkReg[0])" v-on:click="editarShow(true)" v-if="inserirForm === false && checkReg.length > 0 && checkReg.length < 2" unelevated/>
      <table>
        <thead>
          <tr>
            <th scope="col">Ação</th>
            <th scope="col">Número Lanc</th>
            <th scope="col">Número Pagar</th>
            <th scope="col">Valor Pagar</th>
            <th scope="col">Data Pagar</th>
            <th scope="col">Forma</th>
            <th scope="col">Obs Pagar</th>
            <th scope="col">Pago</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(paga, keyPagar) in listPagar" :key="keyPagar">
            <td data-label="Ação">
              <q-checkbox v-bind:val="paga.n_pagar" v-model="checkReg" />
            </td>
            <td data-label="Número Lanc" v-if="paga.nlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Lanc" v-else>{{ paga.nlanc }}</td>
            <td data-label="Número Pagar" v-if="paga.n_pagar === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Pagar" v-else>{{ paga.n_pagar }}</td>
            <td data-label="Valor Pagar" v-if="paga.vlrpagar === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Valor Pagar" v-else> {{ 'R$ ' + formatPrice(paga.vlrpagar) }} </td>
            <td data-label="Data Pagar" v-if="paga.dtpagar === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Data Pagar" v-else>{{ paga.dtpagar | formatDate }}</td>
            <td data-label="Forma" v-if="paga.nformapagar === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Forma" v-else>{{ paga.nformapagar }}</td>
            <td data-label="Descrição Pagar" v-if="paga.obspagar === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Descrição Pagar" v-else>{{ paga.obspagar }}</td>
            <td data-label="Número Pagar" v-if="paga.pagopagar === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Pagar" v-else>{{ paga.pagopagar }}</td>
          </tr>
        </tbody>
      </table>
  </q-page>
</template>

<script>
let tokenUser = localStorage.getItem('token')
import _ from 'lodash'
export default {
  data () {
    return {
      toggleFormReg: false,
      checkReg: [ ],
      checknRegLanc: [ ],
      lancs: { data: [] },
      pagar: { data: [] },
      toSave: {},
      inserirForm: false,
      editarForm: false,
      updateStatus: false,
      pageNumber: 0,
      pagination: {
        descending: false,
        page: 2,
        rowsPerPage: 5
      },
      token: { tokenUser }
    }
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 3
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
    lancn (n) {
      const lanc = this.lancs
      const lancPorNumero = lanc.find(obj => obj.nlanc === n)
      this.toSave = lancPorNumero
    },
    getRegistro () {
      window.axios.get(`${process.env.API}/lanc`, { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.lancs = res.data
      })
    },
    nextReg () {
      this.pageNumber++
      console.log('next')
    },
    prevPage () {
      this.pageNumber--
      console.log('prev')
    },
    getList () {
      window.axios.get(`${process.env.API}/pagar`, { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.pagar = res.data
      })
    },
    remove (id) {
      if (confirm('Você tem certeza que deseja apagar?')) {
        window.axios.delete(`${process.env.API}/pagar/` + id, { headers: { 'x-access-token': this.token.tokenUser } })
          .then(() => {
            this.getList()
            this.checkReg = []
          })
      }
    },
    create () {
      window.axios.post(`${process.env.API}/pagar`, this.toSave)
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
      window.axios.put(`${process.env.API}/pagar/` + this.toSave.n_pagar, this.toSave, { headers: { 'x-access-token': this.token.tokenUser } })
        .then(() => {
          this.updateStatus = false
          this.toSave = {}
          this.inserirForm = false
          this.editarForm = false
          this.checkReg = []
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
      const campos = this.pagar
      const campoId = campos.find(obj => obj.n_pagar === id)
      this.toSave = campoId
    }
  },
  computed: {
    pageCount () {
      let l = this.lancs.length
      let s = this.size
      return Math.ceil(l / s)
    },
    paginatedData () {
      const start = this.pageNumber * this.size,
        end = start + this.size
      return this.lancs
        .slice(start, end)
    },
    listPagar () {
      return _.orderBy(this.pagar, 'n_pagar')
    }
  },
  mounted () {
    this.getRegistro()
    this.getList()
  }
}
</script>
