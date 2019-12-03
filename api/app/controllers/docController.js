var db = require('../pg/config')

/* GET  */
function todosDoc(callback) {
    db.pool.query('SELECT * FROM doc', function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows)
        }
    })
}

exports.get = (req, res) => {
    todosDoc(function (err, doc) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(JSON.stringify(doc))
        }
    })
}
/* FIM GET */

/* POST */
function criarDoc(valordoc, dtdoc, fornecedordoc, tpdoc, callback) {
    db.pool.query('INSERT INTO doc (valordoc, dtdoc, fornecedordoc, tpcontroledoc) VALUES ($1, $2, $3, $4) RETURNING *', [valordoc, dtdoc, fornecedordoc, tpdoc], function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

exports.post = (req, res) => {
    const valordoc = req.body.valordoc
    const dtdoc = req.body.dtdoc
    const fornecedordoc = req.body.fornecedordoc
    const tpcontroledoc = req.body.tpcontroledoc
    console.log(valordoc, dtdoc, fornecedordoc, tpcontroledoc)
    criarDoc(valordoc, dtdoc, fornecedordoc, tpcontroledoc, function (err) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(201)
        }
    })
}
/* FIM POST*/

/* DELETE */
function deleteDoc(id, callback) {
    db.pool.query(`DELETE FROM doc WHERE ndoc in (${id})`, function (err, res) {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    const arrayId = id.split(/\s*,\s*/)
    deleteDoc(arrayId, function (err) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(204)
        }
    })
}
/* FIM DELETE */

/* PUT */
function updateDoc(n, valordoc, dtdoc, fornecedordoc, tpcontroledoc, callback) {
    db.pool.query(`UPDATE doc SET valordoc = '${valordoc}', dtdoc = '${dtdoc}', fornecedordoc = '${fornecedordoc}', tpcontroledoc = '${tpcontroledoc}' WHERE ndoc = ${n} RETURNING *`, function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

exports.put = (req, res) => {
    const n = req.params.id
    const valordoc = req.body.valordoc
    const dtdoc = req.body.dtdoc
    const fornecedordoc = req.body.fornecedordoc
    const tpcontroledoc = req.body.tpcontroledoc
    updateDoc(n, valordoc, dtdoc, fornecedordoc, tpcontroledoc, function (err) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })

}
/* FIM PUT */