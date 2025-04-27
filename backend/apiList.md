# DevTinder API

## Router : authRouter
- POST /signup
- POST /login 
- POST /logout

 ## Router : profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

 ## Router : connectionRequestRouter
    // Sending connection request               Note: Make status dynamic by using single API
- POST /request/send/interested/:userId        
- POST /request/send/ignored/:userId

    // received connection request              Note: Make status dynamic by using single API
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

 ## Router : userRouter
- GET /user/requests/received/:requestId    // view all the request received 
- GET /user/connections                     // view all my connections
- GET /user/feed          // Gets you the profile of others users on platform  


Status : ignored, Intrested, accepted, rejected
