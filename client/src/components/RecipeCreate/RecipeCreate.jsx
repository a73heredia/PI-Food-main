import { React, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../actions";
import "./RecipeCreate.css";
import Title2 from "./create.png";

function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDiets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    name: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    image: "",
    diets: [],
    steps: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function remove(diet) {
    setInput({
      ...input,
      diets: input.diets.filter((el) => el !== diet),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name || !input.summary || input.diets.length < 1) {
      alert("Error!!!");
    } else {
      dispatch(postRecipe(input));
      alert("Recipe Created Succesfully");

      setInput({
        name: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        image: "",
        diets: [],
        steps: "",
      });
      setErrors(
        validate({
          ...input,
          [e.target.value]: e.target.value,
        })
      );
      history.push("/home");
    }
  }
  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "Name must be completed";
    }

    if (!input.summary) {
      errors.summary = "Sumary must be completed";
    }

    if (!input.spoonacularScore || input.spoonacularScore < 0) {
      errors.spoonacularScore = "Wrong Value";
    }

    if (!input.healthScore || input.healthScore < 0) {
      errors.healthScore = "Wrong Value";
    }

    return errors;
  }

  return (
    <div>
      {/* <h1>Create Recipe</h1> */}
      <img src={Title2} alt="title" width="400px" height="120px" />
      <form onSubmit={handleSubmit}>
        <div className="Divcontainer">
          <div>
            <input
              className="inputCr"
              onChange={handleChange}
              type="text"
              placeholder="Name"
              value={input.name}
              name="name"
            />
            {errors.name && <p className="p">{errors.name}</p>}
          </div>

          <div>
            <textarea
              className="inputCr"
              onChange={handleChange}
              type="text"
              placeholder="Summary"
              value={input.summary}
              name="summary"
            />
          </div>

          <div>
            <input
              className="inputCr"
              onChange={handleChange}
              type="number"
              placeholder="spoonacularScore"
              value={input.spoonacularScore}
              name="spoonacularScore"
            />
            {errors.spoonacularScore && (
              <p className="p">{errors.spoonacularScore}</p>
            )}
          </div>

          <div>
            <input
              className="inputCr"
              onChange={handleChange}
              type="number"
              placeholder="healthScore"
              value={input.healthScore}
              name="healthScore"
            />
          </div>

          <div>
            <input
              className="inputCr"
              onChange={handleChange}
              type="text"
              placeholder="image"
              value={input.image}
              name="image"
            />
          </div>

          <div className="divSteps">
            <textarea
              className="inputCr"
              onChange={handleChange}
              type="text"
              placeholder="steps"
              value={input.steps.name}
              name="steps"
            />
          </div>
        </div>
        <div className="divSelect">
          <select className="select" onChange={(e) => handleSelect(e)}>
            {allDiets.map((el) => {
              return (
                <option value={el.name} key={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <div className="dts">
            {input.diets.map((d) => (
              <div className="divDiets" key={d.id}>
                <p key={d.id}>{d}</p>
                <button className="btnX" onClick={() => remove(d)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bnera">
          <button className="btnBck" type="submit">
            Create
          </button>
          <Link to="/home">
            <button className="btnBck">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RecipeCreate;
