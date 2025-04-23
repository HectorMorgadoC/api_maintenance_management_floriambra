## `(POST)` http://localhost:5000/api/team

***Bearer Token***
**Access:** Admin
***text-content: JSON***
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request:
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

#### `201-Created`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
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
#### `400-Bad Request`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
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

- team does not exist

{
    "message": "Key (xxx)=(team) already exists.",
    "error": "Bad Request",
    "statusCode": 400
}

- process does not exits

{
    "message": "Key (processId)=(9a5ac9aa-ffe9-4616-9d12-85fa55b8b8d0) is not present in table \"process\".",
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
    "message": "Client client124 need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```




***Bearer Token***
### `500-Internal Server Error`
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
