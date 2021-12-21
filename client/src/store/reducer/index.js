import {
            DEFINE_PAGE, GET_ALL_GAMES , GET_ALL_GENRES , GET_GAMESXPAGE ,GET_GAME_BY_NAME, GET_GAME_DETAIL,
            ORDER_VIDEOGAMES, ORDER_GAMES_RATING , DELETE_FILTERS, CREATED_TYPE,GENRE_FILTER , CREATE_GAME, 
            BACK_ERROR , DELETE_GAMES, GAME_CREATED
        }  from '../actions';

const initialState = {
    videogames: [],
    genres: [],
    videogamesXpage: [],
    number:1,
    gameDetail: {},
    flagFilter: true,
    backErros: false,
    filtersapplied: ['', '', ''],
    originalvideogames:[],
    gameCreated: false,
};

const reducer = (state=initialState , action) => {
    switch (action.type){
        case GET_ALL_GAMES:
            return {...state, filtersapplied: ['', '', ''], number:1,
                videogames: action.payload , originalvideogames: JSON.stringify(action.payload)};
        case GET_ALL_GENRES:
            return {...state , genres:action.payload};
        case DEFINE_PAGE:
            return {...state , number: action.payload};
            case CREATE_GAME:
                return {...state , /*flagFilter: !state.flagFilter,*/ number:1,
                originalvideogames: !action.payload.hasOwnProperty("error")? JSON.stringify([action.payload, ...JSON.parse(state.originalvideogames)])
                : JSON.stringify(JSON.parse(state.originalvideogames)),
                backErros: action.payload.hasOwnProperty("error") ? true : false,
                gameCreated:action.payload.hasOwnProperty("error") ? false : true}
        case GET_GAMESXPAGE:
            return {...state ,  videogamesXpage: action.payload?state.videogames.slice(15*(action.payload-1) , 15*action.payload)
            :state.videogamesXpage}
        case GET_GAME_BY_NAME:
            return {...state , filtersapplied: ['', '', ''], gameCreated:false, backErros:false,
            flagFilter: !state.flagFilter, videogames: action.payload};
        case GET_GAME_DETAIL:
            return {...state , gameDetail: action.payload  ,  videogames: [],filtersapplied: ['', '', '']};
        case ORDER_VIDEOGAMES:
            return {...state, flagFilter: !state.flagFilter, number:1,
                videogames: action.payload === "Ascendente"? state.videogames.sort(orderAlf)
            :state.videogames.sort(orderAlf).reverse(),
            filtersapplied: state.filtersapplied.map((element , index)=> (
                index === 0 ? element=action.payload : (index === 1? '' : element)
                ))
        }
        case DELETE_FILTERS:
            return {...state, flagFilter: !state.flagFilter, number:1, 
                videogames: JSON.parse(state.originalvideogames),
                filtersapplied:['', '', '']};
        case CREATED_TYPE:
            return {...state , flagFilter: !state.flagFilter,  number:1,
                videogames: typeOfCreation(action.payload, state.videogames,state.originalvideogames),
                filtersapplied: state.filtersapplied.map((element , index)=> (index === 2 ? element=action.payload : element))};
        case ORDER_GAMES_RATING:
            return {...state ,  flagFilter: !state.flagFilter, number:1,
                videogames: action.payload.games,
                filtersapplied: state.filtersapplied.map((element , index)=> (
                    index === 1 ? element=action.payload.filter : (index === 0? '' : element)))}
        case GENRE_FILTER:
            return {...state ,  flagFilter: !state.flagFilter, number:1,
                videogames: action.payload.games,
                filtersapplied: !state.filtersapplied.includes(action.payload.filter) ? [...state.filtersapplied, action.payload.filter]
                : state.filtersapplied
            }
        case BACK_ERROR:
            return {...state , backErros: false}
        case DELETE_GAMES:
            return {...state , videogames: [],filtersapplied: ['', '', '']}
        case GAME_CREATED: 
            return {...state , gameCreated: false}
        default: return state;
    }
}

function orderAlf (a,b) {
    if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
    }
    if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
    }
      return 0;    
}

function typeOfCreation (payload , videogames , originalvideogames) {
    if (payload==="API"){
        let games = videogames.filter((element) =>  typeof element.id === 'number' )
        if (games.length) return games;
        else {
            videogames =JSON.parse(originalvideogames)
            let games = videogames.filter((element) =>  typeof element.id === 'number' )
            return games
        }
    }
    else {
        let games = videogames.filter((element) => typeof element.id === 'string')
        if (games.length) return games;
        else {
            videogames =JSON.parse(originalvideogames)
            let games = videogames.filter((element) =>  typeof element.id === 'string' )
            return games
        }
    }
}


export default reducer;