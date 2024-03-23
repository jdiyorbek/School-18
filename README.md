## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start
```

## Documentation

News
```bash
GET /api/news/:id | common | ID orqali yangilikni olish
query {}
body {}

GET /api/news/getAll | common | Barcha yangiliklarni olish
query {
    limit: {
        type: Number,
        default: 10,
        doc: "Yangiliklar soni"
    },
    page: {
        type: Number,
        default: 1,
        doc: "Page-lar soni"
    },
}
body {}


POST /api/news/ | admin | Yangilik chop etish uchun
query {}
body {
    _id: autogenereted,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: false,
        default: false,
    },
    views: autogenereted,
}

PUT /api/news/:id | admin | Yangilikni yangilash
query {}
body {
    _id: autogenereted,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: false,
        default: false,
    },
    views: autogenereted,
}

DELETE /api/news/:id | admin | Yangilikni o'chirish
query {}
body {}
```