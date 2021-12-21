export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const DEFINE_PAGE = "DEFINE_PAGE";
export const GET_GAMESXPAGE = "GET_GAMESXPAGE";
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME";
export const GET_GAME_DETAIL = "GET_GAME_DETAIL";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";
export const ORDER_GAMES_RATING = "ORDER_GAMES_RATING";
export const DELETE_FILTERS = "DELETE_FILTERS";
export const CREATED_TYPE = "CREATED_TYPE";
export const GENRE_FILTER = "GENRE_FILTER";
export const CREATE_GAME = "CREATE_GAME";
export const BACK_ERROR = "BACK_ERROR"
export const DELETE_GAMES = "DELETE_GAMES"
export const GAME_CREATED = "GAME_CREATED"

export function deleteGames() {
        return function (dispatch) {
                dispatch({ type: DELETE_GAMES});
        }
}

export function backendErros () {
        return function (dispatch) {
                dispatch({ type: BACK_ERROR});
        }
}

export function gameCreated () {
        return function (dispatch) {
                dispatch ({type: GAME_CREATED})
        }
}


export function createGame (game){
        
        return function (dispatch){
                fetch("http://localhost:3001/videogame", {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(game)
                })
                .then((response) => response.json())
                .then((data) => {
                dispatch({ type: CREATE_GAME, payload: data });
                }) 
        }
}


export function genreFilter (genre , games){
        return function (dispatch){
                fetch("http://localhost:3001/videogames/"+genre, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(games)
                })
                .then((response) => response.json())
                .then((data) => {
                dispatch({ type: GENRE_FILTER, payload: data });
                }) 
        }
}

export function gameByRating (order, games){
        return function (dispatch){
                fetch("http://localhost:3001/videogames/"+order, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(games)
                })
                .then((response) => response.json())
                .then((data) => {
                dispatch({ type: ORDER_GAMES_RATING, payload: data });
                }) 
        }
}


export function createdType (type) {
        return function (dispatch){
                dispatch({ type: CREATED_TYPE, payload: type });
        }
}


export function deleteFilters (){
        return function (dispatch) {
                dispatch({type: DELETE_FILTERS})
        }
}

export function orderGamesAlf (tipo) {
        return function (dispatch) {
                dispatch({type: ORDER_VIDEOGAMES , payload: tipo})
        }
}

export function getGameDetail (id){
        return function (dispatch){
                fetch("http://localhost:3001/videogame/"+id)
                .then((response) => response.json())
                .then((data) => {
                dispatch({ type: GET_GAME_DETAIL, payload: data });
                }) 
        }
}

export function definePage (pageNumber) {
        return function (dispatch) {
                dispatch({type: DEFINE_PAGE , payload:pageNumber})
        }
}

export function getGamesxPage (pageNumber) {
        return function (dispatch) {
                dispatch({type: GET_GAMESXPAGE , payload:pageNumber})
        }  
}

export function getGameByName (gameName) {
        return function (dispatch){
                fetch("http://localhost:3001/videogames?name="+gameName)
                .then((response) => response.json())
                .then((data) => {
                dispatch({ type: GET_GAME_BY_NAME, payload: data });
                }) 
        }
}

export function getAllGames (){
        return function (dispatch){
                fetch("http://localhost:3001/videogames")
              .then((response) => response.json())
              .then((data) => {
                dispatch({ type: GET_ALL_GAMES, payload: data });
                }) 
        }
}

export function getAllGenres () {
        return function (dispatch) {
                fetch ("http://localhost:3001/genres")
                .then ((response)=> response.json())
                .then((data)=> {
                        dispatch({type:GET_ALL_GENRES , payload: data})
                })
        }
}