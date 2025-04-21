## - `(POST)`http://localhost:5000/api/users

***Request***
***Bearer Token***
**Acesso:** Admin
***text-content: JSON***
```json
{    
    "username":"usernumber2",
    "email":"usernumber2@email.com",
    "password": "Elementary2021",
    "access_level": "operator"
}
```
### `201-Created`
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Response***
```json
{
    "username": "usernumber2",
    "access_level": "operator"
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
        "username must be longer than or equal to 5 characters",
        "username must be shorter than or equal to 30 characters",
        "username must be a string",
        "The password must have a Uppercase, lowercase letter and a number",
        "password must be shorter than or equal to 50 characters",
        "password must be longer than or equal to 6 characters",
        "password must be a string"
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
    "message": "User juanPerez need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```