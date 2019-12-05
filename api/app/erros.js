const errosMsg = [
    {
        codeErro: '23503',
        color: 'red',
        icon: 'error',
        msg: 'Você não pode apagar esse item pois ele tem relação com outra tabela!'
    },
    {
        codeErro: "22",
        msgErro: "Erro"
    }
]

module.exports.errorF = function erroCode(code, callback){
    if(code){
        callback(null, code)
    } else {
        callback(null, '')
    }
}

exports.codeMensagem = errosMsg