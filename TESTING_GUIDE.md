# DevConnect Testing Guide

## Overview
This guide provides comprehensive instructions for testing the DevConnect application's frontend-backend integration.

## Prerequisites

### Required Software
- Node.js v22.14.0 or higher
- npm (comes with Node.js)
- MongoDB Atlas access (for full functionality)
- Internet connection (for database and external services)

### Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `backend` directory with the following configuration:

```env
RAZORPAY_KEY_ID=rzp_test_z75IromJe5IngZ
RAZORPAY_KEY_SECRET=Tgv8nP7P9Rqg6zMxw3VJmnuf
RAZORPAY_WEBHOOK_SECRET=Djx4uce9q3@8507
PORT=5000
JWT_SECRET=DEV@Tinder$790
DB_CONNECTION_SECRET=mongodb+srv://amitkumar2k00:2e7x0yr7bW3AEeaH@namestenode.cello.mongodb.net/DevTinder
AWS_ACCESS_KEY=AKIA2FXADPYYH3AVGOP5
AWS_SECRET_KEY=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
```

⚠️ **Important:** The `.env` file is in `.gitignore` and should never be committed to version control.

## Installation

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd ..  # Back to root directory
npm install
```

## Running the Application

### Start Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```

**Expected Output:**
```
[nodemon] starting `node --env-file=.env src/app.js`
Database connection established ...
server is successfully listening on port 5000 ..
```

⚠️ **Database Connection Issues:**
If you see "Database cannot be connection ... querySrv EREFUSED", this means:
- No internet access to MongoDB Atlas, OR
- Network restrictions blocking MongoDB connection

The database connection is **required** for testing actual functionality.

### Start Frontend Server (Terminal 2)
```bash
npm run dev
```

**Expected Output:**
```
VITE v6.2.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Testing Critical Flows

### 1. User Registration and Login

#### Registration Flow
1. Navigate to http://localhost:5173/login
2. Click "New here? Create an account"
3. Fill in the registration form:
   - First Name: Test
   - Last Name: User
   - Email: testuser@example.com
   - Password: Password123!
4. Click "Sign Up"

**Expected Behavior:**
- ✅ User is created in database
- ✅ JWT token is set in HTTP-only cookie
- ✅ User is redirected to `/profile` page
- ✅ User information is stored in Redux store
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /signup 200
```

#### Login Flow
1. Navigate to http://localhost:5173/login
2. Enter credentials:
   - Email: testuser@example.com
   - Password: Password123!
3. Click "Login"

**Expected Behavior:**
- ✅ JWT token is set in HTTP-only cookie
- ✅ User is redirected to `/feed` page
- ✅ User information is loaded in Redux store
- ✅ Navigation bar shows user's name
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /login 200
GET /profile/view 200
GET /user/connections 200
```

**Browser Network Tab:**
- Check that cookies include `token` with HttpOnly flag
- All requests include the cookie automatically

### 2. JWT Token Validation

#### Automatic Authentication Check
1. After login, refresh the page (F5)
2. Observe the application behavior

**Expected Behavior:**
- ✅ User remains logged in (not redirected to login)
- ✅ User data is fetched from backend using token
- ✅ Application loads the last visited protected route
- ✅ No "Please Login!" error

**Backend Logs to Verify:**
```
GET /profile/view 200
```

#### Token Expiration Test
1. Login to the application
2. Wait for 8 hours (or manually clear cookies)
3. Try to access any protected route

**Expected Behavior:**
- ✅ User is redirected to `/login` page
- ✅ Error message: "Please Login!"

### 3. Feed and Connection Request Flow

#### View Feed
1. Login and navigate to `/feed`
2. Observe the user cards displayed

**Expected Behavior:**
- ✅ User cards are displayed with profile information
- ✅ Cards show: photo, name, age, gender, about
- ✅ Action buttons: "Ignore" and "Interested"
- ✅ No users you've already interacted with appear
- ✅ Your own profile does not appear

**Backend Logs to Verify:**
```
GET /feed 200
```

**Browser Console:**
- No errors related to data fetching
- Redux state shows feed data

#### Send Connection Request
1. On a user card in feed, click "Interested"
2. Observe the behavior

**Expected Behavior:**
- ✅ Request is sent to backend
- ✅ User card is removed from feed
- ✅ Next user card appears
- ✅ Toast/success message appears
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /request/send/interested/:userId 200
```

