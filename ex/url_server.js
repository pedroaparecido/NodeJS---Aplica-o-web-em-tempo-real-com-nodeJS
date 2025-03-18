const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<h1>Dados da query string</h1>')
    const result = url.parse(req.url, true)
    for (var key in result.query) {
        res.write(`<h2>${key}: ${result.query[key]}</h2>`)
    }
    res.end()
})

server.listen(3000, () => {
    console.log('Servidor http.')
})