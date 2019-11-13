var db = require('../pg/config')

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
    
}
/* FIM POST*/

/* DELETE */
function deleteRegistro(id, callback){
    db.pool.query('DELETE FROM reg WHERE nreg = $1', [id], function(err, res){
        if(err){
            callback(err)
        } else{
            callback(null)
        }
    })
}

exports.delete = (req, res) =>{
    
}
/* FIM DELETE */

/* PUT */
function updateRegistro(n, data, valor, obs, desc, callback){
    db.pool.query('UPDATE reg SET dtreg = $1, valorreg = $2, obsreg = $3, descreg = $4 WHERE dtreg = $1 RETURNING *', [n, data, valor, obs, desc], function(err, res){
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

exports.put = (req, res) =>{
    
}
/* FIM PUT */