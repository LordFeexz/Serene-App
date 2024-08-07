## API Reference

# User Endpoint

#### Register

```http
  Post /user/register
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `username` | `string` | **Required**. |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

_Response (201 - SUCCESS)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "id": "string",
    "username": "string",
    "email": "string",
    "is_verified": "boolean",
    "created_at": "date",
    "updated_at": "date"
  }
}
```

_Response (409 - Conflict)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "email sudah terdaftar | username sudah terdaftar"
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "status": "Bad Request",
  "message": "validation error",
  "data": {
    "Email": "Email is required",
    "Password": "Password is required",
    "Username": "Username is required"
  }
}
```

#### Login

```http
  Post /user/login
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "credentials tidak ditemukan | akun mu belum di verifikasi"
}
```

#### Resend Email

```http
  Post /user/resend-email
```

| Body    | Type     | Description   |
| :------ | :------- | :------------ |
| `email` | `string` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": null
}
```

_Response (409 - Conflict)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "pengguna sudah diverifikasi"
}
```

_Response (404 - Not Found)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "data tidak ditemukan"
}
```

#### Resend Email

```http
  Get /user/
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "id":"string",
    "username":"string"
    "email":"string",
    "is_verified":"boolean",
    "created_at":"date",
    "updated_at":"date"
  }
}
```

# Test Endpoint

#### Get Mental Health Question

```http
  Get /test/mental-health
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": [
    "string",
    "string",
    ...
  ]
}
```

#### Get Mental Health Result

```http
  Post /test/mental-health
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

**type answer**

```json
{
  "question": "string",
  "answer": "boolean"
}
```

| Body     | Type              | Description   |
| :------- | :---------------- | :------------ |
| `result` | `array of answer` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "motivation": "string",
    "result": "integer"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "status": "Bad Request",
  "message": "validation error",
  "data": {
    "Result": "Result is required"
  }
}
```

```json
{
  "code": 400,
  "status": "Bad Request",
  "message": "string",
  "data": null
}
```

# Mood Endpoint

#### Get Mood List

```http
  Get /mood
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": [
        {
            "created_at": "date",
            "id": "integer",
            "image_url": "string",
            "name": "string",
            "updated_at": "date"
        },
        ...
      ]
}
```

#### Create Today Mood

```http
  Post /mood
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

| Body        | Type          | Description   |
| :---------- | :------------ | :------------ |
| `date`      | `string/date` | **Optional**. |
| `mood_name` | `string`      | **Required**. |

_Response (400 - BAD REQUEST)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "MoodName": "string"
  }
}
```

_Response (201 - CREATED)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "id": "integer",
    "user_id": "string",
    "mood_id": "integer",
    "date": "string/date",
    "created_at": "string/date",
    "updated_at": "string/date"
  }
}
```

_Response (409 - Conflict)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string"
}
```

#### List User Mood

```http
  Post /mood/me
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

| Query   | Type   | Description                 |
| :------ | :----- | :-------------------------- |
| `month` | `uint` | **Optional**. (Default now) |
| `year`  | `uint` | **Required**. (Default now) |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": [
    {
      "created_at": "string/null",
      "date": "string/date",
      "id": "integer/null",
      "image_url": "string/null",
      "mood_id": "integer/null",
      "name": "string/null",
      "updated_at": "string/null",
      "user_id": "string/null"
    },
    ...
  ]
}
```

#### List User Mood

```http
  Post /mood/me/:date
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

| Params | Type     | Description                              |
| :----- | :------- | :--------------------------------------- |
| `date` | `string` | **Required**. (if invalid,default today) |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "created_at": "string/null",
    "date": "string/date",
    "id": "integer/null",
    "image_url": "string/null",
    "mood_id": "integer/null",
    "name": "string/null",
    "updated_at": "string/null",
    "user_id": "string/null"
  }
}
```

# History Endpoint

#### Get My History List

```http
  Get /history
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

| Query            | Type      | Description   |
| :--------------- | :-------- | :------------ |
| `page`           | `integer` | **Optional**. |
| `limit`          | `integer` | **Optional**. |
| `sort_by`        | `string`  | **Optional**. |
| `sort_direction` | `string`  | **Optional**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": [
        {
            "id": "integer",
            "feature_used": "string",
            "description": "string",
            "user_id": "string",
            "created_at": "date",
            "updated_at": "date"
        },
        ...
      ]
}
```

_Response (404 - Not Found)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string"
}
```

# Assets Endpoint

#### Get Emote by name

```http
  Get /assets/emote/${name}
```

```txt
  return file
```

#### Get Therapy Video List

```http
  Get /assets/therapy-video
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": [
        {
            "title": "string",
            "url": "string",
            "v": "string"
        },
        ...
      ]
}
```

#### Get One Therapy Video

```http
  Get /assets/therapy-video/:v
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

| Params | Type     | Description   |
| :----- | :------- | :------------ |
| `v`    | `string` | **Required**. |

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "title": "string",
    "url": "string",
    "v": "string"
  }
}
```

# Location Endpoint

#### Get Nearby Clinic

```http
  Get /location/clinic
```

| Headers         | Type     | Description   |
| :-------------- | :------- | :------------ |
| `authorization` | `string` | **Required**. |

| Query        | Type      | Description                               |
| :----------- | :-------- | :---------------------------------------- |
| `lat`        | `float`   | **Required**.                             |
| `lng`        | `float`   | **Required**.                             |
| `radius`     | `integer` | **Optional**. (Default 5Km)               |
| `page_token` | `string`  | **Optional**. (Get From Previous Request) |

_Response (400 - Bad Request)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "Latitude": "string",
    "Longitude": "string"
  }
}
```

_Response (200 - OK)_

```json
{
  "status": "string",
  "code": "integer",
  "message": "string",
  "data": {
    "next_page_token": "string",
    "clinics": [
      {
        "id": "string",
        "place_id": "string",
        "name": "string",
        "icon": "string",
        "rating": "float",
        "vicinity": "string",
        "geometry": {
          "location": {
            "lat": "float",
            "lng": "float"
          },
          "location_type": "string",
          "bounds": {
            "northeast": {
              "lat": "float",
              "lng": "float"
            },
            "southwest": {
              "lat": "float",
              "lng": "float"
            }
          },
          "viewport": {
            "northeast": {
              "lat": "float",
              "lng": "float"
            },
            "southwest": {
              "lat": "float",
              "lng": "float"
            }
          },
          "types": null,
          "distance":"string"
        }
      }
    ],
    ...
  }
}
```
