
## `(PATCH)` http://localhost:5000/api/report/maintenance_approval/b2d60dbe-e8ec-4225-9d0e-225b4b28a240/true

***Bearer Token***
**Access:** admin,technical_supervisor"
#### `200-Ok`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "maintenance_approval": true,
    "production_approval": false
}
```

***Bearer Token***
*Trying to change the value with the same result 2 times*
#### 304 Not Modified


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

- client does not exist

{
    "message": [
        "property cliente should not exist"
    ],
    "error": "Bad Request",
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
    "message": "Client xxxx need a valid role: admin,technical_supervisor",
    "error": "Forbidden",
    "statusCode": 403
}
```



***Bearer Token***
**Access:** Report not found
#### `404-Not Found`
```json
{
    "message": "Report with id: 79c3a573-3441-451c-9111-dd24e7df0dfe not found",
    "error": "Not Found",
    "statusCode": 404
}
```




***Bearer Token***
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


