const fs = require('fs')

const leituraAsync = (arquivo) => {
    console.log('Fazendo leitura assincrona')
    console.time('Bloqueio assincrono')
    // Função callback vazia apenas para testar bloqueio assincrono
    fs.readFile(arquivo, () => {})
    console.timeEnd('Bloqueio assincrono')
}

module.exports = leituraAsync