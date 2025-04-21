## - `(POST)` http://localhost:5000/api/team

***Request***
***Bearer Token***
**Acesso:** Admin
***text-content: JSON***
```json
{
    "name": "Team2",
    "description": "Team Description",
    "process": "07fe87cb-58e7-4854-b4ec-9e9d9c338529",
    "march": "MacrchTeam",
    "model": "34hjy",
    "working_voltage": 380,
    "kilowatts": 10
}
```
### `201-Created`
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Response***
```json
{
    "id": "d26b5d0f-c2ce-4757-8a8c-c139438369a1",
    "name": "Team2",
    "description": "Team Description",
    "march": "MacrchTeam",
    "model": "34hjy",
    "working_voltage": 380,
    "kilowatts": 10
}
```

***Request***
***Bearer Token***
**Acesso:** Admin
***text-content: JSON***
```json
{}
```

### `400-Bad Request`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Response***
```json
{
    "message": [
        "name must be shorter than or equal to 50 characters",
        "name must be a string",
        "description must be shorter than or equal to 200 characters",
        "description must be a string"
    ],
    "error": "Bad Request",
    "statusCode": 400
}

{
    "message": "Key (xxx)=(team) already exists.",
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
    "message": "User juanPerez need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```