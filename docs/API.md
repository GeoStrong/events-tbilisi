# API Documentation

## Overview

This document describes the API routes available in the What'sOnTbilisi application.

## Authentication

Most API routes require authentication. Include the user's session token in the request (handled automatically by Supabase client).

## Routes

### Image Management

#### POST `/api/upload-image`

Generate a signed URL for uploading an image to Cloudflare R2.

**Authentication:** Required

**Request Body:**
```json
{
  "filePath": "string",
  "fileType": "string",
  "fileSize": number (optional)
}
```

**Response:**
```json
{
  "signedUrl": "string"
}
```

**Error Responses:**
- `400` - Missing required fields or invalid file type
- `401` - Authentication required
- `500` - Server error

---

#### POST `/api/get-image-signed-url`

Generate a signed URL for retrieving an image from Cloudflare R2.

**Authentication:** Required

**Request Body:**
```json
{
  "filePath": "string",
  "expiresIn": number (optional, default: 3600)
}
```

**Response:**
```json
{
  "signedUrl": "string"
}
```

**Error Responses:**
- `400` - Missing filePath or invalid path
- `401` - Authentication required
- `500` - Server error

---

#### POST `/api/delete-image`

Delete an image from Cloudflare R2.

**Authentication:** Required

**Request Body:**
```json
{
  "filePath": "string",
  "userId": "string" (optional, for authorization check)
}
```

**Response:**
```json
{
  "ok": true
}
```

**Error Responses:**
- `400` - Missing filePath
- `401` - Authentication required
- `403` - Authorization failed (user doesn't own the file)
- `500` - Server error

---

#### GET `/api/use-secret`

**WARNING:** This endpoint is for development only and should be removed or heavily restricted in production.

Get API key (masked in production).

**Authentication:** Required

**Response:**
```json
{
  "key": "string",
  "warning": "string"
}
```

**Error Responses:**
- `401` - Authentication required
- `403` - Not available in production

---

### Users

#### GET `/api/users`

Get list of users (implementation details in route file).

**Authentication:** May be required (check route implementation)

---

## Error Format

All error responses follow this format:

```json
{
  "error": {
    "type": "VALIDATION | AUTHENTICATION | AUTHORIZATION | NOT_FOUND | DATABASE | NETWORK | UNKNOWN",
    "message": "string",
    "stack": "string" (development only),
    "context": {} (development only)
  }
}
```

## Rate Limiting

Rate limiting may be implemented in the future. Current limits:
- Image upload: 10 requests per minute per user
- Image retrieval: 100 requests per minute per user

## File Upload Limits

- Maximum file size: 10MB
- Allowed file types: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`

