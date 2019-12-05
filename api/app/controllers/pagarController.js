var db = require('../pg/config')

/* GET  */
function todosLanc(callback){
    db.pool.query('SELECT * FROM pagar', function(err, res) {
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    todosLanc(function (err, pagar) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(pagar))
        }
    })
}
/* FIM GET */

/* POST */
function criaPagar(nlanc, valor, data, forma, obs, pago, callback){
    db.pool.query('INSERT INTO pagar (nlanc, vlrpagar, dtpagar, nformapagar, obspagar, pagopagar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nlanc, valor, data, forma, obs, pago], function(err, res){
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
    const dtlanc = req.body.dtlanc

    const vlrpagar = req.body.vlrpagar
    const dtpagar= req.body.dtpagar
    const nformapagar = req.body.nformapagar
    const obspagar = req.body.obspagar
    const pagopagar = req.body.pagopagar

    if (nlanc){
        if(vlrpagar && dtpagar){
            criaPagar(null, vlrpagar, dtpagar, nformapagar, obspagar, pagopagar, function(err){
                if(err){
                    res.sendStatus(500)
                } else{
                    res.sendStatus(201)
                }
            })
        }else {
            criaPagar(nlanc, vlrlanc, dtlanc, nformapagar, obspagar, pagopagar, function(err){
                if(err){
                    res.sendStatus(500)
                } else{
                    res.sendStatus(201)
                }
            })
        }
    } else{
        criaPagar(null, vlrpagar, dtpagar, nformapagar, obspagar, pagopagar, function(err){
            if(err){
                res.sendStatus(500)
            } else{
                res.sendStatus(201)
            }
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