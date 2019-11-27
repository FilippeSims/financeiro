function verificaJWT(req, res, next) {
    var token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ status: false, msg: 'Você não tem um token válido!' })
  
    jsonwt.verify(token, configJwt.secretOrKey, function(err, decoded){
      if(err) return res.status(500).send({status: false, msg: 'Falha ao autenticar o token!' })
  
      req.usuarion = decoded.n
      console.log(req.usuarion)
      next()
    })
  }