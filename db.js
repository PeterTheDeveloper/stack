const { Pool } = require('pg')

const pool = new Pool({
  user: 'peter',
  password: 'marcylabschool',
  host: '/var/run/postgresql',
  database: 'todo_list_api',
  port: 5432
})

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${pool.user}:${pool.password}@${pool.host}:${pool.port}/${pool.database}`

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  }
};