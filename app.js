const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const {
    getPerson,
    addPerson,
    deletePerson,
    updatePerson,
    getPersons
} = require('./dal.js')
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error');

app.use(bodyParser.json())

app.post('/persons', function(req, res, next) {
    addPerson(req.body, function(err, dalResponse) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(201).send(dalResponse)
    })
})

app.get('/persons/:id', function(req, res, next) {
    getPerson(req.params.id, function(err, person) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(200).send(person)
    })
})


app.get('/persons', function(req, res) {
    getPersons(function(err, docs) {
        if (err) return res.send(err)
        res.send(docs)
    })
})

app.delete('/persons/:id', function(req, res, next) {
    deletePerson(req.params.id, function(err, person) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(200).send(person)
    })
})

app.put('/persons/:id', function(req, res, next) {

    //TODO: check req.params.id against the req.body to ensure
    // the resource id matches
    updatePerson(req.body, function(err, updatedResponse) {
        if (err) return next(new HTTPError(err.status, err.message, err))
        res.status(200).send(updatedResponse)
    })
})


//////////////////////
//   Error handler
//////////////////////
// Define error-handling middleware functions in the same way as other middleware functions,
// except error-handling functions have four arguments instead of three: (err, req, res, next).
// define error-handling middleware last, after other app.use(), such as app.use(bodyParser.json()),
// and routes calls, such as app.get() or app.post().
// Sample CouchDB error messages:
//  {
//   error: "not_found",
//   reason: "missing",
//   name: "not_found",
//   status: 404,
//   message: "missing"
//  }

//  {
//     "name": "conflict",
//     "status": 409,
//     "message": "Document update conflict.",
//     "reason": "Document update conflict.",
//     "error": "conflict"
//  }
app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500)
    res.send(err)
})

app.listen(port, function() {
    console.log("persons api started on:", port)
})
