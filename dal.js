const PouchDB = require('pouchdb-http')
const {map, omit, compose} = require('ramda')

const db = new PouchDB('http://localhost:3000/test')


// create and export a function that retrieves a person from your couch database

function getPerson(id, cb) {
  db.get(id, function (err, doc) {
    if (err) return cb(err)
    cb(doc)
  })
}

const dal = {
  getPerson: getPerson
}

module.exports = dal
