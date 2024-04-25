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

method | route | auth | description

Login
```bash
POST /api/auth/login/ | common | Login qismi
query {}
body {
    _id: autogenereted,
    username: {
    	type: String,
		required: true,
	    unique: true,
    },
    password: {
    	type: String,
    	required: true,
    }
}
```

Admin
```bash
GET /api/admin/profile | admin | Admin profili
query {}
body {}

PUT /api/admin/settings/change-username | admin | Username-ni o\'zgartirsh
query {}
body {
    username: {
        type: String,
        required: true,
    }
}
response {
    message : "",
    newToken: new token,
    data: Updated Admin,
}

PUT /api/admin/settings/change-password | admin | Parolni o\'zgartirsh
query {}
body {
    password: {
        type: String,
        required: true,
    }
}
response {
    message : "",
    data: Updated Admin,
    newToken: new token,
}
```

News
```bash
GET /api/news/:id | common | ID orqali yangilikni olish
query {}
body {}

GET /api/news/for-admin/:id | common | ID orqali yangilikni olish Adminlar uchun
query {}
body {}

GET /api/news/ | common | Barcha yangiliklarni olish
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
    _id: autogenerated,
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
    views: autogenerated,
}

PUT /api/news/:id | admin | Yangilikni yangilash
query {}
body {
    _id: autogenerated,
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

DELETE /api/news/:id | admin | Yangilikni o\'chirish
query {}
body {}
```

Course
```bash
GET /api/course/:id | common | Kursni ID orqali olish
query {}
body {}

GET /api/course/ | common | Barcha kursni olish
query {}
body {}

POST /api/course/ | admin | Kurs yaratish
query {}
body {
  	_id: autogenerated,
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	teacher: {
	  	type: String,
	  	required: true,
	},
	scheduledTime: [
		{
		  type: String,
		  required: true,
		}
	],
	phoneNumber: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}

PUT /api/course/:id | admin | ID orqali kursni yangilash
query {}
body {
	_id: autogenerated,
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	}, 
	teacher: {
	  	type: String,
	  	required: true,
	},
	scheduledTime: [
		{
		  type: String,
		  required: true,
		}
	],
	phoneNumber: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}

DELETE /api/course/:id | admin | ID orqali o\'chirib tashlash
query {}
body {}
```

Events
```bash
GET /api/event/ | common | Barcha tadbirlarni olish
query {}
body {}

POST /api/event/ | admin | Tadbir yaratish
query {}
body {
  	_id: autogenerated,
  	title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    scheduledAt: {
        type: Date,
        required: true,
    }
}

PUT /api/event/:id | admin | ID orqali tadbirni yangilash
query {}
body {
  	_id: autogenerated,
	title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    scheduledAt: {
        type: Date,
        required: true,
    }
}

DELETE /api/event/:id | admin | ID orqali o\'chirish
query {}
body {}
```

Teacher
```bash
GET /api/teacher/ | common | Barcha o\'qituvchilarni olish
query {
	sortBy: {
		type: String,
		default: "firstSeniorPosition",
		enum: ["firstSeniorPosition", "firstLowerPosition"],
		doc: "Birinchi yuqori lavozim yoki pastki lavozim chiqishini ko\'rsatadi"
	},
	position: {
		type: Array,
		default: ["Direktor", "Direktor o\'rinbosari", "O\'qituvchi"],
		doc: "Qaysi lavozim egalarini chiqarishni ko\'rsatish kerak. Jami 3 ta lavozim bor. Lavozimlar: Direktor, Direktor o\'rinbosari, O\'qituvchi" 
	},
	page: {
		type: Number,
		default: 1,
		doc: "Page-lar soni"
	},
	limit: {
	  	type: Number,
	  	default: 10,
	  	doc: "O\'qituvchilar soni"
	}
}
body {}

POST /api/teacher/ | admin | O\'qituvchi yaratish
query {}
body {
  	_id: autogenerated
	firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        enum: ["Direktor", "Direktor o\'rinbosari", "O\'qituvchi"],
    },
    description: {
        type: String,
        required: true,
    },
}

PUT /api/teacher/:id | admin | ID orqali o\'qituvchini yangilash
query {}
body {
	_id: autogenerated
	firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        enum: ["Direktor", "Direktor o\'rinbosari", "O\'qituvchi"],
    },
    description: {
        type: String,
        required: true,
    },
}

DELETE /api/teacher/:id | admin | ID orqali o\'chirish
query {}
body {}
```

Library
```bash
GET /api/library/ | common | Barcha kitoblarni olish
query {
	limit: {
	  	type: Number,
	  	default: 10,
	  	doc: "O\'qituvchilar soni"
	},
	page: {
	  	type: Number,
	  	default: 1,
	  	doc: "Page-lar soni"
	},
	type: {
		type: String,
		default: "All",
		doc: "Kitobni turini ko'rsatasiz"
	}
}
body {}

POST /api/library/ | admin | Kitob chop etish
query {}
body {
  	_id: autogenerated,
	name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: ObjectId,
        ref: "TypeOfBook",
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
}

PUT /api/library/:id | admin | ID orqali kitobni yangilash
query {}
body {
  	_id: autogenerated,
  	name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: ObjectId,
        ref: "TypeOfBook",
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
}

DELETE /api/library/:id | admin | ID orqali kitobni o\'chirish
query {}
body {}
```

Upload
```bash
POST /api/upload/book | admin | Kitobni PDF shaklida yuklash
query {}
body {}
form-data {
  book: PDF_FILE,
}

POST /api/upload/image | admin | Rasm yuklash
query {}
body {}
form-data {
  image: IMG_FILE,
}
```