## - `(GET)` http://localhost:5000/api/team

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
        "id": "8994859f-8714-461a-89bb-7ea15789de26",
        "name": "Team1",
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
    "message": "User JuanPerez need a valid role: admin,production_supervisor,technical_supervisor,operato",
    "error": "Forbidden",
    "statusCode": 403
}
```