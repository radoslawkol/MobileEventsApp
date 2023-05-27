# MobileEventsApp

## Overview
This is mobile app created in React Native. The idea behind it is to find events on map and read more about them, also the user can bookmark the most interesting events. 
An account may be created by user, as well. It enables creating new events, setting their location, adding  details and information.

## Story
I built this app, because I was curious how mobile development differs from web programming. I decided to create events app, because I wanted to create fullstack mobile app with map.
Thanks to this project I have wider overview on mobile development and possiblities which React Native offers. The features which I had to dedicate more attention was screen navigating system, which works a bit different while developing on mobile.

## App

<img src="https://res.cloudinary.com/detfhw9ll/image/upload/r_50/v1679934609/eventsMobileApp/assets/EventsApp1_afftrf.png" width=220 height=460><img src="https://res.cloudinary.com/detfhw9ll/image/upload/r_50/v1679935535/eventsMobileApp/assets/EventsAppFollow_d5ke4n.png" width=220 height=460><img src="https://res.cloudinary.com/detfhw9ll/image/upload/r_50/v1679934609/eventsMobileApp/assets/EventsApp3_vzthih.png" width=220 height=460><img src="https://res.cloudinary.com/detfhw9ll/image/upload/v1679934609/eventsMobileApp/assets/EventsAppSignup_zgjndy.png" width=220 height=460><img src="https://res.cloudinary.com/detfhw9ll/image/upload/r_50/v1685221004/eventsMobileApp/assets/EventsAppSignupError_inbhqk.png" width=220 height=460>
<img src="https://res.cloudinary.com/detfhw9ll/image/upload/r_50/v1679935534/eventsMobileApp/assets/EventsAppAccount_kiwbdz.png" width=220 height=460>
<img src="https://res.cloudinary.com/detfhw9ll/image/upload/r_50/v1679935534/eventsMobileApp/assets/EventsAppFav_frljiq.png" width=220 height=460>
<img src="https://res.cloudinary.com/detfhw9ll/image/upload/r_50/v1679935534/eventsMobileApp/assets/EventsAppCreateEvent_ymp2vw.png" width=220 height=460>

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
