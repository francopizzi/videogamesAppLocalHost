const { Router } = require('express');
const { Videogame , Genre }= require('../db');
const {Op} = require('sequelize');
const axios  = require('axios');
const router = Router();

const {
    API_KEY
  } = process.env;


  function orderRatingAsc (a,b) {
    if ( a.rating < b.rating )return -1;
    if ( a.rating > b.rating ) return 1;
    return 0;    
}
function orderRatingDesc (a,b) {
    if ( b.rating < a.rating )return -1;
    if ( b.rating > a.rating ) return 1;
    return 0;    
}

function compare (element , filter){ 
    for (let i=0; i< element.length ; i++)
    {
      if (element[i].name === filter)
      {
        return true;
      }
    }
    return false;  
}


router.post ('/:filter', (req,res,next)=> {
    const {filter} = req.params;
    const games = req.body;
    let auxGames=[]
    
    if (filter === "Ascendente") {
        games.sort(orderRatingAsc);
        games.forEach(element => {
            auxGames.push({
                id: element.id,
                name: element.name,
                background_image: element.background_image,
                genres: element.genres.map(genre => genre={id:genre.id , name: genre.name}),
                rating: element.rating
            })
        }); 
    }
    else if (filter === "Descendente") {
        games.sort(orderRatingDesc);
        games.forEach(element => {
            auxGames.push({
                id: element.id,
                name: element.name,
                background_image: element.background_image,
                genres: element.genres.map(genre => genre={id:genre.id , name: genre.name}),
                rating: element.rating
            })
        }); 
    }
    // Aca hago el filtro por genero
    else {         
        let genreArray = games.filter (element => compare (element.genres , filter));
        genreArray.forEach(element => {
            auxGames.push({
                id: element.id,
                name: element.name,
                background_image: element.background_image,
                genres: element.genres.map(genre => genre={id:genre.id , name: genre.name}),
                rating: element.rating
            })
        });
    }
    res.send({games: auxGames, filter});
})





router.get('/' , (req,res,next) => {
    const {name} = req.query;


    if (name) {
    try {
        let promiseAllGamesDB = Videogame.findAll({
            where: {
               name: {[Op.iLike]: "%" + name.toUpperCase() + "%"}
            },
            include: Genre     
        });
        let promiseAllGamesAPI = axios.get(
            `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        );
        Promise.all([
            promiseAllGamesDB,
            promiseAllGamesAPI
        ])
        .then (response => {
            let [AllGamesDB , AllGamesAPI] = response;
            let allGames = [...AllGamesDB , ...AllGamesAPI.data.results]
            let auxGames = []
            
            if (!allGames.length) return res.status(404).send("No existe ningun juego con el nombre solicitado");
            
            allGames.forEach(element => {
                auxGames.push({
                    id: element.id,
                    name: element.name,
                    background_image: element.background_image,
                    genres: element.genres.map(genre => genre={id:genre.id , name: genre.name}),
                    rating: element.rating
                })
            }); 
            if (auxGames.length > 15) auxGames = auxGames.slice(0,15);
            res.send(auxGames);
        })
    }
    catch(error) {
        next(error);
    }
} 

    else {
    try{
        let allPromises = [];
        allPromises.push(Videogame.findAll({include: Genre}));
        for (let i = 1; i <=5 ; i++){
            allPromises.push(axios.get(
                `https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`  //https://api.rawg.io/api/games?page=1&key=88746d59f283472eafe6adbe231549ca
            ))
        } 
        Promise.all(allPromises)
        .then (response => {
            let [AllGamesDB , ...AllGamesAPIarray] = response;
            let AllGamesAPI = [];
            AllGamesAPIarray.forEach(element => {AllGamesAPI =AllGamesAPI.concat(element.data.results)});
            let allGames = [...AllGamesDB , ...AllGamesAPI]
            
            let auxGames = []
            if (!allGames.length) return res.status(404).send("Ocurrio un error");
            
            allGames.forEach(element => {
                auxGames.push({
                    id: element.id,
                    name: element.name,
                    background_image: element.background_image,
                    genres: element.genres.map(genre => genre={id:genre.id , name: genre.name}),
                    rating: element.rating
                })
            }); 
            res.send(auxGames);
        })
    }
    catch (error){
        next(error);
    }}

});
module.exports = router;