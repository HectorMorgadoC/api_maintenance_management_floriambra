
## - `(PATCH)` http://localhost:5000/api/report/production_approval/b2d60dbe-e8ec-4225-9d0e-225b4b28a240/true

***Bearer Token***
**Acesso:** admin,production_supervisor"

### `200-Ok`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8


***Response***
```json
{
  "maintenance_approval": false,
  "production_approval": true
}
```

Intentar cambiar el valor con el msimo resultado 2 veces

### 304 Not Modified


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
    "message": "Client xxxx need a valid role: admin,production_supervisor",
    "error": "Forbidden",
    "statusCode": 403
}
```
***Bearer Token***
**Acesso:** user not found

### `404-Not Found`

```json
{
    "message": "Report with id: 79c3a573-3441-451c-9111-dd24e7df0dfe not found",
    "error": "Not Found",
    "statusCode": 404
}
```



