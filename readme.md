# Persons API Readme

## Getting started

  ```
  $ git clone <some github url>
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
