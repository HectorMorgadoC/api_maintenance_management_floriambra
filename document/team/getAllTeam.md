## `(GET)` http://localhost:5000/api/team

***Bearer Token***
**Access:** Admin
#### `200-Ok`
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request:


```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
[
    {
        "id": "8994859f-8714-461a-89bb-7ea15789de26",
        "name": "Team1",
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
    "message": "Client client12 need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
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
