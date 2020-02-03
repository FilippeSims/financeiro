var db = require('../pg/config')

/* GET  */
function saldoTotal(callback){
    db.pool.query('SELECT SUM(saldoconta) FROM planocontas', function(err, res) {
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    saldoTotal(function (err, saldo) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(saldo))
        }
    })
}