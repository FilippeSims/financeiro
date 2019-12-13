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