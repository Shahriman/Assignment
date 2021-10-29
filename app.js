const express = require('express');
const app = express();
const Menu = require ('./connect');
const axios = require('axios');
const apikey = '313affb91c904bc0aa66d164843535f0';  //use ur own API from spooncular.com
const port = '5000';








app.get('/add', (req, res) => {
  recipe = req.query.recipe;
  const querystr = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${recipe}`;

  axios.get(querystr).then((response)=>{
    title = response.data.results.title;
    image = response.data.results.image;


    const querystr2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    axios.get(querystr2).then((response)=>{
    area = response.data.results.area;
    instructions = response.data.meals.strInstructions;


    const foodValue = new Menu({
    title : title,
    image : image,
    area : area,
    instructions : instructions
    });
    if (!foodValue.title) {
      res.status(200).json('Not found');
      return;
    }

      foodValue.save().then(result =>{
          console.log("Success" + result);
      })
      .catch(error => {
          console.log ("Error"+ error)
      });

    });
});

});

app.get('/getallrecipes', (req, res) => {
  Menu.find({})
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get('/delete', (req, res) => {
  Menu.deleteOne({ title: req.query.title })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});