## Mars Rover Photo API

A mars rover photo app deployed to heroku: https://vp-mars-photo.herokuapp.com.
Retrieves and displays images from NASA Mars Rover Photos API by Sol day and rover camera.

## Starting Development Environment

1. Clone repo
2. `npm install` dependencies 
3. Set .env variables.
3. `npm run dev`


## Server Environment Variables

#### PORT

- Port number to run back end server, should match proxy port value in client/package.json, currently on port `3005`

#### NASAURL

- Base api url for backend set to https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?
    
    
## Other
This app uses an API provided by https://github.com/chrisccerami/mars-photo-api    

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
