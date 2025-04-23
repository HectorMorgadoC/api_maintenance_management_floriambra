## `(GET)` http://localhost:5000/api/report?client=ddb4893d-f84a-4eaa-a774-7afbe15f7211&order_state=true&team=ddb4893d-f84a-4eaa-a774-7afbe15f7211&date_time=2023-01-01T00:00:00Z


#### query
- team: uuid
- user: uuid
- date_time: date(format)
- order_state: boolean

***Bearer Token***
**Access:** admin,technical_supervisor,technical
#### `200-Ok`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
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



***Bearer Token***
#### `400-Bad Request`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:

- Client does not exists

{
    "message": [
        "client must be a UUID"
    ],
    "error": "Bad Request",
    "statusCode": 400
}

- Team does not exists

{
    "message": [
        "team must be a UUID"
    ],
    "error": "Bad Request",
    "statusCode": 400
}

- date_time invalid

{
    "message": [
        "date_time must be a valid ISO 8601 date string"
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
    "message": "Client UserOperator need a valid role: admin,technical_supervisor,technical",
    "error": "Forbidden",
    "statusCode": 403
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




