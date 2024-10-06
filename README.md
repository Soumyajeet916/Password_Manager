# Password-Manager
Made using React, Tailwind, MongoDB & ExpressJS





Steps to run Password Manager Project:

1.Open webd->backend

Now shift+right-click in blank space and select open with VS Code. In the terminal type "node server.js"
Open localhost through browser.


Connect uri in mongodb compass
1.Type npm i in terminal of passop-mongo
2. Open backend folder in vs code and type in terminal npm init -y and npm i express@4
3. npm i dotenv
4. npm install mongod
5. npm i body parser
6. npm install cors
7. npm install uuid
8. npm install --save react-toastify


----->Open Postman Desktop App.Select "raw" and then select "POST" to store data in the following format:
{
    "id": "horse",
    "site": "www.example.com",
    "username": "root",
    "password": 123456
}
Press "SEND"


----->Open /MongoDB Compass:
Connect to the URI(mongodb://localhost:27017)
Find the folder named passop and inside passop , there must be a folder named passwords.
Here, Modification of data stored through postman is possible


2.Keep the VS code window open and navigate to webd->backend

Now shift+right-click in blank space and select open with VS Code. In the terminal type "npm run dev"
"ctrl+click" on the link.