**Browser Network Tab:**
- Request payload includes `withCredentials: true`
- Response status: 200 OK

#### Ignore User
1. On a user card in feed, click "Ignore"
2. Observe the behavior

**Expected Behavior:**
- ✅ User card is removed from feed
- ✅ Next user card appears (if available)
- ✅ No connection request notification sent
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /request/send/ignored/:userId 200
```

### 4. Connection Requests Management

#### View Received Requests
1. Navigate to `/requests`
2. View pending connection requests

**Expected Behavior:**
- ✅ List of users who sent you connection requests
- ✅ Each request shows: photo, name, age, gender, about
- ✅ Action buttons: "Accept" and "Reject"
- ✅ Message if no requests: "No Connection Requests Found"

**Backend Logs to Verify:**
```
GET /user/requests/received 200
```

#### Accept Connection Request
1. On a request, click "Accept"
2. Observe the behavior

**Expected Behavior:**
- ✅ Request is accepted in backend
- ✅ Request is removed from requests list
- ✅ User is now in your connections list
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /request/review/accepted/:requestId 200
```

#### Reject Connection Request
1. On a request, click "Reject"
2. Observe the behavior

**Expected Behavior:**
- ✅ Request is rejected in backend
- ✅ Request is removed from requests list
- ✅ User does NOT appear in connections list
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /request/review/rejected/:requestId 200
```

### 5. Connections and Chat

#### View Connections
1. Navigate to `/connections`
2. View accepted connections

**Expected Behavior:**
- ✅ Grid of connected users displayed
- ✅ Each card shows: photo, name, age, gender, about
- ✅ "Message" button on each card
- ✅ Message if no connections: "No Connections Found"

**Backend Logs to Verify:**
```
GET /user/connections 200
```

#### Start Chat
1. On a connection card, click "Message"
2. Chat window opens

**Expected Behavior:**
- ✅ Redirected to `/chat/:targetUserId`
- ✅ Chat history is loaded (if any)
- ✅ Target user's info displayed (name, photo)
- ✅ Message input field is visible
- ✅ WebSocket connection is established

**Backend Logs to Verify:**
```
GET /chat/:targetUserId 200
GET /user/info/:targetUserId 200
[User Name] Joined Room : [roomId]
```

**Browser Console:**
- Socket.io connection established
- No CORS errors
- `joinChat` event emitted

#### Send Message
1. Type a message in the input field
2. Press Enter or click Send

**Expected Behavior:**
- ✅ Message appears in chat window
- ✅ Message is saved to database
- ✅ Message is broadcast to room via WebSocket
- ✅ Other user receives message in real-time (if online)
- ✅ Message persists after page refresh

**Backend Logs to Verify:**
```
[User Name] [Message Text]
```

**Browser Console:**
- `sendMessage` event emitted
- `messageReceived` event received
- No Socket.io errors

### 6. Profile Editing

#### Edit Profile
1. Navigate to `/profile`
2. Click "Edit Profile" or similar button
3. Modify fields:
   - First Name
   - Last Name
   - Photo URL
   - Age
   - Gender
   - About
4. Click "Save Profile"

**Expected Behavior:**
- ✅ Profile is updated in database
- ✅ Redux store is updated with new data
- ✅ Success message/toast appears
- ✅ User is redirected to `/feed`
- ✅ Updated info appears throughout the app
- ✅ No console errors

**Backend Logs to Verify:**
```
PATCH /profile/edit 200
```

**Browser Network Tab:**
- Request payload includes updated fields
- Response includes updated user object

### 7. Premium Membership / Payment Integration

#### Verify Premium Status
1. Navigate to `/premium`
2. Check premium status

**Expected Behavior:**
- ✅ Page displays premium plans (if not premium)
- ✅ Page shows "You're a Premium Member" (if premium)
- ✅ Plans: Silver (₹499) and Gold (₹999)

**Backend Logs to Verify:**
```
GET /premium/verify 200
```

#### Initiate Payment (Razorpay)
1. Click "Buy Silver" or "Buy Gold"
2. Razorpay modal opens

**Expected Behavior:**
- ✅ Payment order is created in backend
- ✅ Razorpay checkout modal opens
- ✅ Modal shows correct amount
- ✅ Prefilled user details (name, email)
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /payment/create 200
```

