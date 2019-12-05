<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Lançamentos" icon="widgets" to="/sistema/lanc" />
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
          <li class="listReg" v-for="(registro, keyRegistro) in paginatedData" :key="keyRegistro" @click.prevent="registron(registro.nreg)">
            <q-btn round size="8px" color="positive" icon="check" outline unelevated/>
            <q-badge class="q-ml-sm" color="light-blue-4">
             Número: {{ registro.nreg }}
            </q-badge>
            <q-badge class="q-ml-sm" color="pink-4">
              Data: {{ registro.dtreg | formatDate }}
            </q-badge>
            <q-badge class="q-ml-sm" color="orange-5">
              Valor: {{ registro.valorreg }}
            </q-badge>
          </li>
          <q-input dense filled label="Número Registro" hint="Número do registro" v-model="toSave.nreg" disable/>
          <q-input dense filled prefix="R$" mask="#.##" reverse-fill-mask label="Valor" hint="Valor do lançamento" v-model="toSave.valorreg" />
          <q-input dense filled v-model="toSave.dtreg" label="Data" hint="Data do lançamento" />
          <q-input dense filled v-model="toSave.objlanc" label="Objeto" hint="Objeto do lançamento" />
          <q-input dense filled v-model="toSave.partelanc" label="Parte" hint="Parte do lançamento" />
          <q-input dense filled v-model="toSave.centrocontalanc" label="Centro Contábil" hint="Centro Contábil lançamento" />
          <div>
            <q-btn type="submit" color="green" icon="send" class="q-mb-sm float-left" unelevated />
          </div>
        </q-form>
      </div>
      <div id="semRegistroLanc" v-else>
        <q-form @submit.prevent="save()" class="q-gutter-md">
          <q-input dense filled v-model="toSave.regn" label="Número Registro" hint="Número do Registro" v-if="editarForm === true" />
          <q-input dense filled prefix="R$" mask="#.##" reverse-fill-mask v-model="toSave.vlrlanc" label="Valor" hint="Valor do lançamento" />
          <!-- <q-input filled v-model="toSave.dtlanc" label="Data" hint="Data do lançamento" /> -->
          <q-date v-model="toSave.dtlanc" minimal/>
          <q-input dense filled v-model="toSave.objlanc" label="Objeto" hint="Objeto do lançamento" />
          <q-input dense filled v-model="toSave.partelanc" label="Parte" hint="Parte do lançamento" />
          <q-input dense filled v-model="toSave.centrocontalanc" label="Centro Contábil" hint="Centro Contábil lançamento" />
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
            <th scope="col">Número Reg</th>
            <th scope="col">Número Lanc</th>
            <th scope="col">Valor Lanc</th>
            <th scope="col">Data Lanc</th>
            <th scope="col">Objeto Lanc</th>
            <th scope="col">Descrição Lanc</th>
            <th scope="col">Centro Lanc</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lanc, keyLance) in lancs" :key="keyLance">
            <td data-label="Ação">
              <q-checkbox v-bind:val="lanc.nlanc" v-model="checkReg" />
            </td>
            <td data-label="Número Reg" v-if="lanc.regn === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Reg" v-else>{{ lanc.regn }}</td>
            <td data-label="Número Reg" v-if="lanc.nlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Lanc" v-else>{{ lanc.nlanc }}</td>
            <td data-label="Número Reg" v-if="lanc.vlrlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Valor Lanc" v-else> {{ 'R$ ' + formatPrice(lanc.vlrlanc) }} </td>
            <td data-label="Número Reg" v-if="lanc.dtlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Data Lanc" v-else>{{ lanc.dtlanc | formatDate }}</td>
            <td data-label="Número Reg" v-if="lanc.objlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Objeto Lanc" v-else>{{ lanc.objlanc }}</td>
            <td data-label="Número Reg" v-if="lanc.partelanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Descrição Lanc" v-else>{{ lanc.partelanc }}</td>
            <td data-label="Número Reg" v-if="lanc.centrocontalanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Centro Lanc" v-else>{{ lanc.centrocontalanc }}</td>
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
      toggleFormReg: false,
      checkReg: [ ],
      checknRegLanc: [ ],
      registros: { data: [] },
      lancs: { data: [] },
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
    registron (n) {
      const reg = this.registros
      const regPorNumero = reg.find(obj => obj.nreg === n)
      this.toSave = regPorNumero
    },
    getRegistro () {
      window.axios.get(`${process.env.API}/registro`, { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.registros = res.data
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
      window.axios.get(`${process.env.API}/lanc`, { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.lancs = res.data
      })
    },
    remove (id) {
      if (confirm('Você tem certeza que deseja apagar?')) {
        window.axios.delete(`${process.env.API}/lanc/` + id, { headers: { 'x-access-token': this.token.tokenUser } })
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
      window.axios.post(`${process.env.API}/lanc`, this.toSave, { headers: { 'x-access-token': this.token.tokenUser } })
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
      window.axios.put(`${process.env.API}/lanc/` + this.toSave.nlanc, this.toSave, { headers: { 'x-access-token': this.token.tokenUser } })
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
      const campos = this.lancs
      const campoId = campos.find(obj => obj.nlanc === id)
      this.toSave = campoId
    }
  },
  computed: {
    pageCount () {
      let l = this.registros.length
      let s = this.size
      return Math.ceil(l / s)
    },
    paginatedData () {
      const start = this.pageNumber * this.size,
        end = start + this.size
      return this.registros
        .slice(start, end)
    }
  },
  mounted () {
    this.getRegistro()
    this.getList()
  }
}
</script>
