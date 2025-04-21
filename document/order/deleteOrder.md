## - `(DELETE)` http://localhost:5000/api/order/63107c59-45cb-4b0d-898c-e9e4d97d53d1

***Bearer Token***
**Acesso:** admin,production_supervisor,technical_supervisor

### `200-Ok`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8


***Bearer Token***
**Acesso:** id not found

### `400 Bad-Request`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Response***
```json
{
    "error": "Bad Request",
    "message": "Validation failed (uuid is expected)",
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
    "message": "Client xxxx need a valid role: admin,production_supervisor,technical_supervisor",
    "error": "Forbidden",
    "statusCode": 403
}
```
***Bearer Token***
**Acesso:** user not found

### `404-Not Found`

```json
{
    "message": "Order with id: 07fe87cb-58e7-4854-b4ec-9e9d9c338529 not found",
    "error": "Not Found",
    "statusCode": 404
}
```