**Browser Console:**
- Razorpay script loaded
- Order ID present in response
- Key ID matches RAZORPAY_KEY_ID

⚠️ **Testing Payment:**
- Use Razorpay test mode credentials
- Use test card: 4111 1111 1111 1111
- Any future expiry date
- Any CVV

#### Payment Success
1. Complete test payment in Razorpay modal
2. Observe the behavior

**Expected Behavior:**
- ✅ Webhook is called by Razorpay
- ✅ Payment status is updated in database
- ✅ User's `isPremium` flag is set to true
- ✅ Premium page shows success message
- ✅ User can access premium features

**Backend Logs to Verify:**
```
POST /payment/webhook 200
```

### 8. Logout Flow

#### Logout
1. Click logout button in navigation bar
2. Observe the behavior

**Expected Behavior:**
- ✅ Token cookie is cleared
- ✅ Redux store is cleared
- ✅ User is redirected to `/login` or homepage
- ✅ Accessing protected routes redirects to login
- ✅ No console errors

**Backend Logs to Verify:**
```
POST /logout 200
```

## Error Handling Tests

### 1. Network Errors

#### Simulate Backend Down
1. Stop the backend server
2. Try to login or access protected routes

**Expected Behavior:**
- ✅ User sees error message (not blank screen)
- ✅ Console shows network error
- ✅ Application doesn't crash
- ✅ User can retry action

### 2. Invalid Credentials

#### Test Login with Wrong Password
1. Go to login page
2. Enter valid email, wrong password
3. Click Login

**Expected Behavior:**
- ✅ Error message: "Invalid credentials"
- ✅ User stays on login page
- ✅ Form is not cleared
- ✅ No console errors beyond expected

### 3. Validation Errors

#### Test Signup with Invalid Data
1. Go to signup page
2. Enter invalid email or short password
3. Click Sign Up

**Expected Behavior:**
- ✅ Backend returns validation error
- ✅ Error is displayed to user
- ✅ Form is not submitted
- ✅ User can correct and retry

### 4. Authorization Errors

#### Test Accessing Protected Route Without Login
1. Open browser in incognito mode
2. Navigate directly to http://localhost:5173/feed

**Expected Behavior:**
- ✅ User is redirected to `/login`
- ✅ Error message may appear
- ✅ No crash or blank screen

## Browser Console Checks

### No CORS Errors
✅ Should NOT see:
```
Access to XMLHttpRequest at 'http://localhost:5000/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

If you see CORS errors:
- Check backend `app.js` CORS configuration
- Verify origin is set to `http://localhost:5173`
- Verify `credentials: true` is set

### No Authentication Errors
✅ Should NOT see (after login):
```
Please Login!
User doesn't exist
Invalid token
```

If you see authentication errors:
- Check JWT_SECRET in backend `.env`
- Verify token is present in cookies
- Verify `withCredentials: true` in all axios calls

### No API Endpoint Errors
✅ Should NOT see:
```
404 Not Found
Cannot GET /api/...
Cannot POST /api/...
```

If you see 404 errors:
- Check route definitions in backend
- Verify BASE_URL is correct in frontend
- Check API endpoint paths match

## Backend Terminal Logs

### Successful Startup
```
Database connection established ...
server is successfully listening on port 5000 ..
```

### Successful Authentication
```
POST /login 200
GET /profile/view 200
```

### Successful WebSocket Connection
```
[User Name] Joined Room : [hash]
[User Name] [Message Text]
```

