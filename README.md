# jds-test

## Init projects
There are two projects : authentication-app and fetch-app. You can initialize each of them by following these steps below :

### 1. Authentication app 
requirements: 
- PHP > 7.4
- composer
- mysql  
```bash
$ cd authentication-app
$ composer install
$ cp .env.example .env 
$ php artisan key:generate
```
#### Start Development Server
To start the server you can run the artisan command : ```php artisan serve```. The application will run at localhost with port 8000. 
#### Preparing Database
  Make the new database for the application and then configure the .env file. make sure you fill the variables: DB_PORT, DB_CONNECTION,DB_HOST, DB_USERNAME,DB_PASSWORD, and DB_DATABASE according to your system
  
 ### 2. Fetch App
 requirements: 
 - Nodejs & npm (preferred LTS version)
 ```bash
 $ cd fetch-app
 $ npm install
 $ cp .env.example .env
 $ npm start
 ```
 * fill the variable  api_key_converter in .env with this key : H8L1SrxYWE49kv28lvAFjprRypGmn1rX (Please use it responsibly)
 * The server will start at localhost port 3000 by default
 
