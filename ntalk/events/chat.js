const config = require('../config')
const redis = require('redis').createClient(config.redis)

module.exports = (app, io) => {
  io.on('connection', (client) => {
    const { session } = client.handshake;
    const { usuario } = session;

    redis.sAdd('online', usuario.email, () => {
      redis.sMembers('online', (err, emails) => {
        emails.forEach((email) => {
          client.emit('notify-onllines', email)
          client.broadcast.emit('notify-onlines', email)
        })
      })
    })

    client.on('send-server', (hashDaSala, msg) => {
      const resposta = `<b>${usuario.nome}:</b> ${msg}<br>`;
      const novaMensagem = { email: usuario.email, sala: hashDaSala };
      redis.lPush(hashDaSala, resposta)
      client.broadcast.emit('new-message', novaMensagem);
      io.to(hashDaSala).emit('send-client', resposta);
    });

    client.on('create-room', (hashDaSala) => {
      session.sala = hashDaSala;
      client.join(hashDaSala);
      const resposta = `<B>${usuario.nome}: </b> entrou. <br>`
      redis.lPush(hashDaSala, resposta, () => {
        redis.lRange(hashDaSala, 0 , -1, (err, msgs) => {
          msgs.forEach((msg) => {
            io.to(hashDaSala).emit('send-client', msg)
          });
        })
      })
    });

    client.on('disconnect', () => {
      const { sala } = session;
      const resposta = `<b>${usuario.nome}:</b> saiu.<br>`;
      redis.sRem('onlines', usuario.email)
      redis.lPush(sala,  resposta, () => {
        client.leave(sala);
        client.broadcast.emit('notify-offlines', usuario.email);
        io.to(sala).emit('send-client', resposta);
      })
    });
  });
};