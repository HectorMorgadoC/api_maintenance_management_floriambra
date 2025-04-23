## - `(GET)` http://localhost:5000/api/report?client=ddb4893d-f84a-4eaa-a774-7afbe15f7211&order_state=true&team=ddb4893d-f84a-4eaa-a774-7afbe15f7211&date_time=2023-01-01T00:00:00Z


#### query
- team: uuid
- user: uuid
- date_time: date(format)
- order_state: boolean

***Bearer Token***
**Acesso:** admin,technical_supervisor,technical

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
        "id_report": "1778bd67-76fe-426e-b594-3e595e0851af",
        "id_order": "d4cecd7f-aeed-49d8-b6b5-3ba96f483e6f",
        "description_fault": "editorder",
        "order_creator": "UserOperator",
        "technical": "UserTechnical",
        "collaborators": "Services Integrtion SAC",
        "team": "Team4",
        "notice_date": "2023-12-15T14:30:20.000Z",
        "from_date": "2023-08-15T14:30:00.000Z",
        "end_date": "2023-08-15T14:30:00.000Z",
        "fault_type": "Electrical",
        "type_of_maintenance": "Corrective maintenance",
        "summary_of_activities": "Damaged fuses are replaced, and current measurement is performed.",
        "used_spare_parts": "Fuses AH784 Siemens(2)",
        "remarks": "Perform transmission pulley change",
        "maintenance_approval": false,
        "production_approval": false
    },
    {}
]
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
{
    "message": [
        "date_time must be a valid ISO 8601 date string"
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

```json
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

### `403-Forbidden`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

```json
{
    "message": "Client UserOperator need a valid role: admin,technical_supervisor,technical",
    "error": "Forbidden",
    "statusCode": 403
}
```





