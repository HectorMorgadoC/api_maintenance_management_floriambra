# Users

## - `(GET)`http://localhost:5000/api/users/login

***Request***
***text-content: JSON***
```json
{
    "username": "Juan Morgado",
    "password": "Elementary2021"
}
```

Existen 5 niveles de acceso, y 5 respuesta diferentes por usuario

- admin
- production_supervisor
- technical_supervisor
- operator
- technical

### `201-Created`
```
x-powered-by : Expressauthorization
Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfbGV2ZWwiOiJhZG1pbiIsInByb2Nlc3MiOiJtYW50ZW5pbWllbnRvIiwidXNlcm5hbWUiOiJIZWN0b3IgTW9yZ2FkbyIsImlhdCI6MTc0NTAwMzIzOCwiZXhwIjoxNzQ1MDEwNDM4fQ.rvzj6JLTDNxQiWdiGM__ie5zVB-NXqsq3KAV6ovXwIY
content-type: application/json; 
charset=utf-8
```

***Response***
#### `admin`

```json
{
    "user": {
        "username": "Juanperez",
        "access_level": "admin",
        "teams": [
            {
                "id": "bf92561b-108f-42bd-9191-c2eccee3d37e",
                "name": "machine1",
                "status": false,
                "process": "process1"
            },
            {}
        ],
        "process": [
            {
                "id": "13d48e33-7df4-472e-9c2c-71fed3d7207b",
                "name": "process1",
                "description": "description process",
                "status": true
            },
            {}
        ]
    }
}
```

#### `production_supervisor || technical_supervisor`

```json
{
    "user": {
        "username": "Juanperez",
        "access_level": "production_supervisor",
        "teams": [
            {
                "id": "dea7c440-0892-4d1a-9478-c9052109fa43",
                "name": "machine1",
                "process": "process1"
            },
            {}
        ]
    }
}
```

#### `operator`

```json
{
    "user": {
        "username": "Juanperez",
        "access_level": "operator",
        "team": [
            {
                "id": "dea7c440-0892-4d1a-9478-c9052109fa43",
                "name": "machine1",
                "process": "process1"
            },
            {}
        ]
    }
}
```

#### `technical`

```json
{
    "user": {
        "username": "Juanperez",
        "access_level": "technical"
    }
}
```

### `401-Unauthorized`

```
x-powered-by: Express
content-type: application/json; charset=utf-8
content-length: 90
```

username not valid
```json
{
    "message": "Credentials are not valid (username)",
    "error": "Unauthorized",
    "statusCode": 401
}
```
password not valid
```json
{
    "message": "Credentials are not valid (password)",
    "error": "Unauthorized",
    "statusCode": 401
}
```

### `400-Bad Request`
```json
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
## - `(GET)`http://localhost:5000/api/users

***Bearer Token***
**Acesso:** Admin

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
        "id": "ddb4893d-f84a-4eaa-a774-7afbe15f7211",
        "username": "juanPerz",
        "access_level": "admin",
        "email": "juanPerez@gmail.com",
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

***Bearer Token***
**Acesso:** unauthorized token

### `403-Forbidden`
```
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
```

```json
{
    "message": "User juanPerez need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```

## - `(POST)`http://localhost:5000/api/users

***Request***
***Bearer Token***
**Acesso:** Admin
***text-content: JSON***
```json
{    
    "username":"usernumber2",
    "email":"usernumber2@email.com",
    "password": "Elementary2021",
    "access_level": "operator"
}
```
### `201-Created`
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8

***Response***
```json
{
    "username": "usernumber2",
    "access_level": "operator"
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
    "message": "User juanPerez need a valid role: admin",
    "error": "Forbidden",
    "statusCode": 403
}
```
## - `(PATCH)`http://localhost:5000/api/users/144086cd-830e-49d0-8a33-1d62eb4888fd

```json
{
    "process": "c3f7a09d-f324-48d0-89da-9ad2d4937cf8"
}
```

## - `(DELETE)`http://localhost:5000/api/users/144086cd-830e-49d0-8a33-1d62eb4888fd

## - `(GET)` http://localhost:5000/api/team

## - `(POST)` http://localhost:5000/api/team

```json
    "name": "Laminadora comexi",
    "description": "Maquina encargada de realizar Laminado de peliculas plasticas",
    "march": "Comexi",
    "model": "34hjy",
    "working_voltage": 380,
    "kilowatts": 35
```
## - `(PATCH)` http://localhost:5000/api/team/8994859f-8714-461a-89bb-7ea15789de26

{
    "process": "c3f7a09d-f324-48d0-89da-9ad2d4937cf8"
}

## - `(GET)` http://localhost:5000/api/process/

## - `(POST)` http://localhost:5000/api/process/

```json
{
    "name":"Laminado",
    "description":"Linea de laminado de peliculas plasticas BOPP, metalizado,PEBD"
}      
```
## - `(PATCH)` http://localhost:5000/api/process/13d48e33-7df4-472e-9c2c-71fed3d7207b

```json
{
    "description":"servicio de mantenimiento mecanico, electrico, electronico y programacion de plc"
}
```
## - `(GET)` http://localhost:5000/api/order?user=ddb4893d-f84a-4eaa-a774-7afbe15f7211&order_state=true

#### query
- team: uuid
- user: uuid
- date_time: date(format)
- order_state: boolean

## - `(GET)` http://localhost:5000/api/report?team=dea7c440-0892-4d1a-9478-c9052109fa43

#### query
- team: uuid
- user: uuid
- date_time: date(format)
- order_state: boolean

## - `(POST)` http://localhost:5000/api/order

```json
{
    "team": "dea7c440-0892-4d1a-9478-c9052109fa43", 
    "user": "144086cd-830e-49d0-8a33-1d62eb4888fd",
    "notice_date": "2024-09-11T09:12:02.000Z",
    "fault_description": "Camara no muestra video en automatico"    
}
```
## - `(POST)` http://localhost:5000/api/report

```json
{
    "order": "118f3e26-3498-47a7-9e2b-22563702028c",
    "user": "a220e4f3-7a98-4e74-b5c6-3996a4653d14",
    "fault_type": "Electrico",
    "type_of_maintenance": "Correctivo no programado",
    "from_date": "2024-04-11T14:30:22.000Z",
    "end_date": "2024-04-12T09:00:00.000Z",
    "summary_of_activities": "Ajustar mangueras de cilindros",
    "remarks": "Hay que cambiar cableado"
}
```   

## - `(PATCH)` http://localhost:5000/api/order/d148ca01-eec7-4948-b1ef-fa9f951c2f51

```json
{
    "user": "f1e518cd-c4ab-4730-8e02-7af35e5a2a22"
}
```

## - `(PATCH)` http://localhost:5000/api/report/ff0d79c4-1c3e-4f6d-86cd-d408d96b4c73

```json
{
    "collaborators": "Morrocel",
    "fault_type": "Mecanica",
    "type_of_maintenance": "Correctivo no programado",
    "used_spare_parts": "Manguera festo de poliuretano de 12 pulgadas"
}
```
## - `(DELETE)` http://localhost:5000/api/order/63107c59-45cb-4b0d-898c-e9e4d97d53d1

## - `(DELETE)` http://localhost:5000/api/report/63107c59-45cb-4b0d-898c-e9e4d97d53d1

## - `(PATCH)` http://localhost:5000/api/report/maintenance_approval/6069ecc8-d595-49ea-94e0-ab3e8dddee16/true

## - `(PATCH)` http://localhost:5000/api/report/production_approval/652d8f0f-9c50-47df-939f-57487c53c5ef/true