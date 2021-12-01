# Library Api Rest

### For Usage

Create a .env file on the main folder where define the variables:

- NODE_ENV
  - Then environment of the api
- PORT
  - The port where you want to deploy the api
- MONGODB_URI:
  - The url of your MongoDB Cluster
- JWT_SECRET_WORD:
  - The secret word used by JsonWebToken
- JWT_EXPIRE:
  - The expiration time of the token

### Endpoints

#### Auth

`POST /user/register`
Save an user in the database and returns an identification token

###### Request

```
{
  body:{
    firstname* : String,
    lastname* : String,
    username* : String,
    email* : String,
    password* : String,
  }
}
```

###### Respose

```
{
  status : Number,
  data : {
    id: uuid,
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    token: String / JWT,
  }
}
```

---

`POST /user/login`
Search an user in the database and returns the user and an identification token

###### Request

```
{
  body*:
    email* : String,
    password* : String,
}
```

###### Response

```
{
  status : Number
  data : {
    id: uuid,
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    token: String / JWT,
  }
}
```

---

#### User

`GET /user/`
Search the user by the provided token given in Authorization header

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  }
}
```

###### Response

```
{
  status : Number
  data : {
    id: uuid,
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    token: String / JWT
  }
}
```

---

#### Authors

`GET /author`
Returns the list of authors in the database

###### Request

```
{
  headers:{
    Authorization* : String / JWT
  }
}
```

###### Response

```
{
  status: Number
  data:[{
    _id: uuid,
    firstname: String,
    lastname: String,
  }]
}
```

---

`POST /author`
Save an author in the database

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
  body: {
    firstname* : String,
    lastname* : String
  }
}
```

###### Response

```
{
  status: Number,
  data: {
    _id: uuid,
    firstname: String,
    lastname: String
  }
}
```

---

`GET /author/:id`
Search an author by his id.

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
}
```

###### Response

```
{
  status: Number,
  data: {
    _id: uuid,
    firstname: String,
    lastname: String
  }
}
```

---

`PUT /author/:id`

Updates an author by his id

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
  body:{
    firstname: String,
    Lastname: String
  }
}
```

###### Response

```
{
  status: Number,
  data: {
    _id: uuid,
    firstname: String,
    lastname: String
  }
}
```

---

`DELETE /author/:id`

Deletes an author from the database

###### Request

```
{
  headers: {
      Authorization* : String / JWT
    },
}
```

###### Response

```
{
  status: Number,
  data: "Author deleted"
}

```

---

### Books

`GET /books`

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
}
```

###### Response

```
{
  status: Number,
  data:[
    {
      author: {
        id: uuid,
        fullName: String
      },
      _id: uuid,
      title: String,
      description: String,
      price: Number,
      img: String,
      publishedAt: Date,
      __v: Number
    }
  ],
}
```

---

`POST /books`

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
  body:{
    author* : {
      id* : uuid,
      fullName* : String
    },
    title* : String,
    description : String,
    price : Number,
    img* : String,
  }
}
```

###### Response

```
{
  status: Number,
  data:{
    author: {
      id: uuid,
      fullName: String
    },
    _id: uuid,
    title: String,
    description: String,
    price: Number,
    img: String,
    publishedAt: Date,
    __v: Number
  },
}
```

---

`GET /books/:id`

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
}
```

###### Response

```
{
  status: Number,
  data:{
    author: {
      id: uuid,
      fullName: String
    },
    _id: uuid,
    title: String,
    description: String,
    price: Number,
    img: String,
    publishedAt: Date,
    __v: Number
  },
}
```

---

`PUT /books/:id`

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
  body:{
    author* : {
      id* : uuid,
      fullName* : String
    },
    title* : String,
    description : String,
    price : Number,
    img* : String,
  }
}
```

###### Response

```
{
  status: Number,
  data:{
    author: {
      id: uuid,
      fullName: String
    },
    _id: uuid,
    title: String,
    description: String,
    price: Number,
    img: String,
    publishedAt: Date,
    __v: Number
  },
}
```

---

`DELETE /books/:id`

###### Request

```
{
  headers: {
    Authorization* : String / JWT
  },
}
```

###### Response

```
{
  status: Number,
  data: "Book Deleted"
}
```

---
