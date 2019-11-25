var db = require('../pg/config')

/* GET  */
function todosRegistros(callback) {
    db.pool.query('SELECT * FROM usuarios', function (err, res) {
        if (err) {
            callback(err, null)
        } else {
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
function criarUsuario(nome, sobrenome, email, rule, senha, callback) {
    db.pool.query('INSERT INTO usuarios (nomeusuario, sobrenomeusuario, emailusuario, ruleusuario, senhausuario) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, sobrenome, email, rule, senha], function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

module.exports.emailVerifica = function verificaEmail(email, callback) {
    db.pool.query(`SELECT emailusuario FROM usuarios WHERE emailusuario = '${email}'`, function (err, res) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rowCount)
        }
    })
}


exports.post = (req, res) => {
    const nome = req.body.nome
    const sobrenome = req.body.sobrenome
    const email = req.body.email
    const rule = req.body.rule
    const senha = req.body.senha
    const senhaRepetida = req.body.senhaRepetida
    const bcrypt = require('bcrypt')
    const salt = bcrypt.genSaltSync(10)
    if (senha == senhaRepetida) {
        const senhaCrypt = bcrypt.hashSync(senha, salt)
        verificaEmail(email, function (err, retorno) {
            if (retorno == 0) {
                if (rule == null) {
                    const rule = 'guest'
                    criarUsuario(nome, sobrenome, email, rule, senhaCrypt, function (err) {
                        if (err) {
                            res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Falha ao cadastrar o usuário!' })
                        } else {
                            res.status(200).json({ status: true, color: 'green', icon: 'mood', msg: 'Usuário cadastrado com sucesso!' })
                        }
                    })
                } else {
                    criarUsuario(nome, sobrenome, email, rule, senhaCrypt, function (err) {
                        if (err) {
                            res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Falha ao cadastrar o usuário!' })
                        } else {
                            res.status(200).json({ status: true, color: 'green', icon: 'mood', msg: 'Usuário cadastrado com sucesso!' })
                        }
                    })
                }
            } else {
                res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'E-mail cadastrado já existe!' })
            }
        })
    } else {
        res.status(200).json({ status: false, color: 'red', icon: 'error', msg: 'Senhas não coincidem!' })
    }
}
/* FIM POST*/

/* DELETE */
function deleteRegistro(id, callback) {
    db.pool.query(`DELETE FROM reg WHERE nreg in (${id})`, function (err, res) {
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
    deleteRegistro(arrayId, function (err) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(204)
        }
    })
}
/* FIM DELETE */

/* PUT */
function updateRegistro(id, data, valor, obs, desc, callback) {
    db.pool.query(`UPDATE reg SET dtreg = '${data}', valorreg = ${valor}, obsreg = '${obs}', descreg = '${desc}' WHERE nreg = ${id} RETURNING *`, function (err, res) {
        console.log(err)
        if (err) {
            callback(err, null)
        } else {
            callback(null, res.rows[0])
        }
    })
}

exports.put = (req, res) => {
    const n = req.params.id
    const data = new Date().toUTCString()
    const valor = req.body.valorreg
    const obs = req.body.obsreg
    const desc = req.body.descreg
    updateRegistro(n, data, valor, obs, desc, function (err) {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
}
/* FIM PUT */