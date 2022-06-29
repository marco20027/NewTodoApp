// ESM

// CommonJs
const fastify = require('fastify')({
  logger: true
})
///const mysql = require('@fastify/mysql')
//console.log(mysql) connessione al db

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'Server todo-app' }
})
// server che ascolta sulla porta 3000
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})


// query di inserimento metodo POST
fastify.post ('/todo/:id', async (request, reply) => {
  try{
    const {titolo, descrizione} = request.body
    const connection = await fastify.mysql.getConnection()
    const [rows, fields] = await connection.query('INSERT INTO todo (titolo, descrizione), VALUES(?,?)', [titolo, descrizione])
    connection.realese()
    return {message : (rows)}
  }
    catch (err) {
      throw err
    }
})

// query di aggiornamento metodo PUT
fastify.put('/todo', async (request, reply) => {
  try{
    const {descrizione} = request.body
    const connection = await fastify.mysql.getConnection()
    const [rows, fields] = await connection.query('UPDATE todo (descrizione), VALUES (?,?)', [descrizione])
    connection.realese()
    return (rows, fields)
  }
  catch (err){
    throw err
  }
})

// query di cancellazione metodo DELETE 
fastify.delete ('/todo', async(request, reply) => {
  try{
    const {descrizione} = request.body
    const connection = await fastify.mysql.getConnection()
    const [rows, fields] = await connection.query('DELETE todo WHERE = ?' [descrizione])
    connection.realese()
    return (rows, fields)
  }
  catch (err){
    throw err 
  }
})

