## - `(POST)` http://localhost:5000/api/order

***Request***
***Bearer Token***
**Acesso:** admin,technical_supervisor,technical
***text-content: JSON***
```json
{
    "order": "118f3e26-3498-47a7-9e2b-22563702028c",
    "client": "a220e4f3-7a98-4e74-b5c6-3996a4653d14",
    "fault_type": "Electrico",
    "type_of_maintenance": "Prevent",
    "from_date": "2024-04-11T14:30:22.000Z",
    "end_date": "2024-04-12T09:00:00.000Z",
    "summary_of_activities": "Damaged fuses are replaced, and current measurement is performed.",
    "remarks": "Perform transmission pulley change"
}
```   
### `201-Created`
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Response***
```json
{
    "id_report": "ac6ffcda-8fd5-4446-88d1-7bfca9cc0956",
    "id_order": "3eb2280c-bd62-4d84-8ead-c20b4e72b992",
    "description_fault": "Descrition order",
    "order_creator": "UserTechnical",
    "technical": "UserTechnical",
    "team": "Team1",
    "notice_date": "2024-09-11T09:12:02.000Z",
    "from_date": "2023-08-15T14:30:00.000Z",
    "end_date": "2023-08-15T14:30:00.000Z",
    "summary_of_activities": "Damaged fuses are replaced, and current measurement is performed.",
    "used_spare_parts": "Fuses AH784 Siemens(2)",
    "remarks": "Perform transmission pulley change"
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
{{
  "message": [
    "order must be a UUID",
    "client must be a UUID",
    "fault_type must be shorter than or equal to 30 characters",
    "fault_type must be a string",
    "type_of_maintenance must be shorter than or equal to 30 characters",
    "type_of_maintenance must be a string",
    "The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ",
    "from_date must be a string",
    "The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ",
    "end_date must be a string",
    "summary_of_activities must be shorter than or equal to 300 characters",
    "summary_of_activities must be a string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
{
  "message": "Key (orderId)=(b52c8146-4735-428e-803e-9f61abed1a27) is not present in table \"order\".",
  "error": "Bad Request",
  "statusCode": 400
}

{
  "message": "the client xxxx does not have an authorized role",
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
  "message": "Client xxxx need a valid role: admin,technical_supervisor,technical",
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
