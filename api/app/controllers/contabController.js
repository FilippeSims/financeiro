var db = require('../pg/config')

/* GET  */
function todosContab(callback){
    db.pool.query('SELECT * FROM contab', function(err, res) {
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    todosContab(function (err, contab) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(contab))
        }
    })
}
/* FIM GET */

/* POST */
function criaPagar(nlanc, valor, data, forma, obs, pago, formaPNome, formaPBandeira, formaPEmissor, vencimento, callback){
    db.pool.query('INSERT INTO pagar (nlanc, vlrpagar, dtpagar, nformapagar, obspagar, pagopagar, nomeforma, bandeiraforma, emissorforma, vencimentoforma) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [nlanc, valor, data, forma, obs, pago, formaPNome, formaPBandeira, formaPEmissor, vencimento], function(err, res){
        console.log(err, res)
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows[0])
        }
    })
}

exports.post = (req, res) =>{
    const nlanc = req.body.nlanc
    const vlrlanc = req.body.vlrlanc

    const obspagar = req.body.obspagar

    const formaP = req.body.formaP.label
    const formaPNome = req.body.formaP.nomeForma
    const formaPBandeira = req.body.formaP.bandeira
    const formaPEmissor = req.body.formaP.emissor
    const vencimento = req.body.formaP.vencimento
    const nparcelas = req.body.nparcelas
    if(formaP === 'Dinheiro' || formaP === 'Cheque'){
        for(repetir = 0; repetir < nparcelas; repetir++){
            let date = new Date()
            let newDate = new Date(date.setMonth(date.getMonth() + (repetir + 1)))
            let valorParcela = vlrlanc / nparcelas
            criaPagar(nlanc, valorParcela, newDate, formaP, obspagar, 'Não', formaPNome, formaPBandeira, formaPEmissor, vencimento, function(err, result){
                return result
            })
        }
    } else {
        let repetir
        for(repetir = 0; repetir < nparcelas; repetir++){
            let date = new Date()
            let novoDia = new Date(date.setDate(vencimento))
            let newDate = new Date(novoDia.setMonth(novoDia.getMonth() + (repetir + 1)))
            let valorParcela = vlrlanc / nparcelas
            criaPagar(nlanc, valorParcela, newDate, formaP, obspagar, 'Não', formaPNome, formaPBandeira, formaPEmissor, vencimento, function(err, result){
               return result
            })
        }
    }
    res.status(200).json({ color: 'green', icon: 'mood', msg: 'Pagamentos enviados com sucesso!' })
}
/* FIM POST*/

/* DELETE */
function deletePagar(id, callback){
    db.pool.query(`DELETE FROM pagar WHERE n_pagar in (${id})`, function(err, res){
        if(err){
            callback(err)
        } else{
            callback(null)
        }
    })
}

exports.delete = (req, res) =>{
    const id = req.params.id
    const arrayId = id.split(/\s*,\s*/)
    deletePagar(arrayId, function(err){
        if(err){
            res.sendStatus(500)
        } else{
            res.sendStatus(204)
        }
    })
}
/* FIM DELETE */

/* PUT */
function updatePagar(n, nlanc, valor, data, nformapagar, obspagar, pagopagar, callback){
    db.pool.query(`UPDATE pagar SET nlanc = '${nlanc}', vlrpagar = '${valor}', dtpagar = '${data}', nformapagar = '${nformapagar}', obspagar = '${obspagar}', pagopagar = '${pagopagar}' WHERE n_pagar = ${n} RETURNING *`, function(err, res){
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

function updateSemRegPagar(n, valor, data, nformapagar, obspagar, pagopagar, callback){
    db.pool.query(`UPDATE pagar SET vlrpagar = '${valor}', dtpagar = '${data}', nformapagar = '${nformapagar}', obspagar = '${obspagar}', pagopagar = '${pagopagar}' WHERE n_pagar = ${n} RETURNING *`, function(err, res){
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}


exports.put = (req, res) =>{
    const n = req.params.id
    const nlanc = req.body.nlanc
    const vlrpagar = req.body.vlrpagar
    const dtpagar= req.body.dtpagar
    const nformapagar = req.body.nformapagar
    const obspagar = req.body.obspagar
    const pagopagar = req.body.pagopagar
    if(nlanc){
        updatePagar(n, nlanc, vlrpagar, dtpagar, nformapagar, obspagar, pagopagar, function(err){
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    }else {
        updateSemRegPagar(n, vlrpagar, dtpagar, nformapagar, obspagar, pagopagar, function(err){
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    }

}
/* FIM PUT */