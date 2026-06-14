# Emergency Assistance API Documentation

Base URL:

```text
http://localhost:3001
```

Swagger UI:

```text
http://localhost:3001/api
```

## Overview

This backend exposes REST endpoints for:

- Authentication
- Users
- Emergency contacts
- SOS logs
- Emergency services
- First-aid categories
- First-aid tips
- Service types

Most endpoints currently do not enforce an auth guard at the controller level. The `/auth/me` endpoint expects a Bearer token from Supabase.

## Common Data Types

- `uuid`: string
- `string`: text value
- `number`: numeric value
- `boolean`: true/false

## Authentication

### `POST /auth/register`

Creates a Supabase auth user and a matching backend user row.

Request body:

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "supabase_user_id": "supabase-uuid",
    "phone_number": null,
    "location": null,
    "address": null,
    "blood_group": null,
    "allergies": null,
    "urgent_medical_notes": null,
    "created_at": "2026-06-07T00:00:00.000Z",
    "updated_at": "2026-06-07T00:00:00.000Z"
  }
}
```

### `POST /auth/login`

Signs in with Supabase and returns the session plus Supabase user object.

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:

```json
{
  "message": "Login successful",
  "session": {
    "access_token": "jwt-token",
    "refresh_token": "refresh-token"
  },
  "user": {
    "id": "supabase-uuid",
    "email": "john@example.com"
  }
}
```

### `GET /auth/me`

Returns the backend user row for the authenticated Supabase user.

Headers:

```text
Authorization: Bearer <supabase_access_token>
```

Response:

```json
{
  "id": "uuid",
  "full_name": "John Doe",
  "email": "john@example.com",
  "supabase_user_id": "supabase-uuid",
  "phone_number": "12345678",
  "location": "Phnom Penh",
  "address": null,
  "blood_group": "O+",
  "allergies": "Peanuts",
  "urgent_medical_notes": "Asthma",
  "created_at": "2026-06-07T00:00:00.000Z",
  "updated_at": "2026-06-07T00:00:00.000Z"
}
```

## Users

### `GET /users`

Returns all users ordered by newest first.

### `GET /users/:id`

Returns a single user with emergency contacts and SOS logs loaded.

### `PATCH /users/:id`

Updates a user profile.

Request body fields:

- `full_name`
- `email`
- `phone_number`
- `location`
- `address`
- `blood_group`
- `allergies`
- `urgent_medical_notes`

Example:

```json
{
  "full_name": "John Doe",
  "phone_number": 12345678,
  "location": "Phnom Penh",
  "blood_group": "O+",
  "allergies": "Peanuts",
  "urgent_medical_notes": "Asthma"
}
```

## User Emergency Contacts

### `POST /user-emergency-contacts`

Request body:

```json
{
  "user_id": "uuid",
  "name": "Mother",
  "phone_number": 12345678,
  "relationship": "Family"
}
```

### `GET /user-emergency-contacts`

Returns all emergency contacts.

### `GET /user-emergency-contacts/user/:userId`

Returns emergency contacts for a specific user.

### `PATCH /user-emergency-contacts/:id`

Updates an emergency contact.

### `DELETE /user-emergency-contacts/:id`

Deletes an emergency contact.

## SOS Logs

### `POST /sos-logs`

Creates an SOS log.

Request body:

```json
{
  "user_id": "uuid",
  "service_id": "uuid",
  "user_latitude": 11.5564,
  "user_longitude": 104.9282
}
```

### `GET /sos-logs/user/:userId`

Returns SOS logs for a specific user.

## Emergency Services

### `GET /emergency-services`

Returns active emergency services with their service type relation loaded.

### `GET /emergency-services/nearby?lat=...&lng=...`

Returns the closest active emergency services sorted by distance.

Example:

```text
/emergency-services/nearby?lat=11.5564&lng=104.9282
```

### `GET /emergency-services/:id`

Returns one emergency service with service type and SOS logs.

## First-Aid Categories

### `GET /first-aid-categories`

Returns all first-aid categories.

### `GET /first-aid-categories/:id`

Returns one category with its tips.

## First-Aid Tips

### `GET /first-aid-tips`

Returns all first-aid tips with category relation loaded.

### `GET /first-aid-tips/category/:categoryId`

Returns tips for a specific category.

### `GET /first-aid-tips/:id`

Returns one first-aid tip with category relation loaded.

## Service Types

### `GET /service-types`

Returns all service types.

### `GET /service-types/:id`

Returns one service type.

## Notes

- Validation is handled by NestJS `ValidationPipe`.
- The backend currently uses Swagger at `/api`.
- The auth flow is backed by Supabase, while user profile data is stored in Postgres.
