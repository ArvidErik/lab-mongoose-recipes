const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI =
  "mongodb+srv://ArvidErik:Arvider@cluster0.8oaqccm.mongodb.net/MyFirstDatabase";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  // INSERT ONE RECIPE
  .then(async () => {
    const pancake = {
      title: "Pancake",
      level: "Easy Peasy",
      ingredients: ["salt", "water", "flower", "egg"],
      cuisine: "Hungarian",
      dishType: "dessert",
      image: "https://www.mindmegette.hu/images/181/O/palacsinta_csokikrem.jpg",
      duration: 30,
      creator: "Erik",
      created: "",
    };
    await Recipe.create(pancake);
    console.log(pancake.title);
  })
  .catch((err) => console.log("error with the pancake", err))


  // INSERT MANY RECEPIES
  .then(async () => {
    await Recipe.insertMany(data);
  })
  .then(() => {
    console.log("Following recepies have been added successfully:");
    data.forEach((element) => {
      console.log(element.title);
    });
  })
  .catch((err) => console.log("error with creation many", err))


  // UPDATE RIGATONI
  .then(async () => {
    const query = { title: "Rigatoni alla Genovese" };
    await Recipe.findOneAndUpdate(query, { duration: 100 });
  })
  .then(() => {
    console.log("Duration has been updated successfully.");
  })
  .catch((err) => console.log(err))


  //DELETE CARROT CAKE
  .then(async () => {
    await Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carrotcake has been deleted");
  })
  .catch((err) => console.log(err))


  //CONNECTION ERROR
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
