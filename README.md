# RandomDial
<a href="https://codeclimate.com/github/JCanaks/RandomDial/maintainability"><img src="https://api.codeclimate.com/v1/badges/51daf9c46b1d97a6b75f/maintainability" /></a>
<a href="https://codeclimate.com/github/JCanaks/RandomDial/test_coverage"><img src="https://api.codeclimate.com/v1/badges/51daf9c46b1d97a6b75f/test_coverage" /></a>

**RandomDial** is a random phone number generator designed to generate random phone numbers for a telecommunications company. It is a simple and easy-to-use REST API that provides users with the ability to do the following:

- Generate Random 10-digits phone numbers starting with zero. Users can generate single or multiple numbers (maximum of 500 at a time).
- View the list of phone numbers generated and the corresponding total.
- Sort the list of phone numbers generated in ascending or descending order as well as view the maximum and minimum phone numbers in the list.
- Clear the list of phone numbers generated from the storage

## Technologies Used
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)

## Getting Started
### Dependencies
The following needs to be installed on your system to setup up the application:
- [Nodejs](https://nodejs.org/en/download/current/)
- [Git](https://git-scm.com/downloads)
### Setup
The following steps can be taken to setup this application locally
#### 1. Clone the Repository
```
git clone https://github.com/JCanaks/RandomDial.git
```
#### 2. Move into the project directory
```
cd randomdial
```
#### 3. Create an env file and update env variables
Run the following command to create an env file using the example env file provided 
```
cp .env.example .env
```
You can now update the values for the env variables used in the application
#### 4. Install Dependencies 
```
npm install 
```

#### 7. Start up the application
Run the following command to start the application:
```
npm start
```
To start the application in development mode, please run: 
```
npm run dev-start
``` 
You have now successfully set up the application :tada::tada:. Navigate to `http://localhost:3000/` to access the API on port `3000`. The port number can be configured by specifying a value in the `PORT` variable in your .env file (The port value will default to `3000` if none is specified).

### Run Tests
To run tests locally, run the following command:
```
npm test
```
### API Features/Endpoints
The following are the API features and endpoints for the application which can be tested via [Postman](https://www.getpostman.com/) or any other API testing tool. 
#### Generate Random 10-digits phone numbers
`POST /phonenumbers` - Generates a single or multiple phone numbers (The amount to be generated should be specified in the request body).

**Request Body**
```
{
	"amount": 5
}
```
**Response**
```
{
    "message": "5 phone number(s) successfully generated",
    "data": {
        "total": 5,
        "phoneNumbers": [
            "0786409991",
            "0560095760",
            "0525790942",
            "0356922965",
            "0132715892"
        ]
    }
}
```
#### Get all phone numbers generated
`GET /phonenumbers` - Returns a list of all phone numbers generated and the corresponding total.

**Response**
```
{
    "message": "Phone Numbers Fetched Successfully",
    "data": {
        "total": 5,
        "phoneNumbers": [
            "0786409991",
            "0560095760",
            "0525790942",
            "0356922965",
            "0132715892"
        ]
    }

```

#### Sort list of phone numbers in ascending or descending order
`GET /sort?order=<sort-order>` - Returns a list of phone numbers sorted in ascending or descending order as well as the maximum and minimum phone number on the list. A query parameter `'order'` should be specified with the value `'asc'` or `'ascending'` to get the list in ascending order (e.g. `GET /sort?order=asc`) while `'desc'` or `'descending'` should be specified  to get the list in descending order (e.g. `GET /sort?order=desc`)

**Response**

Ascending order
```
{
    "message": "Phone Numbers Fetched Successfully",
    "data": {
        "total": 5,
        "min": "0132715892",
        "max": "0786409991",
        "phoneNumbers": [
            "0132715892",
            "0356922965",
            "0525790942",
            "0560095760",
            "0786409991"
        ]
    }
}
```
Descending order
```
{
    "message": "Phone Numbers Fetched Successfully",
    "data": {
        "total": 5,
        "min": "0132715892",
        "max": "0786409991",
        "phoneNumbers": [
            "0786409991",
            "0560095760",
            "0525790942",
            "0356922965",
            "0132715892"
        ]
    }
}
```
#### Clear phone numbers in storage
`DELETE /clear` - Removes (clears) all generated phone numbers in the storage.

**Response**
```
{
    "message": "Phone Numbers Successfully deleted",
    "data": {}
}
```


### API Docs
Click [here]() to view the API documentation generated for this application with Postman.

### Author
- Jane C. Anaekwe - [@JCanaks](https://github.com/JCanaks)