const fs = require('fs')

const leituraSync = (arquivo) => {
    console.log('Fazendo leitura sincrona')
    console.time('Bloqueio sincrono')
    fs.readFileSync(arquivo)
    console.timeEnd('Bloqueio sincrono')
}

module.exports = leituraSync