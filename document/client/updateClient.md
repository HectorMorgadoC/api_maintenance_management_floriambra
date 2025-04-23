## `(PATCH)`http://localhost:5000/api/client/144086cd-830e-49d0-8a33-1d62eb4888fd

***Bearer Token***
**Access:** Admin
#### `200-Ok`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request:
{
    "process": "c3f7a09d-f324-48d0-89da-9ad2d4937cf8"
}
```

```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "id": "0a18ae5d-da46-4f52-9185-e0517b93678b",
    "username": "Client12",
    "access_level": "technical",
    "email": "Client12@gmail.com",
    "process": "procces1"
}
```

***Bearer Token***
**Access:** id not found
#### `400 Bad-Request`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "error": "Bad Request",
    "message": "Validation failed (uuid is expected)",
    "statusCode": 400
}
```

***Bearer Token***
**Access:** Token invalid
#### `401-Unauthorized`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

***Bearer Token***
**Access:** unauthorized token
#### `403-Forbidden`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "message": "Client client234 need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```

***Bearer Token***
**Access:** client not found
#### `404-Not Found`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "message": "Client with id: a220e4f3-7a98-4e74-b5c6-3996a4653d14 not found",
    "error": "Not Found",
    "statusCode": 404
}
```

#### `500-Internal Server Error`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "message": "Unexpected error, check server logs",
    "error": "Internal Server Error",
    "statusCode": 500
}
```
