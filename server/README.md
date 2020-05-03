# Server

* [Global Dependencies for Development](#global-depedencies-for-development)
* [Dependencies](#dependencies)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [API Documentation](#api-documentation)
* [Another Error](#another-error)
* [License](#license)

## What you need before development

* MongoDB
* NodeJS
* Git

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

### Running server Serverless

```bash
$ npm run dev:sls
# OR
$ yarn dev:sls
```

#### **Base Url default**  

> `http://localhost:3000/`  

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
              "product": "5278190q8dm8913e129e23",
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
          "product": "5278190q8dm8913e129e23",
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
        "product": "5278190q8dm8913e129e23",
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
    "product": "5278190q8dm8913e129e23",
    "demand": 100,
  }
  ```

  **_Response Body_** :

  * 200

    ```json
    {
      "_id": "581ehj9128ehj19e8h12e98",
      "product": "5278190q8dm8913e129e23",
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
    "product": "5278190q8dm8913e129e23",
    "demand": 100,
  }
  ```

  **_Response Body_** :
  * 200

    ```json
    {
      "product": "5278190q8dm8913e129e23",
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

## Product

* ### Get all Product

  > **Method** : `GET`  
  > **Endpoint** : `/product`  
  > **Authentication** : `true`
  > **query** :
  >
  > * `search`: `String` (for field: `product name`)
  > * `size`: `Number`
  > * `page`: `Number`

  **_Response Body_** :
  * 200

    ```json
    [
      {
        "_id": "581ehj9128ehj19e8h12e98",
        "name": "Face Mask 3M",
        "unit": ""
      }
    ]
    ```
  
* ### Create Product

  > **Method** : `POST`  
  > **Endpoint** : `/product`  
  > **Authentication** : `true`

  **_Request Body_** :

  ```json
  {
    "name": "Face Mask 3M",
    "unit": ""
  }
  ```

  **_Response Body_** :

  * 200

    ```json
    {
      "_id": "581ehj9128ehj19e8h12e98",
      "name": "Face Mask 3M",
      "unit": ""
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

* ### Edit Product

  > **Method** : `PUT`  
  > **Endpoint** : `/product/:productId`  
  > **Authentication** : `true`

  **_Request Body_** :

  ```json
  {
    "name": "Face Mask 3M",
    "unit": ""
  }
  ```

  **_Response Body_** :
  * 200

    ```json
    {
      "name": "Face Mask 3M",
      "unit": ""
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
        "Product not found",
      ],
    }
    ```

* ### Delete Product

  > **Method** : `Delete`  
  > **Endpoint** : `/product/:productId`  
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
        "Product not found",
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
































        
        
        
        
        
base URL: http://localhost:3000/dev/

1.  (Get Hospital Record)
    Method: 'GET'
    Endpoint: 'records/hospital'
    Authenticated: true

    Respons Body:
    200

    [
        {
            "_id": "5eadbb2f74d8ba527779489d",
            "collectionType": "Hospital",
            "referenceDocument": {
                "users": [
                    "5eadbb2e74d8ba527779489a"
                ],
                "supplies": [],
                "contact_numbers": [
                    "085678909876 (Dr. Dina Usaurus)"
                ],
                "_id": "5eadbb2f74d8ba527779489c",
                "name": "RS Harapan Kita",
                "email": "admin@harapankita.hospital.id",
                "location": "Jalan Gatot Subroto, no.56, Menteng, Jakarta Selatan, DKI Jakarta",
                "createdAt": "2020-05-02T18:25:51.704Z",
                "updatedAt": "2020-05-02T18:25:51.704Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:25:51.912Z",
            "__v": 0
        },
        {
            "_id": "5eadbb9574d8ba52777948a2",
            "collectionType": "Hospital",
            "referenceDocument": {
                "users": [
                    "5eadbb8b74d8ba527779489e"
                ],
                "supplies": [],
                "contact_numbers": [
                    "086576787678 (Dr. Fx Prayitno)"
                ],
                "_id": "5eadbb9474d8ba52777948a1",
                "name": "RS Siloam Bandung",
                "email": "admin@siloam-bandung.hospital.id",
                "location": "Jalan Teuku Umar, no.37, Bandung Selatan, Kota Bandung",
                "createdAt": "2020-05-02T18:27:33.104Z",
                "updatedAt": "2020-05-02T18:27:33.104Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:27:33.356Z",
            "__v": 0
        }
    ]


2.  (Get Product Record)
    Method: 'GET'
    Endpoint: 'records/product'
    Authenticated: true

    Respons Body:
    200

    [
        {
            "_id": "5eadbd5474d8ba52777948a4",
            "collectionType": "Product",
            "referenceDocument": {
                "unit": "pcs",
                "_id": "5eadbd5474d8ba52777948a3",
                "name": "Hazmat",
                "createdAt": "2020-05-02T18:35:00.247Z",
                "updatedAt": "2020-05-02T18:35:00.247Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:35:00.468Z",
            "__v": 0
        },
        {
            "_id": "5eadbd5d74d8ba52777948a6",
            "collectionType": "Product",
            "referenceDocument": {
                "unit": "pcs",
                "_id": "5eadbd5c74d8ba52777948a5",
                "name": "Masker",
                "createdAt": "2020-05-02T18:35:08.623Z",
                "updatedAt": "2020-05-02T18:35:08.623Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:35:09.280Z",
            "__v": 0
        },
        {
            "_id": "5eadbd6a74d8ba52777948a8",
            "collectionType": "Product",
            "referenceDocument": {
                "unit": "pcs",
                "_id": "5eadbd6974d8ba52777948a7",
                "name": "Ventilator",
                "createdAt": "2020-05-02T18:35:21.973Z",
                "updatedAt": "2020-05-02T18:35:21.973Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:35:22.182Z",
            "__v": 0
        }
    ]

3.  (Get User Record)
    Method: 'GET'
    Endpoint: 'records/user'
    Authenticated: true

    Respons Body:
    200

    [
        {
            "_id": "5eadbb2f74d8ba527779489b",
            "collectionType": "User",
            "referenceDocument": {
                "role": 0,
                "_id": "5eadbb2e74d8ba527779489a",
                "username": "admin-harapankita-jakarta",
                "password": "$2a$10$8hb4agunAePDk2REUaKhGOhPLG7bM8ASlQxZd1zrbTsMFw0v7cIqG",
                "createdAt": "2020-05-02T18:25:50.884Z",
                "updatedAt": "2020-05-02T18:25:50.884Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:25:51.224Z",
            "__v": 0
        },
        {
            "_id": "5eadbb8c74d8ba527779489f",
            "collectionType": "User",
            "referenceDocument": {
                "role": 0,
                "_id": "5eadbb8b74d8ba527779489e",
                "username": "admin-siloam-bandung",
                "password": "$2a$10$KxqdQX6rgfBa73Aio0RDheN.lRuutSyXYrcoY8IqvpF6fqnaJ2skC",
                "createdAt": "2020-05-02T18:27:23.852Z",
                "updatedAt": "2020-05-02T18:27:23.852Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:27:24.182Z",
            "__v": 0
        }
    ]

3.  (Get Hopital Supply Record)
    Method: 'GET'
    Endpoint: 'records/hospitalsupply'
    Authenticated: true

    Respons Body:
    200

    [
        {
            "_id": "5eadbf2174d8ba52777948b2",
            "collectionType": "Hospital Supply",
            "referenceDocument": {
                "_id": "5eadbf2174d8ba52777948b1",
                "product": "5eadbd6974d8ba52777948a7",
                "demand": 3,
                "createdAt": "2020-05-02T18:42:41.571Z",
                "updatedAt": "2020-05-02T18:42:41.571Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:42:41.808Z",
            "__v": 0
        },
        {
            "_id": "5eadbf2e74d8ba52777948b5",
            "collectionType": "Hospital Supply",
            "referenceDocument": {
                "_id": "5eadbf2d74d8ba52777948b4",
                "product": "5eadbd8374d8ba52777948ab",
                "demand": 5,
                "createdAt": "2020-05-02T18:42:53.870Z",
                "updatedAt": "2020-05-02T18:42:53.870Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:42:54.084Z",
            "__v": 0
        },
        {
            "_id": "5eadbf3774d8ba52777948b8",
            "collectionType": "Hospital Supply",
            "referenceDocument": {
                "_id": "5eadbf3774d8ba52777948b7",
                "product": "5eadbd9674d8ba52777948ad",
                "demand": 7,
                "createdAt": "2020-05-02T18:43:03.430Z",
                "updatedAt": "2020-05-02T18:43:03.430Z"
            },
            "action": "Created",
            "createdAt": "2020-05-02T18:43:03.642Z",
            "__v": 0
        }
    ]

3.  (Get Hopital Supply Record - Single Product)
    Method: 'GET'
    Endpoint: 'records/hospitalsupply/:hospitalSupplyId'
    Authenticated: true

    Respons Body:
    200

    [
        {
            "name": "Hazmat",
            "demand_before": 0,
            "demand_after": 2,
            "description": "ditambahkan"
        },
        {
            "name": "Hazmat",
            "demand_before": 2,
            "demand_after": 3,
            "description": "diubah"
        },
        {
            "name": "Hazmat",
            "demand_before": 3,
            "demand_after": 1,
            "description": "diubah"
        },
        {
            "name": "Hazmat",
            "demand_before": 1,
            "demand_after": 0,
            "description": "dihapus"
        }
    ]

4.  (Get Hopital Supply Record - Based on HopitalId)
    Method: 'GET'
    Endpoint: 'records/hospital/:hospitalId'
    Authenticated: true

    Respons Body:
    200

    [
      {
          "Masker": [
              {
                  "name": "Masker",
                  "demand_before": 0,
                  "demand_after": 3,
                  "description": "ditambahkan"
              },
              {
                  "name": "Masker",
                  "demand_before": 3,
                  "demand_after": 8,
                  "description": "diubah"
              }
          ]
      },
      {
          "Ventilator": [
              {
                  "name": "Ventilator",
                  "demand_before": 0,
                  "demand_after": 4,
                  "description": "ditambahkan"
              }
          ]
      },
      {
          "Hand Sanitizer": [
              {
                  "name": "Hand Sanitizer",
                  "demand_before": 0,
                  "demand_after": 3,
                  "description": "ditambahkan"
              },
              {
                  "name": "Hand Sanitizer",
                  "demand_before": 3,
                  "demand_after": 10,
                  "description": "diubah"
              }
          ]
      }
    ]