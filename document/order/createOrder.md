## `(POST)` http://localhost:5000/api/order

***Bearer Token***
**Access:** admin,production_supervisor,technical_supervisor
***text-content: JSON***
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "team": "23781257-8416-43b3-aad0-fdafa0041232", 
    "client": "79c3a573-3441-451c-9111-dd24e7df0dfe",
    "notice_date": "2024-09-11T09:12:02.000Z",
    "fault_description": "Description Order"    
}  
```
#### `201-Created`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
{
    "id": "3eb2280c-bd62-4d84-8ead-c20b4e72b992",
    "date": "2024-09-11T09:12:02.000Z",
    "client": "Client234",
    "process": "process1",
    "team": "Team1",
    "description": "Description order"
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

#### `400-Bad Request`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
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

- client does not exist

{
  "message": "Key (clientId)=(23781257-8416-43b3-aad0-fdafa0041232) is not present in table \"client\".",
  "error": "Bad Request",
  "statusCode": 400
}

- team does not exist

{
  "message": "Key (teamId)=(a8d4ff2b-7981-43ca-bc01-58c0faa95f15) is not present in table \"team\".",
  "error": "Bad Request",
  "statusCode": 400
}

- client does not belong to the process

{
  "message": "[Client] Client does not belong to the process",
  "error": "Bad Request",
  "statusCode": 400
}

- team is not active

{
  "message": "[Team]: Team is not active",
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
  "message": "Client xxxx need a valid role: admin,operator,production_supervisor,technical_supervisor",
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