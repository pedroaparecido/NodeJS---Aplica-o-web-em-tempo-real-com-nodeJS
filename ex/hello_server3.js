const http = require('http')
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    if (req.url === '/') {
        res.write('<h1>Página Principal</h1>')
    } else if (req.url === '/bemvindo') {
        res.write('<h1>Bem-vindo :)</h1>')
    } else {
        res.write('<h1>Página não encontrada :(</h1>')
    }
    res.end()
})

server.listen(3000, () => {
    console.log('Servidor Rodando!')
})