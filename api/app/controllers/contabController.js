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
function criaContab(data, nlanc, nconta, tipoContab, valor, obsContab, callback){
    db.pool.query('INSERT INTO contab (datacontab, nlanc, nconta, tipocontab, valorcontab, obscontab) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [data, nlanc, nconta, tipoContab, valor, obsContab], function(err, res){
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows[0])
        }
    })
}

exports.post = (req, res) =>{
    const data = new Date().toDateString()
    const nlanc = req.body.nlanc
    const qtd = req.body.qtd
    const obsContab = req.body.obsContab
    for(repetir = 0; repetir < qtd; repetir++){
        somaRepetir = (repetir + 1)
        const nconta = req.body['planoConta' + somaRepetir]
        const tipoContab = req.body['tipoContab' + somaRepetir].value
        const valor = req.body['vlrlanc' + somaRepetir]

        criaContab(data, nlanc, nconta, tipoContab, valor, obsContab, function(err, contab){
            // if(err){

            // } else{
            //     res.status(200).json({ color: 'green', icon: 'mood', msg: 'Operação realizada com sucesso!' })
            // }
        })
    }
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