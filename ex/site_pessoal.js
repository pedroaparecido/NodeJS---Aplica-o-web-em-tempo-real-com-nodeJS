const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // __dirname retorna o diretório raiz da aplicação
    fs.readFile(`${__dirname}/index.html`, (erro, html) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(html)
        res.end()
    })
})

server.listen(3000, () => {
    console.log('Executando site pessoal')
})