## `(PATCH)` http://localhost:5000/api/order/d148ca01-eec7-4948-b1ef-fa9f951c2f51

***Bearer Token***
**Access:** admin,production_supervisor,technical_supervisor"
#### `200-Ok`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request:
{
    "client": "f1e518cd-c4ab-4730-8e02-7af35e5a2a22"
}
```

```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "id": "a8d4ff2b-7981-43ca-bc01-58c0faa95f15",
    "client": "Client122",
    "description": "Description order 2",
    "team": "Team1",
    "notice_date": "2024-09-11T09:12:02.000Z",
    "process": "process1"
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

- When the client does not exist

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
    "message": "Client xxxx need a valid role: admin,production_supervisor,technical_supervisor",
    "error": "Forbidden",
    "statusCode": 403
}
```



***Bearer Token***
**Access:** order not found
#### `404-Not Found`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "message": "Order with id: 79c3a573-3441-451c-9111-dd24e7df0dfe not found",
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