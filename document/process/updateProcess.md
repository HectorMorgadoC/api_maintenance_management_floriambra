## `(PATCH)` http://localhost:5000/api/process/13d48e33-7df4-472e-9c2c-71fed3d7207b

***Bearer Token***
**Access:** Admin
#### `200-Ok`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request
{
    "name": "process2"
}
```

```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response
{
    "name": "process2",
    "description": "description process"
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
    "message": "Client client123 need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```


***Bearer Token***
**Access:** process not found
#### `404-Not Found`
```json
{
    "message": "Process with id: a220e4f3-7a98-4e74-b5c6-3996a4653d14 not found",
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