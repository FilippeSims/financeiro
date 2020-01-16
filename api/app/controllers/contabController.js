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
    var data = new Date()
    var nlanc = req.body.nlanc
    if(req.body.qtd){
        var qtd = req.body.qtd.toString()
    }
    var obsContab = req.body.obsContab
    if(req.body.qtd){
        for(repetir = 0; repetir <qtd; repetir ++){
            somaRepetir = (repetir + 1)
            const nconta = req.body['planoConta' + somaRepetir]
            const tipoContab = req.body['tipoContab' + somaRepetir].value
            const valor = req.body['vlrlanc' + somaRepetir]
            criaContab(data, nlanc, nconta, tipoContab, valor, obsContab, function(err, contab){
            })
        }
        res.status(200).json({ color: 'green', icon: 'mood', msg: 'Operação realizada com sucesso!' })
    } else {
        const nconta = req.body.nconta
        const tipoContab = req.body.tipocontab
        const valor = req.body.valorcontab
        const obsContab = req.body.obscontab
        criaContab(data, nlanc, nconta, tipoContab, valor, obsContab, function(err, contab){
            if(err){
                res.status(200).json({ color: 'red', icon: 'error', msg: 'Erro!' })
            } else{
                res.status(200).json({ color: 'green', icon: 'mood', msg: 'Operação realizada com sucesso!' })
            }
        })
    }
}
/* FIM POST*/

/* DELETE */
function deleteContab(id, callback){
    db.pool.query(`DELETE FROM contab WHERE ncontab in (${id})`, function(err, res){
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
    deleteContab(arrayId, function(err){
        if(err){
            res.sendStatus(500)
        } else{
            res.sendStatus(204)
        }
    })
}
/* FIM DELETE */

/* PUT */
function updateContab(ncontab, datacontab, nlanc, nconta, tipocontab, valorcontab, obscontab, callback){
    db.pool.query(`UPDATE contab SET datacontab = '${datacontab}', nlanc = '${nlanc}', nconta = '${nconta}', tipocontab = '${tipocontab}', valorcontab = '${valorcontab}', obscontab = '${obscontab}' WHERE ncontab = ${ncontab} RETURNING *`, function(err, res){
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

exports.put = (req, res) =>{
    const ncontab = req.params.id
    const datacontab = req.body.datacontab
    const nlanc = req.body.nlanc
    const nconta= req.body.nconta
    const tipocontab = req.body.tipocontab
    const valorcontab = req.body.valorcontab
    const obscontab = req.body.obscontab
        updateContab(ncontab, datacontab, nlanc, nconta, tipocontab, valorcontab, obscontab, function(err){
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
}
/* FIM PUT */