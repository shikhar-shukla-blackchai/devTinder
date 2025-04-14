# DevTinder APIs

## authRouter

- POST/signup
- POST/login
- POST/logout

## profileRouter

- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password = forgot password

## connectionRequestRouter

- POST/request/send/:status/:userId
- POST/request/review/:status/:userId

## userRouter

- GET/user/requests/received
- GET/requests/received
- GET/feed - Gets you the profiles of other users on platform
