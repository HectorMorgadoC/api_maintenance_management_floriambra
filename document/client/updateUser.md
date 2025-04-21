## - `(PATCH)`http://localhost:5000/api/users/144086cd-830e-49d0-8a33-1d62eb4888fd

***Bearer Token***
**Acesso:** Admin

### `200-Ok`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Request***
```json
{
    "process": "c3f7a09d-f324-48d0-89da-9ad2d4937cf8"
}
```

***Response***
```json
{
    "id": "0a18ae5d-da46-4f52-9185-e0517b93678b",
    "username": "JuanPerz",
    "access_level": "technical",
    "email": "Juantools@gmail.com",
    "process": "procces1"
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
    "message": "User juanPerez need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```
***Bearer Token***
**Acesso:** user not found

### `404-Not Found`

```json
{
    "message": "User with id: a220e4f3-7a98-4e74-b5c6-3996a4653d14 not found",
    "error": "Not Found",
    "statusCode": 404
}
```