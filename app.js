const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const {getPerson} = require('./dal.js')

app.get('/persons/:id', function(req, res) {
  getPerson(req.params.id, function (err, person) {
    if (err) return res.send(err)
    res.status(200).send(person)
  })
})

app.listen(port, function() {
  console.log("persons api started on:", port)
})
