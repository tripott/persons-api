# Persons API Readme

## Getting started

  ```
  $ git clone https://github.com/tripott/persons-api.git
  $ cd persons-api
  $ npm install
  $ npm start
  ```

## Endpoints

### `GET /persons/:id`

Returns a JSON object representing a person for a given person id.

#### Parameters

- `id` - The primary key of the person to retrieve.

#### Example call

```
GET /persons/person_maddux_greg_maddog95@yahoo.com
```

Example Response:

```
{
  "_id": "person_maddux_greg_maddog95@yahoo.com",
  "_rev": "4-c8a5cfc0488e11c089346c7de1818632",
  "firstName": "Greg",
  "lastName": "Maddux",
  "email": "maddog95@yahoo.com",
  "type": "person"
}
```

Error Response:

```
{
  "error": "not_found",
  "reason": "missing",
  "name": "not_found",
  "status": 404,
  "message": "missing"
}
```

#### Code Samples

##### curl

```
$ curl -X GET http://<whatever>/persons/person_maddux_greg_maddog95@yahoo.com
```


### `POST /persons`

Adds a person to the database.

#### Parameters

None

#### Body

Provide a person JSON object in the request body:

```
{
  "_id": "person_scott_greg_gscott@yahoo.com",
  "firstName": "Greg",
  "lastName": "Scott",
  "email": "gscott@yahoo.com",
  "type": "person"
}
```

#### Example call

```
POST /persons

{
  "_id": "person_smith_jennifer_jensmith@yahoo.com",
  "firstName": "Jennifer",
  "lastName": "Smith",
  "email": "jensmith@yahoo.com",
  "type": "person"
}
```

Example Response:

```
{
  "ok": true,
  "id": "person_smith_jennifer_jensmith@yahoo.com",
  "rev": "1-cf72609b8bdf793577091ff5dbf2f349"
}
```

#### Common Errors

##### `412` - `missing_id`

You attempted to add a person without providing an `_id` property within the JSON request body.

```
{
  "status": 412,
  "name": "missing_id",
  "message": "_id is required for puts",
  "error": true
}
```
