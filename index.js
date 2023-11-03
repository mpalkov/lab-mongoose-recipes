const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
// Use MongoDB access url with the user and pass in external unpublished file
const MONGODB_URI = require("./dbaccess");

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "Martin's Potatoes",
      level: "Easy Peasy",
      ingredients: "Potatoes",
      cuisine: "Slovakian",
      dishType: "main_course",
      duration: 35,
      creator: "Martin",
    })
  })
  .then((recipe) => {
    console.log("CREATED ONE: \n\t", recipe.title);
    const listOfRecipes = require("./data.json");
    return Recipe.insertMany(listOfRecipes);
  })
  .then((recipes) => {
    console.log("ADDED MANY:");
    recipes.forEach((element) => console.log("\t",element.title));
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(() => {
    console.log("Updated Rigatoni alla Genovese");
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => mongoose.disconnect())
  .then( () => console.log("Database connection closed"))
  .catch(error => {
    console.error(error)
  });