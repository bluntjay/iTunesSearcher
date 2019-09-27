// Importing all modules needed for program
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const fetchMod = require("./fetchMod.js");
const cors = require("cors");
const helmet = require("helmet");
const fetch = require("node-fetch");
var favs = require("./favs.json");
const fs = require("fs")
const PORT = process.env.PORT || 3000; 
var app = express();

// Enables usage for the modules - Express, CORS, Helmet & the Encoded URL 
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './client/build')));
// HTTP GET request that fetches data from API using query strings
app.get('/music', (request, response) => {
	fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(request.query.search)}&limit=10&entity=${encodeURIComponent(request.query.media)}`)
	.then((response) =>{
		return response.json()
	})
	.then((output) =>{
		// console.log(output)
		response.send(JSON.stringify(output))
	})
	// console.log(request.query)
});
// HTTP POST request that adds objects to the Array in JSON file 
app.post("/music", (request, response) => {
	console.log('access')
	favs.push(request.body)
	// Writes Oject to JSON file
	fs.writeFile("./favs.json", JSON.stringify(favs), (err) => {
        if (err) {
            console.log(err);
        } else {
        	// console.log("responded", favs)
            console.log("Added to favourites!");
        }
    });
		response.send(favs)
	});
// HTTP GET request that retrieves & displays all of the objects in favourites JSON file  
app.get('/favs', (request, response) => {
	fs.readFile("./favs.json",favs,(err) =>{
		if (err){
			response.send(err)

		}else{
			response.send(favs)
			console.log(favs)
		}
	})
});
// DELETE request that removes an item in JSON object by its ID as a parameter
app.delete('/favs/:id', (request, response) => {
	favs = favs.filter( remove => {
		if(String(remove.trackId) !== request.params.id ){
			return remove
		}
	}) 
	// Rewites the JSON file over with its updated 
    fs.writeFile("./favs.json", JSON.stringify(favs), (err) => {
        if (err) {
            console.log("File couldn't be deleted!");
        } else {
            console.log('File deleted!');
        }
    });
    response.send(favs)
});
// Lets Application run on choosen port
app.listen(PORT, () =>{
	console.warn("Server is running", PORT)
})

