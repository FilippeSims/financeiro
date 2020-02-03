var db = require('../pg/config')

/* GET  */
function todosPlanoConta(callback){
    db.pool.query('SELECT * FROM planocontas ORDER BY nconta ASC', function(err, res) {
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    todosPlanoConta(function (err, planocontas) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(planocontas))
        }
    })
}
/* FIM GET */

/* POST */
function criarPlanoConta(codconta, descricao, analitico, tipo, saldo, callback){
    db.pool.query('INSERT INTO planocontas (codconta, descricaoconta, analitico, tipoconta, saldoconta) VALUES ($1, $2, $3, $4, $5) RETURNING *', [codconta, descricao, analitico, tipo, saldo], function(err, res){
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows[0])
        }
    })
}

exports.post = (req, res) =>{
    const codconta = req.body.codconta
    const descricaoconta = req.body.descricaoconta
    const analitico = req.body.analitico
    const tipoconta = req.body.tipoconta
    const saldoconta = req.body.saldoconta
    criarPlanoConta(codconta, descricaoconta, analitico, tipoconta, saldoconta, function(err, planoconta){
        if(err){
            res.sendStatus(500)
        } else{
            res.sendStatus(201)
        }
    })
}
/* FIM POST*/

/* DELETE */
function deletePlanoConta(id, callback){
    db.pool.query(`DELETE FROM planocontas WHERE nconta in (${id})`, function(err, res){
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
    deletePlanoConta(arrayId, function(err){
        if(err){
            error.errorF(err.code, function(err, codeErro){
                if(codeErro = '23503'){
                    res.status(200).json(error.codeMensagem[0])
                } else {
                    res.sendStatus(500)
                }
            })
        } else{
            res.sendStatus(204)
        }
    })
}
/* FIM DELETE */

/* PUT */
function updatePlanoConta(n, codconta, descricaoconta, analitico, tipoconta, saldoconta, callback){
    db.pool.query(`UPDATE planocontas SET codconta = '${codconta}', descricaoconta = '${descricaoconta}', analitico = '${analitico}', tipoconta = '${tipoconta}', saldoconta = '${saldoconta}' WHERE nconta = ${n} RETURNING *`, function(err, res){
        console.log(err)
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

exports.put = (req, res) =>{
    const n = req.params.id
    const codconta = req.body.codconta
    const descricaoconta = req.body.descricaoconta
    const analitico = req.body.analitico
    const tipoconta = req.body.tipoconta
    const saldoconta = req.body.saldoconta
    updatePlanoConta(n, codconta, descricaoconta, analitico, tipoconta, saldoconta, function(err){
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
}
/* FIM PUT */