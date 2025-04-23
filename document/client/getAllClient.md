## `(GET)`http://localhost:5000/api/client

***Bearer Token***
**Access:** Admin
#### `200-Ok`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
[
    {
        "id": "ddb4893d-f84a-4eaa-a774-7afbe15f7211",
        "username": "client1",
        "access_level": "admin",
        "email": "client1@gmail.com",
        "process": "process1"
    },
    {}
]
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
    "message": "Client xxx need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
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