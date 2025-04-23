## `(POST)`http://localhost:5000/api/client/login

***text-content: JSON***
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
request:
{
    "username": "Client209",
    "password": "Password123"
}
```

There are 5 levels of access, and 5 different responses per client.

- admin
- production_supervisor
- technical_supervisor
- operator
- technical

#### `201-Created`
#### `admin`
```json
x-powered-by : Expressauthorization
Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfbGV2ZWwiOiJhZG1pbiIsInByb2Nlc3MiOiJtYW50ZW5pbWllbnRvIiwidXNlcm5hbWUiOiJIZWN0b3IgTW9yZ2FkbyIsImlhdCI6MTc0NTAwMzIzOCwiZXhwIjoxNzQ1MDEwNDM4fQ.rvzj6JLTDNxQiWdiGM__ie5zVB-NXqsq3KAV6ovXwIY
content-type: application/json; 
charset=utf-8
response:
{
    "client": {
        "username": "client123",
        "access_level": "admin",
        "teams": [
            {
                "id": "bf92561b-108f-42bd-9191-c2eccee3d37e",
                "name": "team1",
                "status": false,
                "process": "process1"
            },
            {}
        ],
        "process": [
            {
                "id": "13d48e33-7df4-472e-9c2c-71fed3d7207b",
                "name": "team2",
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
x-powered-by : Expressauthorization
Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfbGV2ZWwiOiJhZG1pbiIsInByb2Nlc3MiOiJtYW50ZW5pbWllbnRvIiwidXNlcm5hbWUiOiJIZWN0b3IgTW9yZ2FkbyIsImlhdCI6MTc0NTAwMzIzOCwiZXhwIjoxNzQ1MDEwNDM4fQ.rvzj6JLTDNxQiWdiGM__ie5zVB-NXqsq3KAV6ovXwIY
content-type: application/json; 
charset=utf-8
response:
{
    "client": {
        "username": "Client2",
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
The client with the `access_level` as `operator` will only have access to the devices that are within the same `process` as the `client`.

```json
x-powered-by : Expressauthorization
Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfbGV2ZWwiOiJhZG1pbiIsInByb2Nlc3MiOiJtYW50ZW5pbWllbnRvIiwidXNlcm5hbWUiOiJIZWN0b3IgTW9yZ2FkbyIsImlhdCI6MTc0NTAwMzIzOCwiZXhwIjoxNzQ1MDEwNDM4fQ.rvzj6JLTDNxQiWdiGM__ie5zVB-NXqsq3KAV6ovXwIY
content-type: application/json; 
charset=utf-8
response:
{
    "client": {
        "username": "Client123",
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
x-powered-by : Expressauthorization
Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfbGV2ZWwiOiJhZG1pbiIsInByb2Nlc3MiOiJtYW50ZW5pbWllbnRvIiwidXNlcm5hbWUiOiJIZWN0b3IgTW9yZ2FkbyIsImlhdCI6MTc0NTAwMzIzOCwiZXhwIjoxNzQ1MDEwNDM4fQ.rvzj6JLTDNxQiWdiGM__ie5zVB-NXqsq3KAV6ovXwIY
content-type: application/json; 
charset=utf-8
response:
{
    "client": {
        "username": "JClient123",
        "access_level": "technical"
    }
}
```

***Bearer Token***
**Access:** parameters not found
#### `400-Bad Request`
```json
x-powered-by : Expressauthorization
content-type: application/json; 
charset=utf-8
response:
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
**Access:** Token invalid
#### `401-Unauthorized`
```json
x-powered-by: Express
content-type: application/json; charset=utf-8
content-length: 90
response:
{
    "message": "Credentials are not valid (username)",
    "error": "Unauthorized",
    "statusCode": 401
}
```

- password not valid

```json
{
    "message": "Credentials are not valid (password)",
    "error": "Unauthorized",
    "statusCode": 401
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
