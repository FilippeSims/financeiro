<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/sistema" />
      <q-breadcrumbs-el label="Lançamentos" icon="widgets" to="/sistema/lanc" />
    </q-breadcrumbs>
    <div id="pagar" v-if="pagarStatus === true">
      <div id="tituloForm" class="q-mt-sm" v-if="pagarStatus === true">
        <b>Pagar</b>
      </div>
      <q-form @submit.prevent="pagar()" class="q-gutter-md q-mt-sm">
        <q-input dense filled label="Número lançamento" v-model="toSave.nlanc"/>
        <q-input dense filled prefix="R$" label="Valor" hint="Valor do lançamento" v-model="toSave.vlrlanc" />
        <q-input filled dense label="Observação" hint="Observação do registro" hide-underline="true" type="textarea" rows="2" v-model="toSave.obspagar"/>
        <q-select dense filled label="Forma de pagamento" hint="Forma de Pagamento" :options="optionsFormaP" v-model="toSave.formaP"/>
        <q-input dense filled label="Parcelas" hint="Número de Parcelas" lazy-rules :rules="[ val => val && val.length > 0 || 'Por favor digite um número de parcelas!', val => val !== '0' || 'O número de parcelas não pode ser 0!']" v-model="toSave.nparcelas"/>
        <div class="previa" v-if="previaView === true">
          <li class="listReg" v-for="e in parseInt(toSave.nparcelas)" :key="e">
            {{ e + 'x: ' + formatPrice(toSave.vlrlanc / toSave.nparcelas) + ' | ' + dataHoje(toSave.formaP.vencimento, e) }}
          </li>
          <q-toggle v-model="previewConfere" checked-icon="check" unchecked-icon="clear" color="green" label="Você conferiu os dados?" keep-color/>
          <br>
          <q-btn type="submit" color="green" icon="send" class="q-mt-sm float-left" unelevated dense disabled v-if="previewConfere === false"/>
          <q-btn type="submit" color="green" icon="send" class="q-mt-sm float-left" unelevated dense v-if="previewConfere === true" />
        </div>
        <q-btn type="submit" color="green" v-on:click="previaView = true" icon="visibility" class="q-mt-sm float-left" unelevated dense v-if="previaView === false"/>
      </q-form>
    </div>
    <div id="contab" v-if="contabStatus === true">
      <div id="tituloForm" class="q-mt-sm" v-if="contabStatus === true">
        <b>Contab</b>
      </div>
      {{ toSave }}
      <q-form @submit.prevent="contab()" class="q-gutter-md q-mt-sm">
        <q-input dense filled label="Número lançamento" v-model="toSave.nlanc" disable/>
        <q-input dense filled label="Valor lançamento" v-model="toSave.vlrlanc"/>
        <q-input type="number" dense filled label="Número lançamento" v-model="quantidadeForm"/>
          <div class="q-gutter-xm row" v-for="quantidade in parseInt(quantidadeForm)" :key="quantidade">
            <q-select dense class="selectContab q-mr-sm" filled label="Número Plano de Conta" hint="Número do Plano de Conta" :options="planoConta" option-disable="inactive" option-value="nconta" option-label="descricaoconta" emit-value map-options v-model="toSave['planoConta' + quantidade]"/>
            <q-select dense class="selectContab2" filled label="Tipo Contab" hint="Tipo de Contabilização" :options="optionTipoContab" v-model="toSave['tipoContab' + quantidade]"/>
            <q-input dense class="selectContab q-ml-sm" filled prefix="R$" label="Valor" hint="Valor do lançamento" v-model="toSave['vlrlanc' + quantidade]" />
          </div>
        <q-input filled dense label="Observação" hint="Observação do registro" hide-underline="true" type="textarea" rows="2" v-model="toSave.obsContab"/>
        <q-input dense filled label="Verificação Contab" v-model="verificacaoContab"/>
        <q-btn color="green" icon="help" v-on:click="testando(quantidadeForm, toSave.vlrlanc)"  class="q-mt-sm q-mb-sm float-left" unelevated dense/>
        <q-btn type="submit" color="green" icon="send" class="q-mt-sm q-mb-sm float-left" unelevated dense/>
      </q-form>
    </div>
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
      <q-btn class="q-mb-sm float-right" color="green" icon="add_circle" v-on:click="inserirShow(true)" v-if="inserirForm === false && pagarStatus === false" unelevated dense/>
      <q-btn class="q-mr-sm float-right" color="red" icon="remove_circle" v-on:click="inserirShow(false), editarShow(false), pagarShow(false)" v-if="inserirForm === true || editarForm === true && checkReg.length != 0" unelevated dense/>
      <q-btn class="q-mr-sm float-right" color="red" icon="delete_forever" v-on:click="remove(checkReg)" v-if="inserirForm === false && checkReg.length > 0 && pagarStatus === false" dense unelevated/>
      <q-btn class="q-mr-sm float-right" color="primary" icon="edit" @click.prevent="toUpdate(checkReg[0])" v-on:click="editarShow(true)" v-if="inserirForm === false && checkReg.length > 0 && checkReg.length < 2 && pagarStatus === false" unelevated dense/>
      <q-btn class="q-mr-sm float-right" color="teal-4" icon="assignment" label="Contab" @click.prevent="toUpdate(checkReg[0])" v-on:click="contabShow(true)" v-if="pagarStatus === false && inserirForm === false && checkReg.length > 0 && checkReg.length < 2" unelevated dense/>
      <q-btn class="q-mr-sm float-right" color="light-green" icon="attach_money" label="pagar" @click.prevent="toUpdate(checkReg[0])" v-on:click="pagarShow(true)" v-if="pagarStatus === false && inserirForm === false && checkReg.length > 0 && checkReg.length < 2" unelevated dense/>
      <q-btn class="q-mb-sm q-mt-sm float-right" color="red" icon="remove_circle" v-on:click="pagarShow(false)" v-if="pagarStatus === true" unelevated dense/>
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
            <td data-label="Valor Lanc" v-else> {{ 'R$ ' + formatPrice2(lanc.vlrlanc) }} </td>
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
import moment from 'moment'
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
      pagarStatus: false,
      previaView: false,
      previewConfere: false,
      contabStatus: false,
      pageNumber: 0,
      quantidadeForm: 2,
      planoConta: { data: [] },
      verificacaoContab: 0,
      optionTipoContab:
      [
        {
          value: 'cred',
          label: 'Crédito'
        },
        {
          value: 'deb',
          label: 'Débito'
        }
      ],
      optionsFormaP: [
        {
          label: 'Dinheiro',
          value: 1,
          nomeForma: 'Dinheiro'
        },
        {
          label: 'Cheque',
          value: 2,
          nomeForma: 'Cheque'
        },
        {
          label: 'Cartão Master - BB - Vencimento: 03',
          value: 3,
          nomeForma: 'Cartão de Crédito',
          bandeira: 'Master',
          emissor: 'Banco do Brasil',
          final: '03',
          vencimento: '03',
          melhorVencimento: '21'
        },
        {
          label: 'Cartão Visa - BB - Vencimento: 22',
          value: 4,
          nomeForma: 'Cartão de Crédito',
          bandeira: 'Visa',
          emissor: 'Banco do Brasil',
          final: '22',
          vencimento: '22',
          melhorVencimento: '10'
        },
        {
          label: 'Cartão Elo - BB - 0992 - Vencimento: 10',
          value: 5,
          nomeForma: 'Cartão de Crédito',
          bandeira: 'Mastercard',
          emissor: 'Nubank',
          final: '4419',
          vencimento: '10',
          melhorVencimento: '30'
        }
      ],
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
    pagar () {
      this.criarPagar()
    },
    contab () {
      this.criarContab()
    },
    inserirShow (status) {
      this.inserirForm = status
      this.toSave = {}
      this.checkReg = []
    },
    editarShow (status) {
      this.editarForm = status
    },
    pagarShow (status) {
      this.pagarStatus = status
      if (status === false) {
        this.toSave = {}
        this.checkReg = []
      }
    },
    contabShow (status) {
      this.contabStatus = status
      if (status === false) {
        this.toSave = {}
        this.checkReg = []
      }
    },
    // somaContab (qtd) {
    //   var repetir = 0
    //   var soma = 0
    //   for (repetir = 0; repetir < qtd; repetir++) {
    //     const somaRepetir = (repetir + 1)
    //     soma += parseFloat(this.toSave['vlrlanc' + somaRepetir])
    //   }
    //   console.log(soma)
    // },
    planoCont (qtd) {
      var repetir = 0
      var plano = 0
      var tipo = 0
      var valor = 0
      var container = []
      for (repetir = 0; repetir < qtd; repetir++) {
        const somaRepetir = (repetir + 1)
        plano = this.toSave['planoConta' + somaRepetir]
        tipo = this.toSave['tipoContab' + somaRepetir].value
        valor = this.toSave['vlrlanc' + somaRepetir]
        var newArray = {}
        newArray = [
          { planoCon: plano },
          { tipoCon: tipo },
          { val: valor }
        ]
        container.push(newArray)
      }
      return container
    },
    buscarTipoPlano (qtd) {
      var repetir = 0
      var container = []
      var planoCon = this.planoCont(qtd)
      for (repetir = 0; repetir < qtd; repetir++) {
        const n = planoCon[repetir][0]
        var json = this.planoConta
        const findTipoPlanoConta = json.filter(x => x.nconta === n.planoCon).map(x => x.tipoconta)
        const arrayTipoPlanoConta = [
          { tipoPlano: findTipoPlanoConta }
        ]
        container.push(arrayTipoPlanoConta)
      }
      return container
    },
    testando (qtd, valorLanc) {
      var planoCon = this.planoCont(qtd)
      var tipoCon = this.buscarTipoPlano(qtd)
      var repetir = 0
      var somaDCred = 0
      var somaDDeb = 0
      var somaCCred = 0
      var somaCDeb = 0
      var saldo = []
      for (repetir = 0; repetir < qtd; repetir++) {
        var cond = tipoCon[repetir][0].tipoPlano[0]
        var tipo = planoCon[repetir][1].tipoCon
        // D = DEVEDORA
        // C = CREDORA
        // CRED = CRÉDITO
        // DEB = DÉBITO
        if (cond === 'd') {
          // D / CRED -
          if (tipo === 'cred') {
            const somaRepetir = (repetir + 1)
            somaDCred += parseFloat(this.toSave['vlrlanc' + somaRepetir])
          }
          if (tipo === 'deb') {
            const somaRepetir = (repetir + 1)
            somaDDeb += parseFloat(this.toSave['vlrlanc' + somaRepetir])
          }
        }
        if (cond === 'c') {
          // D / CRED +
          if (tipo === 'cred') {
            const somaRepetir = (repetir + 1)
            somaCCred += parseFloat(this.toSave['vlrlanc' + somaRepetir])
          }
          if (tipo === 'deb') {
            const somaRepetir = (repetir + 1)
            somaCDeb += parseFloat(this.toSave['vlrlanc' + somaRepetir])
          }
        }
      }
      var somaDevedor = (somaDCred - somaDDeb)
      var somaCredor = (somaCCred - somaCDeb)
      var verificaLancContab = (valorLanc === somaDevedor)
      var resultadoContab = (somaDevedor + somaCredor)
      var mensagem = []

      for (repetir = 0; repetir < qtd; repetir++) {
        var cond2 = tipoCon[repetir][0].tipoPlano[0]
        var tipo2 = planoCon[repetir][1].tipoCon
        if (cond2 === 'd' && tipo2 === 'cred') {
          const n = planoCon[repetir][0]
          var json = this.planoConta
          const findSaldoConta = json.filter(x => x.nconta === n.planoCon).map(x => x.saldoconta)
          const findDescricao = json.filter(x => x.nconta === n.planoCon).map(x => x.descricaoconta)
          const arraySaldoConta = [
            { saldoconta: findSaldoConta },
            { descricaoconta: findDescricao }
          ]
          saldo.push(arraySaldoConta)
        }
      }
      var countArraySaldo = saldo.length
      var valorBate = false
      var valorBate1 = false
      var saldoOk = false
      var verificaSaldo = 0
      var verificaDescricao = ''
      var valorDigitado = 0
      for (repetir = 0; repetir < countArraySaldo; repetir++) {
        const somaRepetir = (repetir + 1)
        verificaSaldo = saldo[repetir][0].saldoconta[0]
        verificaDescricao = saldo[repetir][1].descricaoconta[0]
        valorDigitado = parseFloat(this.toSave['vlrlanc' + somaRepetir])
        if (valorDigitado <= verificaSaldo) {
          valorBate = true
          valorBate1 = true
        } else {
          valorBate = true
          valorBate1 = false
        }
        if (valorBate === true && valorBate1 === true) {
          saldoOk = true
        } else {
          saldoOk = false
          mensagem = [
            { color: 'warning' },
            { textColor: 'black' },
            { icon: 'warning' },
            { msg: 'Você não tem saldo suficiente em ' + verificaDescricao + '!' }
          ]
          this.$q.notify({
            color: mensagem[0].color,
            timeout: 5000,
            textColor: mensagem[1].textColor,
            icon: mensagem[2].icon,
            message: mensagem[3].msg,
            position: 'top'
          })
        }
      }
      if (saldoOk === true) {
        if (verificaLancContab === true) {
          if (resultadoContab === 0) {
            this.toSave.qtd = this.quantidadeForm
            window.axios.post(`${process.env.API}/contab`, this.toSave)
              .then(() => {
                this.$q.notify({
                  color: 'green',
                  timeout: 5000,
                  textColor: 'white',
                  icon: 'mood',
                  message: 'Operação realizada com sucesso!',
                  position: 'top'
                })
              })
          } else {
            this.$q.notify({
              color: 'warning',
              timeout: 5000,
              textColor: 'black',
              icon: 'warning',
              message: 'Verique os valores da conta devedor e credor!',
              position: 'top'
            })
          }
        } else {
          this.$q.notify({
            color: 'warning',
            timeout: 5000,
            textColor: 'black',
            icon: 'warning',
            message: 'O valor está diferente do que o lançamento!',
            position: 'top'
          })
        }
      }
    },
    formatPrice (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatPrice2 (value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    dataHoje (dia, e) {
      let hoje = new Date()
      let novoDia = new Date(hoje.setDate(dia))
      if (!dia) {
        let hoje = new Date()
        let newMes = new Date(hoje.setMonth(hoje.getMonth() + e))
        return moment(newMes).format('DD/MM/YYYY')
      } else {
        let newDate = new Date(novoDia.setMonth(hoje.getMonth() + e))
        return moment(newDate).format('DD/MM/YYYY')
      }
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
    getContab () {
      window.axios.get(`${process.env.API}/planocontas`, { headers: { 'x-access-token': this.token.tokenUser } }).then(res => {
        this.planoConta = res.data
      })
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
    },
    criarPagar () {
      window.axios.post(`${process.env.API}/pagar`, this.toSave)
        .then(() => {
          this.toSave = {}
          this.inserirForm = false
          this.editarForm = false
          this.pagarStatus = false
          this.previaView = false
          this.previewConfere = false
          this.getList()
          this.$q.notify({
            color: 'green',
            timeout: 1000,
            textColor: 'white',
            icon: 'tag_faces',
            message: 'Pagamentos enviados com sucesso',
            position: 'top'
          })
        })
    },
    criarContab () {
      const obj1 = this.toSave

      const obj2 = {
        qtd: this.quantidadeForm
      }
      const obj = Object.assign({}, obj1, obj2)
      window.axios.post(`${process.env.API}/contab`, obj)
        .then(() => {
          this.toSave = {}
          this.inserirForm = false
          this.editarForm = false
          this.pagarStatus = false
          this.previaView = false
          this.previewConfere = false
          this.getList()
          this.$q.notify({
            color: 'green',
            timeout: 1000,
            textColor: 'white',
            icon: 'tag_faces',
            message: 'Comtab enviados com sucesso',
            position: 'top'
          })
        })
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
    this.getContab()
  }
}
</script>
