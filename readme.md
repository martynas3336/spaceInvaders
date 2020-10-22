## Space Invaders

#### Scripts
`start` - start application.  
`package:windows` - package (compile) windows executable.  
`package:linux` - package (compile) linux executable.  
`package:mac` - package (compile) mac executable.  

### Config
+ All application configurations located in `app/config.js` file.

### Installation
#### Option 1. Node.js
1. Install node.js
2. Run `npm install`
3. Run `npm run start`

#### Option 2. Docker
1. You must have docker on your system
2. Run 
```
docker build -t space_invaders .
docker run -dit --name space_invaders space_invaders
docker exec -it space_invaders /bin/bash
npm run start
```