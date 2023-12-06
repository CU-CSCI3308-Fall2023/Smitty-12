# Rinder - Smitty - Team 1 - Sec 012

The Rinder roomate finder application is a website that lets a user register and log into the application, and allows them to browse users stored in the database and like their profile if they want to be roommates. There is a prefernces page that lets the user enter in what they are looking for in a roommate, and there is also a matches page that displays information to the user on people that may be a good fit as a roommate.

## Contributors
* Justin Goh
* Austin Schene
* Jonny Lunney
* Kevin Yang
* Ben Hyde
* Alexis Marez

## Tech Stack:
* Coding done on **VSCode**
* Containers on **Docker**
* Node JS
* EJS
* Javascript

## Pre requisites: 
Before cloning the repository, **Docker** must be installed.

## Running the Application Locally
After cloning the repository, navigate to the 'src' direcotry:

```bash
  cd All_Project_Code/src/
```
Once in the correct repository, start the application by running the following command:

```bash
  docker-compose up
```
Then, on your web browser, navigate to: 

```bash
  http://localhost:3000/
```
## How to Run Tests
To run tests for this application, there is one item that needs to be done. Navigate to the **docker-compose.yaml**, and scroll down to the npm run commands. To start, it should look like this:

```bash
    # command: 'npm run testandrun'
    command: 'npm start'
```

To run the tests when starting up the application, uncomment the like that runs 'npm run testandrun', and comment out 'npm start'. It should now look like this: 

```bash
    command: 'npm run testandrun'
    # command: 'npm start'
```

Now, making sure you are in the correct directory, you can start the application and it will run the tests.

## Link to deployed application

```bash
    **PUT LINK HERE**
```
