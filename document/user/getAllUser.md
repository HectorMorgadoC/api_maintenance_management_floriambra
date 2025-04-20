## - `(GET)`http://localhost:5000/api/users

***Bearer Token***
**Acesso:** Admin

### `200-Ok`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
```

***Response***
```json
[
    {
        "id": "ddb4893d-f84a-4eaa-a774-7afbe15f7211",
        "username": "juanPerz",
        "access_level": "admin",
        "email": "juanPerez@gmail.com",
        "process": "process1"
    },
    {}
]
```
***Bearer Token***
**Acesso:** Token invalido

### `401-Unauthorized`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
```

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

```json
{
    "message": "User juanPerez need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```