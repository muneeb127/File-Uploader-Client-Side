How to run and test the application
- Make a new directory in your computer
-	Clone the code or extract the code into that directory.
-	Go to the directory and open it in any IDE.
-	Open the terminal and go to the file-uploader directory.
-	Run the following commands:
  -	npm install
  -	npm start
  -	The react application (client side) will start
-	Now, you will have the client application up and running.
-	Clone the server side application and follow the readme steps


# Architecture and Design Decisions
I have used the n-tier architecture approach in order to develop this file system consisting of the presentation layer, business logic layer and the data layer.
-	In order to server data to the users, I have used ReactJS for the development of client side or the presentation layer.
-	For the development of APIs, I have used NodeJS as the programming library for the server side or the business logic layer.
-	I have not connected the application with a database instead I have used a local directory folder for uploading the files and used it as the Data Layer. 


# Ideas and Proposals
The improvement ideas for the application are as follows:
-	The application can be connected to a database like MongoDB for uploading the files instead of using a local directory folder as the data layer.
-	The approach for creating a shareable link can be enhanced.
  -	I have created a self-destroying component which destroys itself after a certain time mentioned in the code.
  -	A unique shareable link can be created each time user wants to share a file.
-	Validation can be implemented to allow only authorized people to access the application. 


