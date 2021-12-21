const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Videogame', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when has valid name, description, platforms and genres', () => {
        Videogame.create({ 
          name: 'Super Mario Bros',
          description: 'Adventure game with Mario', 
          platforms: ["PC","PlayStation 5"],
          genres: ["Action"]
        })
        .then((response) => expect(response.name).to.equal('SUPER MARIO BROS'))
        .then((response) => expect(response.description).to.equal('Adventure game with Mario'))
        .then((response) => expect(response.platforms[0]).to.equal('PC'))
      });
    });
    it('it shouldn t repeat the game', () => {
      Videogame.create({ 
        name: 'Super Mario Bros',
        description: 'Adventure game with Mario',
        platforms: ["PC","PlayStation 5"],
        genres: ["Action"]
      })
      .then(()=> done(new TypeError("No fue creado")))
      .catch(()=> done());
    });
  });

  after(()=> Videogame.sync({force:true}));

});
