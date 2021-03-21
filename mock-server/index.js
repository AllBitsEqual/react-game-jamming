/* eslint-disable */
const express = require('express')

const app = express()
const port = 3031

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authentication')
  next()
})

const dataRoutes = [{
    path: '/user-info',
    json: './data/user-info.json'
}, {
    path: '/game-info',
    json: './data/game-info.json'
}]

console.log('Available Routes:', dataRoutes.map(route => route.path).sort())

dataRoutes.forEach(({ path, json }) => {
    app.get(path, (req, res) => {
        const data = require(json)
        res.json(data)
    })
})


app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`)
})
