# MobileEventsApp
This is mobile app created in React Native. The idea behind it is to find events on map and read more about them. User can also create an account.
Owning the account enables creating new events and bookmark the most interesting.

## Story
I was curious how mobile development looks like. It is my first mobile app project. I'm aware that it's not perfect and some things could be done better
or improved with more features. But I'm still glad that I designed this project in Figma and completed this project by myself. 
Now, I have wider perspective and satisfaction that I tried sth different. 

## Used Technologies
- React Native(managed workflow expo)
- Typescript
- MongoDB
- mongoose
- express
- react-hook-form
- react-native-maps
- yup
- axios
- jsonwebtoken
- bcrypt
- dotenv
- cors
- nodemon
- concurrently
- jest

## API

### Open Endpoints

- Get all events: ```GET /events```

- Get event: ```GET /events/${id}```

### Endpoints that require Authentication
Require a valid token included in the header of the request.

- Create event: ```POST /events```

- Follow event: ```PATCH /followed-events```

- Get followed events: ```GET /followed-events```

### Account related

- Create account: ```POST /signup```

- Log in to account: ```POST /login```

- Get authenticated user: ```GET /users/current```