### Request Logs Format
```
[METHOD] [PATH] [STATUS_CODE]
```

## Known Limitations

### 1. Database Connection
**Issue:** Requires internet access to MongoDB Atlas
**Impact:** Cannot test in sandboxed/offline environments
**Workaround:** Test with internet connection or use local MongoDB

### 2. Razorpay Payment Testing
**Issue:** Requires Razorpay test mode credentials
**Impact:** Cannot test payments without credentials
**Workaround:** Use provided test credentials in `.env`

### 3. AWS SES Email
**Issue:** Requires AWS credentials and verified email addresses
**Impact:** Connection request emails may not send
**Workaround:** Email functionality is currently commented out in code

### 4. Real-Time Chat
**Issue:** Requires both frontend and backend running simultaneously
**Impact:** Cannot test chat with only one service
**Workaround:** Run both services as documented

## Troubleshooting

### Backend Won't Start
**Symptom:** Error on `npm run dev` in backend
**Solutions:**
1. Verify `.env` file exists in `backend` directory
2. Check Node.js version (should be 22.14.0+)
3. Run `npm install` again
4. Check if port 5000 is already in use

### Frontend Won't Start
**Symptom:** Error on `npm run dev` in root directory
**Solutions:**
1. Check Node.js version
2. Run `npm install` again
3. Check if port 5173 is already in use
4. Clear npm cache: `npm cache clean --force`

### Database Connection Fails
**Symptom:** "querySrv EREFUSED" or "Database cannot be connection"
**Solutions:**
1. Check internet connection
2. Verify DB_CONNECTION_SECRET in `.env`
3. Check MongoDB Atlas network access settings
4. Verify MongoDB Atlas cluster is running

### CORS Errors in Browser
**Symptom:** "blocked by CORS policy"
**Solutions:**
1. Verify backend CORS origin is `http://localhost:5173`
2. Verify `credentials: true` in CORS config
3. Verify `withCredentials: true` in all axios calls
4. Restart backend server after changing CORS config

### Token/Cookie Issues
**Symptom:** "Please Login!" on every request
**Solutions:**
1. Clear browser cookies
2. Verify JWT_SECRET in backend `.env`
3. Check that cookies are not blocked by browser
4. Verify `withCredentials: true` in axios calls
5. Check cookie settings in backend (httpOnly, sameSite)

### Socket.io Connection Fails
**Symptom:** Chat messages don't send in real-time
**Solutions:**
1. Verify both frontend and backend are running
2. Check Socket.io CORS config in backend
3. Check browser console for Socket.io errors
4. Verify BASE_URL is correct in frontend

## Success Criteria Checklist

Use this checklist to verify complete integration:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Database connection is established
- [ ] User can register a new account
- [ ] User can login with credentials
- [ ] JWT token is set in cookies
- [ ] User stays logged in after page refresh
- [ ] Feed displays user cards
- [ ] Connection requests can be sent
- [ ] Connection requests can be accepted/rejected
- [ ] Connections page shows accepted connections
- [ ] Chat opens and loads history
- [ ] Messages can be sent and received in real-time
- [ ] Profile can be edited and saved
- [ ] Premium page loads and shows plans
- [ ] Payment flow initiates correctly
- [ ] User can logout successfully
- [ ] No CORS errors in browser console
- [ ] No authentication errors after login
- [ ] All API calls use correct BASE_URL
- [ ] All API calls include withCredentials: true
- [ ] Backend logs show successful requests
- [ ] Socket.io connection is established
- [ ] Error messages are displayed to users appropriately

## Reporting Issues

When reporting integration issues, include:

1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser console errors** (screenshot or copy)
5. **Backend terminal logs** (screenshot or copy)
6. **Network tab** (request/response details)
7. **Environment**: OS, Node.js version, Browser version

## Additional Resources

- **INTEGRATION_SUMMARY.md**: Overview of integration changes
- **SECURITY_NOTES.md**: Security considerations
- **README.md**: Project overview and features
- **Backend API Docs**: `backend/apiList.md`
