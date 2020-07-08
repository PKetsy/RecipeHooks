import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

const App = () => {
  const [query, setQuery] = useState(""); //setQuery is set to an empty array.  Query is piece of data that should be updated.  setQuery is method to update piece of data
  const [recipes, setRecipes] = useState([]); //setRecipes is set to an empty array
  const [alert, setAlert] = useState("");

  const APP_ID = "01b4b2f5";
  const APP_KEY = "db4fce9cc6e845e651c2fa779298a2f8";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  // TO MAKE REQUEST, WE WILL BE USING AXIOS

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food like that exists");
      }
      setRecipes(result.data.hits); //if you were to console.log 'result', the recipes we want are nested under 'data > hits'
      console.log(result);
      setAlert(""); //set to an empty string because if we cant find food and alert is displayed and search for right name, alert goes away
      setQuery(""); //if we search for pizza, and hit enter, the search field will be cleared
    } else {
      setAlert("Please fill in the form");
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className='App'>
      <h1 onClick={getData}>Food Searching App</h1>
      <form className='search-form' onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type='text'
          placeholder='Search Food'
          autoComplete='off'
          onChange={onChange}
          value={query}
        />
        <input type='submit' value='search' />
      </form>
      <div className='recipes'>
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;

// uuid genereates an unique ID for each recipe in the list!
// line 43 includes a conditional statement: if it doesn't have the value, then dispaly the error message!
//  to get that message from the state, we passed the prop 'alert={}'.  In alert.js we destructure and grab alert.