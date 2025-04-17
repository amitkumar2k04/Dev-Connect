# DevTinder
## EP1
- installed tailwind css
- installed daisy UI
- Add NavBar.jsx seperate file 
- Installed react router dom
- create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component 
- Create a footer

## Ep2
- create a login page 
- install axios
- To make an API call using axios we will be using npm package (i.e Axios)
- setup cors - how to setup => intall cors in backend => add middleware in backend with configruations:
       STEP1: (i.e origin = "", credentials : true) - Add this in backend 
Note : STEP2: In frontend whenever we make any API call - we have to pass in (i.e { withCredentials: true }) -> if we dont pass this then it will not send the token back to in other API calls.

- Intalled redux toolkit + react redux
- configure a store => Add procider to whole app.js => createSlice => add reducer to store  
- Add redux devtools in chrome 
- login and see if your data is coming properly in the store 
- Navbar should update as soon as user logs in.

## EP3
- You should not be able to access other routes without login 
- If token is not present re-direct user to login page 
- get the feed and add the feed in the store 
- Build the user card for feed

## Razorpay payment Gateway Integration 
       PART 1:
       - Created a UI for premium page 
       - Creating an API for create order in backend
       - make the API dynamic
       Note : Revision (- 1 h : 22m)
       PART 2: 
       - setup Razorpay webhooks on the LIVE api


## Deployment
       - signup on AWS
       - Launch instance 
       - chmod 400 <secret.pem>
       - ssh -i "DevConnect-Secret.pem" ubuntu@ec2-13-203-103-51.ap-south-1.compute.amazonaws.com
       - Install Node Version : v22.14.0
       - git clone 

       Note : Installation of node of version v22.14.0
       - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
       - export NVM_DIR="$HOME/.nvm" source "$NVM_DIR/nvm.sh"
       - command -v nvm     -> It should return nvm
       - nvm install 22.14.0





-- Deployment on AWS (Frontend)
       - sudo apt update                  -> To update the ubantu system 
       - npm install                      -> dependency install
       - npm run build                    -> Build the project 
       - sudo apt install nginx           -> To install nginx
       - sudo systemctl start nginx       -> To start nginx
       - sudo systemctl enable nginx      -> To enable nginx
       Note :  Copy dist folder - from dist(build files) to /var/www/html (See command below)
       - sudo scp -r dist/* /var/www/html/
       Node : We need to enable part 80  - to make our app live -> How to enable it -> from instance
       - Enable port :80 of your instance




