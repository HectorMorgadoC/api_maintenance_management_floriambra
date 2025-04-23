## - `(GET)` http://localhost:5000/api/order?client=ddb4893d-f84a-4eaa-a774-7afbe15f7211&order_state=true

***`NOTA:`las ordenes que se enviaran seran las que tengan `order_state` en `false`, ya que estan son las ordenes que no han sido cerradas por un reporte***

#### query
- team: uuid
- user: uuid
- date_time: date(format)
- order_state: boolean

***Bearer Token***
**Acesso:** Todos( Siempre y cuando esten autenticados )

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

### `400-Bad Request`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

```json
{
    "message": [
        "client must be a UUID"
    ],
    "error": "Bad Request",
    "statusCode": 400
}

{
    "message": [
        "team must be a UUID"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```