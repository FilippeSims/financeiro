var db = require('../pg/config')
var error = require('../erros')

/* GET  */
function todosRegistros(callback){
    db.pool.query('SELECT * FROM reg', function(err, res) {
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    todosRegistros(function (err, usuarios) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(usuarios))
        }
    })
}
/* FIM GET */

/* POST */
function criarRegistro(data, valor, obs, desc, callback){
    db.pool.query('INSERT INTO reg (dtreg, valorreg, obsreg, descreg) VALUES ($1, $2, $3, $4) RETURNING *', [data, valor, obs, desc], function(err, res){
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows[0])
        }
    })
}

exports.post = (req, res) =>{
    const data = new Date()
    const valor = req.body.valorreg;
    const obs = req.body.obsreg;
    const desc = req.body.descreg;
    criarRegistro(data, valor, obs, desc, function(err, registro){
        if(err){
            res.sendStatus(500)
        } else{
            res.sendStatus(201)
        }
    })
}
/* FIM POST*/

/* DELETE */
function deleteRegistro(id, callback){
    db.pool.query(`DELETE FROM reg WHERE nreg in (${id})`, function(err, res){
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
    deleteRegistro(arrayId, function(err){
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
function updateRegistro(id, data, valor, obs, desc, callback){
    db.pool.query(`UPDATE reg SET dtreg = '${data}', valorreg = ${valor}, obsreg = '${obs}', descreg = '${desc}' WHERE nreg = ${id} RETURNING *`, function(err, res){
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
    const data = new Date().toUTCString()
    const valor = req.body.valorreg
    const obs = req.body.obsreg
    const desc = req.body.descreg
    updateRegistro(n, data, valor, obs, desc, function(err){
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
}
/* FIM PUT */