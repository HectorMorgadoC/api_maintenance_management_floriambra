
## - `(PATCH)` http://localhost:5000/api/order/d148ca01-eec7-4948-b1ef-fa9f951c2f51

***Bearer Token***
**Acesso:** admin,technical_supervisor,technical"

### `200-Ok`

x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Request***
```json
{
    "client": "f1e518cd-c4ab-4730-8e02-7af35e5a2a22"
}
```

***Response***
```json
{
    "order": "87d4318c-2f29-4beb-af78-081fba384fbf",
    "client": "b294ed4e-6391-42c9-b88e-9da25d53e595",
    "collaborators": "Services Integrtion SAC",
    "fault_type": "Electrical",
    "type_of_maintenance": "Corrective maintenance",
    "from_date": "2023-08-15T14:30:00.000Z",
    "end_date": "2023-08-15T14:30:00.000Z",
    "summary_of_activities": "Damaged fuses are replaced, and current measurement is performed.",
    "used_spare_parts": "Fuses AH784 Siemens(2)",
    "remarks": "Perform transmission pulley change"
}
```
***Bearer Token***
**Acesso:** id not found

### `400 Bad-Request`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
```

***Response***
```json
{
    "error": "Bad Request",
    "message": "Validation failed (uuid is expected)",
    "statusCode": 400
}

{
    "message": [
        "property cliente should not exist"
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
    "message": "User xxxx need a valid role: admin,technical_supervisor,technical",
    "error": "Forbidden",
    "statusCode": 403
}
```
***Bearer Token***
**Acesso:** user not found

### `404-Not Found`

```json
{
    "message": "Report with id: 79c3a573-3441-451c-9111-dd24e7df0dfe not found",
    "error": "Not Found",
    "statusCode": 404
}
```

