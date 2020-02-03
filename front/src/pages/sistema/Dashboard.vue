<template>
  <q-page>
    <div class="q-pa-md doc-container">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" to="/sistema" />
    </q-breadcrumbs>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-card class="balance-dash q-mt-md">
            <q-card-section>
              <h5>Saldo total</h5>
              <h4>R$ 0</h4>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="balance-dash q-mt-md">
            <q-card-section>
              <h5>Lançamentos Pagos</h5>
              <h4>R$ 0,00</h4>
              <q-btn dense color="primary" class="q-mt-xs" label="Ver detalhes"/>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="balance-dash q-mt-md">
            <q-card-section>
              <h5>Pagamentos futuros</h5>
              <h4>R$ 0,00</h4>
              <q-btn dense color="primary" class="q-mt-sm" label="Ver detalhes"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-sm q-mt-md">
      <q-input v-model="date" filled type="date" class="q-mb-md"/>
      <div class="q-gutter-sm">
        <q-radio v-model="showDash" val="lancs" label="Lançamentos" />
        <q-radio v-model="showDash" val="regs" label="Registros" />
      </div>
      <table v-if="showDash === 'lancs'">
        <thead>
          <tr>
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
            <td data-label="Número Reg" v-if="lanc.regn === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Reg" v-else>{{ lanc.regn }}</td>
            <td data-label="Número Reg" v-if="lanc.nlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Número Lanc" v-else>{{ lanc.nlanc }}</td>
            <td data-label="Número Reg" v-if="lanc.vlrlanc === null"><q-badge class="q-ml-sm" color="red">NULL</q-badge></td>
            <td data-label="Valor Lanc" v-else> {{ 'R$ ' + lanc.vlrlanc }} </td>
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
      <table v-if="showDash === 'regs'">
        <thead>
          <tr>
            <th scope="col">Número Registro</th>
            <th scope="col">Data Registro</th>
            <th scope="col">Valor Registro</th>
            <th scope="col">Observação Registro</th>
            <th scope="col">Descrição Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registro, keyRegistro) in registros" :key="keyRegistro">
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
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      lancs: { data: [] },
      registros: { data: [] },
      saldo: { data: [] },
      showDash: 'lancs',
      date: ''
    }
  },
  methods: {
    formatPrice (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    getLancs () {
      window.axios.get(`${process.env.API}/lanc`).then(res => {
        this.lancs = res.data
      })
    },
    getRegs () {
      window.axios.get(`${process.env.API}/registro`).then(res => {
        this.registros = res.data
      })
    }
  },
  mounted () {
    this.getLancs()
    this.getRegs()
  }
}
</script>
