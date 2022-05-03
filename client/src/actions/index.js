import axios from 'axios';

export function getRecipes() {
    return async function (dispatch) {
        var apiData = await axios.get('/recipes');

        return dispatch({
            type: 'GET_RECIPES',
            payload: apiData.data
        })

    }
}

export function getDiets() {
    return async function (dispatch) {
        var info = await axios.get('/diets');
        return dispatch({
            type: 'GET_DIETS',
            payload: info.data
        })
    }
}

export function filterDiets(payload) {
    return {
        type: 'FILTER_DIETS',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function getRecipeName(name) {
    return async function (dispatch) {
        try {

            var info = await axios.get('/recipes?name=' + name);
            console.log(info.data, 'hola')
            return dispatch({
                type: 'GET_RECIPE_NAME',
                payload: info.data

            })

        }
        catch (e) {
            console.log(e);
        }

    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        const info = axios.post('/recipe', payload);
        return Response;
    }

}


export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('/recipes/' + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (e) {
            console.log(e);
        }
    }
}