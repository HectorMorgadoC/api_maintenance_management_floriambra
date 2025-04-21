## - `(POST)` http://localhost:5000/api/order

***Request***
***Bearer Token***
**Acesso:** admin,production_supervisor,technical_supervisor
***text-content: JSON***
```json
{
    "team": "23781257-8416-43b3-aad0-fdafa0041232", 
    "client": "79c3a573-3441-451c-9111-dd24e7df0dfe",
    "notice_date": "2024-09-11T09:12:02.000Z",
    "fault_description": "Description Order"    
}  
```
### `201-Created`
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Response***
```json
{
    "id": "3eb2280c-bd62-4d84-8ead-c20b4e72b992",
    "date": "2024-09-11T09:12:02.000Z",
    "client": "JuanMorgado",
    "process": "process1",
    "team": "Team1",
    "description": "Descrition order"
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
    "team must be a UUID",
    "client must be a UUID",
    "The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ",
    "notice_date must be a string",
    "fault_description must be shorter than or equal to 200 characters",
    "fault_description must be longer than or equal to 10 characters",
    "fault_description must be a string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}

{
  "message": "Key (userId)=(23781257-8416-43b3-aad0-fdafa0041232) is not present in table \"client\".",
  "error": "Bad Request",
  "statusCode": 400
}

{
  "message": "Key (teamId)=(a8d4ff2b-7981-43ca-bc01-58c0faa95f15) is not present in table \"team\".",
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
  "message": "User xxxx need a valid role: admin,operator,production_supervisor,technical_supervisor",
  "error": "Forbidden",
  "statusCode": 403
}
```

### `500-Internal Server Error`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

```json
{
  "message": "Unexpected error, check server logs",
  "error": "Internal Server Error",
  "statusCode": 500
}
```