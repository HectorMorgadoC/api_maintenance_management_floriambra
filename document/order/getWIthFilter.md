## `(GET)` http://localhost:5000/api/order?client=ddb4893d-f84a-4eaa-a774-7afbe15f7211&order_state=true

***NOTE: The orders that will be sent will be those that have `order_state` set to `false`, since these are the orders that have not been closed by a report***

#### query
- team: uuid
- user: uuid
- date_time: date(format)
- order_state: boolean

***Bearer Token***
**Access:** Everyone (As long as they are authenticated)
#### `200-Ok`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
[
    {
    "id": "f5d606df-f37d-45d0-9ba1-30e850415361",
    "date": "2024-09-11T09:12:02.000Z",
    "description": "Order description",
    "state": false,
    "client": "Client1",
    "process": "process1"
    },
    {}
]
```

***Bearer Token***
#### `400-Bad Request`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:

- client is not a uuid

{
    "message": [
        "client must be a UUID"
    ],
    "error": "Bad Request",
    "statusCode": 400
}

- team is not a uuid

{
    "message": [
        "team must be a UUID"
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