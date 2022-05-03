const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getRecipesInfo = async () => {
  const get = await axios.get(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=b6d9322396364249bf82054038d16f3d&addRecipeInformation=true&number=100"
  );

  const getInfo = await get.data.results.map((el) => {
    return {
      id: el.id,
      name: el.title,
      healthScore: el.healthScore,
      spoonacularScore: el.spoonacularScore,
      summary: el.summary,
      image: el.image,
      diets: el.diets.map((el) => {
        return {
          name: el,
        };
      }),
      steps: el.analyzedInstructions.map((s) => s.steps.map((el) => el.step)),
    };
  });

  return getInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  let apiInfo = await getRecipesInfo();
  let dbInfo = await getDbInfo();

  const info = [...apiInfo, ...dbInfo];

  return info;
};

router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  let recipes = await getAllRecipes();

  if (name) {
    let recipeName = await recipes.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );

    recipeName
      ? res.status(200).send(recipeName)
      : res.status(404).send("Not Found");
  } else {
    res.status(200).send(recipes);
  }
});

router.get("/diets", async (req, res) => {
  const allData = await axios.get(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=b6d9322396364249bf82054038d16f3d&addRecipeInformation=true&number=100"
  );
  const allInfo = allData.data.results.map((el) => el.diets);

  const dietList = allInfo.join(",").split(",");

  const arr = [];

  for (i = 0; i < dietList.length; i++) {
    await Diet.findOrCreate({
      where: {
        name: dietList[i],
      },
    });
  }
  const dietsTypes = await Diet.findAll();

  dietsTypes.forEach((el) => {
    if (el.name.length !== 0) {
      arr.push(el);
    }
  });

  res.send(arr);
});

router.post("/recipe", async (req, res) => {
  let { diets } = req.body;

  let recipeCreated = await Recipe.create({
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    summary: req.body.summary,
    spoonacularScore: req.body.spoonacularScore,
    healthScore: req.body.healthScore,
    steps: req.body.steps,
  });

  let dietsDb = await Diet.findAll({
    where: {
      name: diets,
    },
  });

  recipeCreated.addDiet(dietsDb);
  res.send(recipeCreated);
});

router.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  const recipesTotal = await getAllRecipes();

  if (id) {
    let recipeId = await recipesTotal.filter((el) => el.id == id);
    recipeId.length
      ? res.status(200).send(recipeId)
      : res.status(404).send("Not Found");
  }
});

module.exports = router;
