import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterDiets, orderByName, filterCreated } from '../../actions'
import { Link } from 'react-router-dom';
//import Loading from '../Loading/Loading.jsx'
import Card from '../Card/Card';
import Paginated from '../Paginated/Paginated.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import Title from './home.png'
function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const [order, setOrder] = useState('');

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getRecipes());
    }, [])

    useEffect(() => {
        dispatch(getDiets());
    }, [])

    function handleFilterDiets(e){
        dispatch(filterDiets(e.target.value))
    }

    function handleSort(e){
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    }

    // if (allRecipes.length === 0) {
    //     return (
    //         <Loading />
    //     )
    // }

    return (
        <div className='selectDiv'>
            {/* <NavBar /> */}
             <img src={Title} alt="title" width='400px' height='120px' /><br />              
            <Link style={{ color:'darkred', fontSize:'20px'}} to='/recipe'>Create Recipe</Link>
            <SearchBar />
            <div>
                <select className='select' onChange={e => handleSort(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>

                <select className='select' onChange={e => handleFilterDiets(e)}>
                <option value='all'>All</option>
                    {
                        allDiets?.map(el => {
                            return (
                                <option value={el.name} key={el.id}>{el.name}</option>
                            )
                        })
                    }         

                </select>

                <select className='select' onChange={e => handleFilterCreated(e)}>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                    <option value="api">Api</option>
                </select>
                </div>
                <div className='cards'>
                    {
                        currentRecipes.map((el) => {
                            return (
                                <Link to={'/details/' + el.id} key={el.id}>
                                    <Card key={el.id} name={el.name} image={el.image} id={el.id} diets={el.diets} steps={el.steps} />
                                </Link>
                            )
                        })
                    }
                </div>

                <Paginated
                    recipesPerPage = {recipesPerPage}
                    allRecipes = {allRecipes.length}
                    paged = {paged}
                />
            
        </div>
    )
}

export default Home