# Expense Tracker

As a consumer, in order to better understand my spending patterns I want to input my expenses in a tracking system which can generate reports.

# Tech Stack

MongoDB (Mongoose for ODM)
Node.js (Express framework)
Passport (Authentication Middleware)
Pug (Template Engine)
Mocha (Test Framework)
Zombile (Headless Browser Test Framework)
Nodemon (Auto Reloads)

# Installation and Set up

### Database:
* Install Mongo and start it on 12345 
* Restore the dumps for database *expense_tracker* from https://drive.google.com/drive/folders/0B6xRwrElp2Kaa2VLZlZ5LXJVTDA?usp=sharing
* MONGODB_URI defaults to mongodb://localhost:12345/expense_tracker, change it (if required) in .env.example to match to your settings.

### Server:
* Download Node.js and Install dependencies using npm install
* Run *nodemon app.js* to start server on 3000

### Client:
* Visit localhost:3000 and enjoy!!!
* Use demo accounts *Regular User*- Email: tejaskumthekar26@gmail.com Password: abc123 *Admin*- Email: tejakumt@indiana.edu Password: abc123

### Tests:
* Run tests using *npm test* from the root directory of the app [With server stopped]
* Run headless browser tests using *jasmine-node browser_test/zombie.spec.js* from the root directory of the app [With the server running]

### Report:
Find a detailed report (including screenshots!!!) at https://drive.google.com/file/d/0B6xRwrElp2KaclhOQXFyOFRMZnc/view?usp=sharing
