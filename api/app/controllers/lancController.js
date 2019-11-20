var db = require('../pg/config')

/* GET  */
function todosLanc(callback){
    db.pool.query('SELECT * FROM lanc', function(err, res) {
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    todosLanc(function (err, usuarios) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(usuarios))
        }
    })
}
/* FIM GET */

/* POST */
function criarLanc(nreg, valor, data, obj, parte, centrocontalanc, callback){
    db.pool.query('INSERT INTO lanc (regn, vlrlanc, dtlanc, objlanc, partelanc, centrocontalanc) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nreg, valor, data, obj, parte, centrocontalanc], function(err, res){
        console.log(err)
        if(err){
            callback(err, null)
        } else{
            callback(null, res.rows[0])
        }
    })
}

exports.post = (req, res) =>{
    const nreg = req.body.nreg
    const valorreg = req.body.valorreg
    const dtreg = req.body.dtreg

    const vlrlanc = req.body.vlrlanc
    const dtlanc = req.body.dtlanc
    const objlanc = req.body.objlanc
    const partelanc = req.body.partelanc
    const centrocontalanc = req.body.centrocontalanc
    if (nreg){
        if(vlrlanc && dtlanc){
            criarLanc(null, vlrlanc, dtlanc, objlanc, partelanc, centrocontalanc, function(err){
                if(err){
                    res.sendStatus(500)
                } else{
                    res.sendStatus(201)
                }
            })
        }else {
            criarLanc(nreg, valorreg, dtreg, objlanc, partelanc, centrocontalanc, function(err){
                if(err){
                    res.sendStatus(500)
                } else{
                    res.sendStatus(201)
                }
            })
        }
    } else{
        criarLanc(null, vlrlanc, dtlanc, objlanc, partelanc, centrocontalanc, function(err){
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
function deleteLanc(id, callback){
    db.pool.query(`DELETE FROM lanc WHERE nlanc in (${id})`, function(err, res){
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
    deleteLanc(arrayId, function(err){
        if(err){
            res.sendStatus(500)
        } else{
            res.sendStatus(204)
        }
    })
}
/* FIM DELETE */

/* PUT */
function updateLanc(n, nreg, valor, data, obj, parte, centro, callback){
    db.pool.query(`UPDATE lanc SET regn = '${nreg}', vlrlanc = '${valor}', dtlanc = '${data}', objlanc = '${obj}', partelanc = '${parte}', centrocontalanc = '${centro}' WHERE nlanc = ${n} RETURNING *`, function(err, res){
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

function updateSemRegLanc(n, valor, data, obj, parte, centro, callback){
    db.pool.query(`UPDATE lanc SET vlrlanc = '${valor}', dtlanc = '${data}', objlanc = '${obj}', partelanc = '${parte}', centrocontalanc = '${centro}' WHERE nlanc = ${n} RETURNING *`, function(err, res){
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}


exports.put = (req, res) =>{
    const n = req.params.id
    const nreg = req.body.regn
    const valor = req.body.vlrlanc
    const data = req.body.dtlanc
    const obj = req.body.objlanc
    const parte = req.body.partelanc
    const centro = req.body.centrocontalanc
    if(nreg){
        updateLanc(n, nreg, valor, data, obj, parte, centro, function(err){
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    }else {
        updateSemRegLanc(n, valor, data, obj, parte, centro, function(err){
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    }

}
/* FIM PUT */