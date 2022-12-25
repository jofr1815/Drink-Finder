const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.get('/', (req, res) =>{
    res.redirect('/home');
});

app.get('/home', (req, res) =>{
    if (req.query.drinkName != "" && req.query.drinkName != undefined){
        axios({
            url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.query.drinkName}`,
            method: 'GET',
            headers: {
                'Accept-Encoding': 'application/json'
            }
        })
        .then(results =>{
            if(results.data.drinks){
                res.render('pages/main', {
                    drinks: results.data.drinks
                });
            } else {
                res.render('pages/main', {
                    error: true,
                    message: "No drinks found"
                });
            }
        })
        .catch(error =>{
            res.render('pages/main', 
            {
                error: true,
                message: error
            });
        });
    } else {
        res.render('pages/main');
    }
});

app.get('/reviews', (req, res) => {
    res.render('pages/main', 
    {
        error: true,
        message: 'Link Unavailable'
    });
});

app.listen(port, () => console.log(`Web server listening on port ${port}!`));