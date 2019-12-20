var db = require('../pg/config')

/* GET  */
function todosTiposContab(callback){
    db.pool.query('SELECT tipocontab FROM planocontas', function(err, res) {
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    todosTiposContab(function (err, tipo) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(tipo))
        }
    })
}
/* FIM GET */