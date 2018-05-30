import chai, { expect } from 'chai';
// import chaihttp from 'chai-http';
import makeMove from '../../../src/client/actions/gameActions';
import app from '../../../src/server/index';

// const should = chai.should();

// chai.use(chaihttp);

// describe('API /index.html', () => {
//   it('should return all contacts', (done) => {
//     chai
//       .request(app)
//       .get('/index.html')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;

//         expect(res.body).to.be.an('object');
//         expect(res.body.data).to.be.an('array');

//         expect(res.body.data).to.have.length(2);

//         done();
//       });
//   });
// });

describe('game actions', () => {
  it('create an action to make move', () => {
    const action = makeMove({
      hasTurn: true,
      currentNumber: 456,
      isGameOver: false
    });

    expect(action).to.deep.equal({
      type: 'MAKE_MOVE',
      hasTurn: true,
      currentNumber: 456,
      isGameOver: false
    });
  });
});
