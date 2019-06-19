
const cors = require('cors')
const express = require('express');
const path = require('path');
const helmet = require('helmet')
const bodyParser = require('body-parser')
const request = require('request')

const NASAUrl = 'https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?'

var router

//load env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}


//set port
const port = process.env.PORT

//instantiate app
const app = express();


//express-session  prodcution values
// if(app.get('env') == 'production'){
//     app.set('trust proxy', 1)
//     sess_options.cookie.secure = true
// }
// app.use(cookieParser());



var corsOption = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',   
};
//use cors
app.use(cors(corsOption))

//use helmet defaults
app.use(helmet())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))    
        
}

//only one route
app.post('/api/search', (req, res) => {   
 
    let url = NASAUrl + 'sol=' + req.body.searchvalue + '&camera=' + req.body.cameravalue
    request(url, { json: true }, (err, response, body) => {
        if (err) return res.send({ error: err })
        res.send(body)
    } )

    //res.send({message:'some text here'})
})

// // Handle React routing, return all requests to React app
app.get('/*', function(req, res) {   
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//start server
app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
    //api server started
})




