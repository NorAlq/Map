# Neighborhood Map React Project
This project is submitted to udacity as part of Frond-End Development Nano-dgree.The goal is to create a single-page web application which should be built using the React framework, that displays a Google Map of 5 places in my neighborhood and showing them on Google Map. Also, users can use the search box to search all included places and, when one of them is selected, there is additional information about the place is presented from the FourSquare APIs which is Place, Street, Contact  Phone Number and Check In Count. Also, more from the FourSquare website.

This project sticks to the rubrics represented by this [Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)

## Features

1. Displaying 5 markers on Google Map with additional information provided from FourSquare API.
2. A list of the 5 markers to be chosen from.
3. A search box to search and filter the list and the locations on Google Map.
4. Clicking on the marker location displays additional information about the location. 

## How to run the project in Development Mode
The project uses [Node.js >= 6.x](https://nodejs.org/en/) and the [Create-React-App starter code](https://github.com/facebookincubator/create-react-app).

After Node is installed in your system, follow the below steps.

1. Navigate to the directory where you want to store the app.
2. Now install all modules listed as dependencies in `package.json` by running the command `npm install`
3. Now install all modules listed as dependencies in package.json by running the command npm install
4. Launch the app with this command `npm start`

A new browser window opens automatically displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

## Constraints
The service workers is only enabled when the app is in production mode.*

## How to run the project in Production Mode

1. Build the production ready optimised code. `npm run build`
2. Deploy it to `gh-pages` branch by `npm run deploy`

## Technologies Used
1. ReactJs
2. HTML
3. CSS
4. JavaScript
5. Foursquare API
6. Google Maps API
