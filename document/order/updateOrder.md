## - `(PATCH)` http://localhost:5000/api/order/d148ca01-eec7-4948-b1ef-fa9f951c2f51

***Bearer Token***
**Acesso:** admin,production_supervisor,technical_supervisor"

### `200-Ok`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Request***
```json
{
    "client": "f1e518cd-c4ab-4730-8e02-7af35e5a2a22"
}
```

***Response***
```json
{
    "id": "a8d4ff2b-7981-43ca-bc01-58c0faa95f15",
    "client": "JuanMorgado",
    "description": "Description order 2",
    "team": "Team1",
    "notice_date": "2024-09-11T09:12:02.000Z",
    "process": "process1"
}
```
***Bearer Token***
**Acesso:** id not found

### `400 Bad-Request`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
```

***Response***
```json
{
    "error": "Bad Request",
    "message": "Validation failed (uuid is expected)",
    "statusCode": 400
}

{
    "message": [
        "property cliente should not exist"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

***Bearer Token***
**Acesso:** Token invalido

### `401-Unauthorized`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
```

***Response***
```json
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

***Bearer Token***
**Acesso:** unauthorized token

### `403-Forbidden`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
```

***Response***
```json
{
    "message": "User xxxx need a valid role: admin,production_supervisor,technical_supervisor",
    "error": "Forbidden",
    "statusCode": 403
}
```
***Bearer Token***
**Acesso:** user not found

### `404-Not Found`

```json
{
    "message": "Order with id: 79c3a573-3441-451c-9111-dd24e7df0dfe not found",
    "error": "Not Found",
    "statusCode": 404
}
```