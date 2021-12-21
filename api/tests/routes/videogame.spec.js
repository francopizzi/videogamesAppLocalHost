/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame , Genre , conn } = require('../../src/db.js');

const agent = session(app);
/*
const videogame = {
  name: 'Super Mario Bros',
};
*/

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('POST /videogame', () => {
  it('responde con 200', function(){
  return agent.post('/videogame')
      .send({
        name: 'Super Mario Bros 1',
        description: 'Adventure game with Mario',
        platforms: ["PC","PlayStation 5"],
        genres: ["Action"]
      })
      .expect(200);
  });
  it('setea correctamente el juego en la base de datos',  async function(){
     return agent.post('/videogame')
      .send({
        name: 'Super Mario Bros 2',
        description: 'Adventure game with Mario',
        platforms: ["PC","PlayStation 5"],
        genres: ["Action"]
      })
      .then((response) => {
        expect(response.body.name).to.equal('SUPER MARIO BROS 2');
        expect(response.body.description).to.equal('Adventure game with Mario');
      }); 
  }); 
});
after(()=> Videogame.sync({force:true}));
});
