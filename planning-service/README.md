# planning-service

Microservice responsible for managing the academic schedule (planning) within the CampusOps distributed application. Part of `projet-fin-semestre-distributed-app`.

---

## Stack

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL
- Lombok
- Maven

---

## Running the service

```bash
./mvnw spring-boot:run
```

Default port: `8082`

---

## Package structure

```
com.campusops.planning_service
├── controller
│   └── PlanningController.java
├── dto
│   ├── SlotRequestDTO.java
│   ├── SlotResponseDTO.java
│   └── SlotFilterDTO.java
├── model
│   └── Slot.java
├── repository
│   └── SlotRepository.java
├── service
│   ├── SlotService.java
│   └── SlotServiceImpl.java
├── exception
│   ├── SlotNotFoundException.java
│   └── GlobalExceptionHandler.java
└── PlanningServiceApplication.java
```

---

## Data model

A `Slot` represents a scheduled time block with the following fields:

| Field | Type | Description |
|---|---|---|
| `id` | Long | Auto-generated primary key |
| `date` | LocalDate | Date of the slot |
| `startTime` | LocalTime | Start time |
| `endTime` | LocalTime | End time |
| `module` | String | Subject / course name |
| `groupe` | String | Student group |
| `enseignant` | String | Teacher name |
| `salle` | String | Room |

---

## API Endpoints

Base URL: `/api/slots`

### Create a slot

```
POST /api/slots
```

Request body:
```json
{
  "date": "2025-03-17",
  "startTime": "08:00",
  "endTime": "10:00",
  "module": "Distributed Systems",
  "groupe": "G1",
  "enseignant": "Dr. Alaoui",
  "salle": "Salle A"
}
```

Response: `201 Created` with the created slot including its `id`.

---

### Update a slot

```
PUT /api/slots/{id}
```

Same request body as create. Returns `200 OK` with the updated slot.

---

### Delete a slot

```
DELETE /api/slots/{id}
```

Returns `204 No Content`. Returns `404` if the slot does not exist.

---

### Get a slot by ID

```
GET /api/slots/{id}
```

Returns `200 OK` with the slot. Returns `404` if not found.

---

### Get all slots

```
GET /api/slots
```

Returns `200 OK` with an array of all slots.

---

### Filter slots

```
GET /api/slots/filter
```

All query parameters are optional and can be combined:

| Parameter | Type | Description |
|---|---|---|
| `day` | `yyyy-MM-dd` | Return slots for a specific day |
| `weekStart` | `yyyy-MM-dd` | Return slots for the 7-day week starting on this date |
| `groupe` | String | Filter by student group |
| `enseignant` | String | Filter by teacher |
| `etudiant` | String | Filter by student (passed to service layer) |

Examples:

```
GET /api/slots/filter?day=2025-03-17
GET /api/slots/filter?weekStart=2025-03-17
GET /api/slots/filter?weekStart=2025-03-17&groupe=G1
GET /api/slots/filter?enseignant=Dr.%20Alaoui
```

---

## Error responses

All errors return a consistent JSON body:

```json
{
  "timestamp": "2025-03-17T10:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Slot not found with id: 42"
}
```

| Status | Cause |
|---|---|
| `400` | Validation failure on request body |
| `404` | Slot not found by ID |
| `500` | Unexpected server error |

---

## Sprint — 1 hour

This service was built in a single focused sprint. Below is the task breakdown that was followed.

### Slot management (23 min)

| Task | Time |
|---|---|
| Create a slot — form, fields, state wiring | 10 min |
| Edit a slot — pre-fill form, save changes | 8 min |
| Delete a slot — confirm + remove from state | 5 min |

### Associations (15 min)

| Task | Time |
|---|---|
| Link module, groupe, enseignant, salle, horaire to each slot | 15 min |

### Views (22 min)

| Task | Time |
|---|---|
| Day view — single-day timeline filtered by date | 8 min |
| Week view — 7-column grid mapped by day | 10 min |
| Filter by student / group / teacher | 4 min |

**Total: 60 min**

---

## Related services

- `auth-service` — handles authentication and user roles (`com.campusops.auth`)