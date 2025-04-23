## `(DELETE)` http://localhost:5000/api/report/63107c59-45cb-4b0d-898c-e9e4d97d53d1

***Bearer Token***
**Access:** admin,technical_supervisor,technical
#### `200-Ok`
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8


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
    "message": "Client xxxx need a valid role: admin,technical_supervisor,technical",
    "error": "Forbidden",
    "statusCode": 403
}
```

***Bearer Token***
**Access:** Report not found
#### `404-Not Found`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "message": "Report with id: 07fe87cb-58e7-4854-b4ec-9e9d9c338529 not found",
    "error": "Not Found",
    "statusCode": 404
}
```

***Bearer Token***
### `500-Internal Server Error`
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