const app = require('../../app')
const request = require('supertest')(app)

describe('No controller contatos', () => {
    describe('usuário não logado', () => {
        it('Get "/contatos" redireciona para GET "/"', (done) => {
            request.get('/contatos').end((err, res) => {
                res.headers.location.should.eql('/')
                done()
            })
        })
        it('GET "/contatos/1" redireciona para o GET "/"', (done) => {
            request.get('/contato/1').end((err, res) => {
                res.headers.location.should.eql('/')
                done()
            })
        })
        it('GET "/contato/1/editar" redireciona para o GET "/"', (done) => {
            request.get('/contato/1/editar').end((err, res) => {
                res.headers.location.should.eql('/')
                done()
            })
        })
        it('POST "/contato" redireciona para GET "/"', (done) => {
            request.post('/contato').end((err, res) => {
                res.headers.location.should.eql('/')
                done()
            })
        })
        it('DELETE "/contato/1" redireciona para GET "/"', (done) => {
            request.del('/contato/1').end((err, res) => {
                res.headers.location.should.eql('/')
                done()
            })
        })
        it('PUT "/contato/1" redireciona para GET "/"', (done) => {
            request.put('/contato/1').end((err, res) => {
                res.headers.location.should.eql('/')
                done()
            })
        })
    })

    describe('usuário logado', () => {
        const usuario = { nome: 'Teste', email: 'teste@teste' }
        let cookie = null

        
        it('GET "/contatos" é válido', (done) => {
            request.post('/entrar')
            .send({ usuario })
            const req = request.get('/contatos')
            req
            .expect(res => res.headers.location.should.eql('/contatos'))
            .end(done())
        })
        it('POST "/contato" redireciona para GET "/contatos"', (done) => {
            request.post('/entrar')
            .send({ usuario })
            const contato = usuario
            const req = request.post('/contato')
            req.send({ contato })
            .expect(res => res.headers.location.should.eql('/contatos'))
            .end(done())
        })
    })
})