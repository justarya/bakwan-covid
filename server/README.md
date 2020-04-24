# Server

* [Global Dependencies for Development](#global-depedencies-for-development)
* [Dependencies](#dependencies)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [API Documentation](#api-documentation)
* [Another Error](#another-error)
* [License](#license)

## **Global Depedencies for Development**

* [Nodemon](https://www.npmjs.com/package/nodemon)
* [serverless](https://www.npmjs.com/package/serverless)

## **Dependencies**

> List of all dependencies

* [serverless-offline](https://www.npmjs.com/package/serverless-offline)
* [serverless-http](https://www.npmjs.com/package/serverless-http)
* [morgan](https://www.npmjs.com/package/morgan)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [cors](https://www.npmjs.com/package/cors)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)

## **Installation**

Enter to the folder and install all `Dependencies`

```bash
$ npm install
# OR
$ yarn
```  

## **Usage**

### Running server

```bash
$ npm run dev
# OR
$ yarn dev
```

#### **Base Url default**  

> `http://localhost:3000/dev`  

## **API Documentation**

## **Users**

* ### **Sign Up**

  > **Method** : `POST`  
  > **Endpoint** : `/user/signup`
  > **Authentication** : `true`
  > **Authorization** : `Admin`

  **_Request_** :
  * body:

    ```javascript
    {
      "username": String(required),
      "password": String(required),
    }
    ```

  **_Response Body_** :
  * 201

    ```json
    {
      "username": "justarya",
      "role": 0,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

  * 400

    ```json
    {
      "code": 400,
      "message": [
        "Username required!",
        "Password required!"
        "Username has already been taken!",
      ]
    }

* ### Sign In

  > **Method** : `POST`  
  > **Endpoint** : `/user/signin`

  **_Request_** :
  * body:

    ```javascript
    {
      "username": String(required),
      "password": String(required)
    }
    ```

  **_Response Body_** :
  * 201

    ```json
    {
      "username": "justarya",
      "role": 0,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }
    ```

  * 404

    ```json
    {
      "code": 404,
      "message": "Wrong username / password"
    }
    ```

* ### Get User

  > **Method** : `GET`  
  > **Endpoint** : `/user`  
  > **Authentication** : `true`

  **_Response Body_** :
  * 200

    ```json
    {
      "username": "justarya",
      "hospitals": [
        {
          "name": "RS Gatot Subroto",
          "contact_numbers": ["6123928379290"],
          "email": "contact@gatot.com",
          "location": "Jln. Gatot Subtroto",
        },
      ]
    }
    ```

  * 404

    ```json
    {
      "code": 404,
      "message": "User not found"
    }
    ```

* ### Edit User

  > **Method** : `PUT`  
  > **Endpoint** : `/user/:id`  
  > **Authentication** : `true`  
  > **Authorization** : `Admin`

  **_Request Body_** :

  * body:

    ```javascript
    {
      "username": String(required),
      "password": String(required)
    }
    ```

  **_Response Body_** :
  * 200

    ```json
    {
      "username": "justarya",
    }
    ```

  * 404

    ```json
    {
      "code": 404,
      "message": "User not found"
    }
    ```

## Hospital

* ### Create Hospital

  > **Method** : `POST`  
  > **Endpoint** : `/hospital`  
  > **Authentication** : `true`

  **_Request Body (Admin)_** :

  ```json
  {
    "userId": "91231923129",
    "name": "RS Gatot Subroto",
    "contact_numbers": ["6123928379290"],
    "email": "contact@gatot.com",
    "location": "Jln. Gatot Subtroto",
  }
  ```

  **_Request Body (normal user)_** :

  ```json
  {
    "name": "RS Gatot Subroto",
    "contact_numbers": ["6123928379290"],
    "email": "contact@gatot.com",
    "location": "Jln. Gatot Subtroto",
  }
  ```

  **_Response Body_** :
  * 200

    ```json
    {
      "name": "RS Gatot Subroto",
      "contact_numbers": ["6123928379290"],
      "email": "contact@gatot.com",
      "location": "Jln. Gatot Subtroto",
    }
    ```

  * 400

    ```json
    {
      "code": 400,
      "message": [
        "Name cannot be empty",
        "Contact Number cannot be empty",
      ],
    }
    ```

* ### Get all Hospital

  > **Method** : `GET`  
  > **Endpoint** : `/hospital`  
  > **query** :
  >
  > * `search`: `String` (for field: `name`, `location`)
  > * `size`: `Number`
  > * `page`: `Number`

  **_Response Body_** :
  * 200

    ```json
    {
      "list": [
        {
          "name": "RS Gatot Subroto",
          "contact_numbers": ["6123928379290"],
          "email": "contact@gatot.com",
          "location": "Jln. Gatot Subtroto",
          "supplies": [
            {
              "product_name": "Face Mask 3M",
              "demand_unit": "",
              "demand": 100,
            }
          ]
        }
      ]
    }
    ```

* ### Get Hospital

  > **Method** : `GET`  
  > **Endpoint** : `/hospital/:id`

  **_Response Body_** :
  * 200

    ```json
    {
      "name": "RS Gatot Subroto",
      "contact_numbers": ["6123928379290"],
      "email": "contact@gatot.com",
      "location": "Jln. Gatot Subtroto",
      "supplies": [
        {
          "product_name": "Face Mask 3M",
          "demand_unit": "",
          "demand": 100,
        }
      ]
    }
    ```

  * 404

    ```json
    {
      "code": 404,
      "message": "Hospital Not Found",
    }
    ```

* ### Edit Hospital

  > **Method** : `PUT`  
  > **Endpoint** : `/hospital/:id`
  > **Authentication** : `true`
  > **Authorization** : `User with access`

  **_Response Body_** :
  * 200

    ```json
    {
      "name": "RS Gatot Subroto",
      "contact_numbers": ["6123928379290"],
      "email": "contact@gatot.com",
      "location": "Jln. Gatot Subtroto",
    }
    ```

  * 404

    ```json
    {
      "code": 404,
      "message": "Hospital Not Found",
    }
    ```

* ### Delete Hospital

  > **Method** : `DELETE`  
  > **Endpoint** : `/hospital/:id`  
  > **Authentication** : `true`
  > **Authorization** : `Admin`

  **_Response Body_** :

  * 200

    ```json
    {
      "success": true,
    }
    ```

  * 404

    ```json
    {
      "code": 404,
      "message": "Hospital Not Found",
    }
    ```

## Hospital Supplies

* ### Get all Hospital Supply

  > **Method** : `GET`  
  > **Endpoint** : `/hospital/:id/supplies`  
  > **Authentication** : `true`
  > **query** :
  >
  > * `search`: `String` (for field: `product name`)

  **_Response Body_** :
  * 200

    ```json
    [
      {
        "_id": "581ehj9128ehj19e8h12e98",
        "product_name": "Face Mask 3M",
        "demand_unit": "",
        "demand": 100,
      }
    ]
    ```
  
* ### Create Hospital Supply

  > **Method** : `POST`  
  > **Endpoint** : `/hospital/:id/supplies`  
  > **Authentication** : `true`

  **_Request Body_** :

  ```json
  {
    "product_name": "Face Mask 3M",
    "demand_unit": "",
    "demand": 100,
  }
  ```

  **_Response Body_** :

  * 200

    ```json
    {
      "_id": "581ehj9128ehj19e8h12e98",
      "product_name": "Face Mask 3M",
      "demand_unit": "",
      "demand": 100,
    }
    ```

  * 400

    ```json
    {
      "code": 400,
      "message": [
        "Product Name cannot be empty",
      ],
    }
    ```

* ### Edit Hospital Supply

  > **Method** : `PUT`  
  > **Endpoint** : `/hospital/:id/supplies/:id`  
  > **Authentication** : `true`

  **_Request Body_** :

  ```json
  {
    "product_name": "Face Mask 3M",
    "demand_unit": "",
    "demand": 100,
  }
  ```

  **_Response Body_** :
  * 200

    ```json
    {
      "product_name": "Face Mask 3M",
      "demand_unit": "",
      "demand": 100,
    }
    ```

  * 400

    ```json
    {
      "code": 400,
      "message": [
        "Product Name cannot be empty",
      ],
    }
    ```

  * 404

    ```json
    {
      "code": 400,
      "message": [
        "Hospital Supply not found",
      ],
    }
    ```

* ### Delete Hospital Supply

  > **Method** : `Delete`  
  > **Endpoint** : `/hospital/:id/supplies/:id`  
  > **Authentication** : `true`

  **_Response Body_** :
  * 200

    ```json
    {
      "success": true,
    }
    ```

  * 404

    ```json
    {
      "code": 400,
      "message": [
        "Hospital Supply not found",
      ],
    }
    ```

## Another Error

* Our mistake report this error as issue

  ```json
  {
    "code": 500,
    "message": "Internal server error :("
  }
  ```
  
## Special Thanks to

[Express User Template](https://github.com/havus/express-user-template)
