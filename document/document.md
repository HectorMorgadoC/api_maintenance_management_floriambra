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