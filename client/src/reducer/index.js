const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'FILTER_DIETS':

            // const result = action.payload;
            // const dietFilter = state.allRecipes.filter(el => el.diets.some(e => e.name === result));
            // console.log(dietFilter)            

            // return {
            //     ...state,
            //     recipes: action.payload === 'all' ? state.allRecipes : dietFilter
            // }

            const allRec = state.allRecipes;
            const dietsFilter = action.payload === 'all' ? state.allRecipes :
                allRec.filter(recipe => recipe.diets.find((diet) =>  {
                    if (diet.name === action.payload) {
                        return recipe
                    }
                }))

            return {
                ...state,
                recipes: dietsFilter
            }

        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :

                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedArr
            }
        case 'GET_RECIPE_NAME':
            if(action.payload.length < 1){
                alert('Not Found')
                
            }else{
                
                return {
                    ...state,
                    recipes: action.payload
                }
            }
            

        case 'FILTER_CREATED':

            const createdFilter = action.payload === 'created' ? state.allRecipes.filter(el => el.createdInDb)
                : state.allRecipes.filter(el => !el.createdInDb);
            console.log(createdFilter);
            return {
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : createdFilter
            }

        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'GET_DETAIL':
            
            return {
                ...state,
                detail: action.payload
            }

        default:
            return state
    }
}

export default rootReducer