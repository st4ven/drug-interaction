# Drug Interaction Checker

## [Live Webpage](https://drug-interaction-57ee.onrender.com/)

## Description
This project is designed to help users find interactions between certain drugs. The user can input up to six different drugs to test for any potential risks of drug co-administrations. After filling out the necessary information and clicking "Check Interactions", the website will display a table of the drugs with potential negative interactions and a severity level of the interaction.

## Technologies Used
* **Frontend:** React for building the user interface (with Vite for development)
* **Backend:** Node.js with Express for handling API requests and responses.
* **Database:** PostgreSQL for storing and querying data.
* **APIs:** Communication between the frontend and backend through HTTP requests.

## Features
* The frontend allows users to input and delete drug names, check for interactions, and display the results in a user-friendly format.
* The backend handles the logic for querying data interactions, processing requests from the frontend, and returning the relevant data.
* The database stores data related to drug interactions, which the backend queries to provide results to the frontend.

## Data Sources
[DDInter](http://ddinter.scbdd.com/) 