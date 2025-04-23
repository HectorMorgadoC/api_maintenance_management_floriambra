## `(POST)`http://localhost:5000/api/client

***Bearer Token***
**Access:** Admin
***text-content: JSON***
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request:
{    
    "username":"clientnumber2",
    "email":"clientnumber2@email.com",
    "password": "Elementary2021",
    "access_level": "operator"
}
```


#### `201-Created`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "username": "clientnumber2",
    "access_level": "operator"
}
```
By default, if no `access_level` is added, `operator` will be loaded.

***Bearer Token***
**Access:** Admin
***text-content: JSON***
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request:
{}
```

***Bearer Token***
**Access:** Admin
#### `400-Bad Request`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
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
    "message": "Client xxx need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```


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