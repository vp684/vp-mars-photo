
const express = require('express');
const path = require('path');
const helmet = require('helmet')
const bodyParser = require('body-parser')
const request = require('request')


//load env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

//set base API url
const NASAUrl = process.env.NASAURL

//set port
const port = process.env.PORT

//instantiate app
const app = express();

//use helmet
app.use(helmet())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))            
}

//only one API route
app.post('/api/search', (req, res) => {   

    let regex = /^[0-9]*$/
    let searchStr = req.body.searchvalue

    if (searchStr.search(regex) || searchStr === '') {
        return res.send({ error: 'Search must contain a Sol number only.' })
    }
    
    if(req.body.searchvalue.length > 0){
        let url = NASAUrl + 'sol=' + req.body.searchvalue + '&camera=' + req.body.cameravalue
        request(url, { json: true }, (err, response, body) => {
            if (err) return res.send({ error: err.toString })
            res.send(body)
        })
    } else {     
        res.send({photos: []})
    }
})

// // Handle React routing, return all requests to React app
app.get('/*', function(req, res) {   
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//start server
app.listen(port, () => {
    
})
