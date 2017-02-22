const PouchDB = require('pouchdb-http')
const {map, omit, compose, prop} = require('ramda')
const db = new PouchDB('http://localhost:3000/test')


// create and export a function that retrieves a person from your couch database

function getPerson(id, cb) {
//  "person_maddux_greg_maddog96@yahoo.com"
  db.get(id, function (err, doc) {
    if (err) return cb(err)
    cb(null, doc)
  })
}

function getPersons(options, cb) {
    db.allDocs({
          include_docs: true,
          start_key: "person_",
          end_key: "person_\uffff",
          limit: options.limit
      }, function(err, docs) {
        if (err) return cb(err)
        cb(null, map(data => data.doc, docs.rows))
    })
}


function addPerson(doc, cb) {
  // check for required properties within the doc
  checkPersonRequiredValues(doc) ? db.put(prepNewPerson(doc), function (err, res) {
      if (err) return cb(err)
      cb(null, res)
    }) : cb({
       error: "bad_request",
       reason: "Bad Request",
       name: "bad_request",
       status: 400,
       message: "Adding a person requires a firstName, lastName, and email."
      })
}

function updatePerson(doc, cb) {

  db.put(doc, function (err, res) {
    if (err) return cb(err)
    cb(null, res)
  })
}


function deletePerson (id, cb) {

  db.get(id, function(err, doc) {
    if (err) return cb(err)

    db.remove(doc, function(err, removedDoc) {
      if (err) return cb(err)
      cb(null, removedDoc)
    })

  })

}

//////////////////
///  helpers
//////////////////

function prepNewPerson(doc) {
  doc._id = "person_" + doc.lastName.toLowerCase() + "_" + doc.firstName.toLowerCase() + "_" + doc.email.toLowerCase()
  doc.type = "person"
  return doc
}

function checkPersonRequiredValues(doc) {
  return prop('firstName', doc) &&  prop('lastName', doc) &&  prop('email', doc)
}

//////////////////
/// end helpers
//////////////////

const dal = {
  getPerson: getPerson,
  getPersons: getPersons,
  addPerson: addPerson,
  deletePerson: deletePerson,
  updatePerson: updatePerson
}

module.exports = dal
