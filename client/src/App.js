import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Home from './components/Home/Home.jsx';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
         <Route exact path='/' component={LandingPage}/>
         <Route path='/home' component={Home}/>
         <Route path='/recipe' component={RecipeCreate} />
         <Route path='/details/:id' component={Detail}  />
         </Switch>        
      </div>
    </BrowserRouter>
  );
}

export default App;
