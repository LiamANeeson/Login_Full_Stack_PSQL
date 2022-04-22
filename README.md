# Login_Full_Stack_PSQL
Sample log in page for assignment / project


# Liam Neeson Secure Systems 
# Assignment 2 

## Prerequistes
**Ensure that you have postgres and node installed on your system**
 Installed all the libraries and dependencies 
 
 ### npm i 
 
 Enter own postgres details for running locally
 You will need to create a database and database table 
 Create psql user postgres 
 
 # What I did to run locally running:
 1. Creat user postgres 
 ```
 psql -U postgres 
 ```
 2. Createa a DB
 ```
 login_form_example
 ```
 3. Enter DB 
 ```
 \c login_form_example 
 ```
 In Server.js you we will need to add in your own credentials below is the code that you will need to modify 
 ```
 const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '', // Enter own details for postgres
        password: '', // Enter own details for postgres 
        database: '' // Enter own details for postgres server my db was login_form_example. Table name was users
    }
})
```
## Vulnerabilty 
The vulnerable code exmaple can be seen in server.js 
The code that is commetned out is the query parameterization which fixes the vulnerabilty 
### Can run the vulnerable and non vulnerable by commenting out which one you want to run

# To Run Vulnerabilty 
## Enter This into Email
```
whatever' OR email LIKE 'admin%'--
```
## Can then enter any combination of characters into Password 
