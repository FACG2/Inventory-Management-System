const test = require('tape');

const request = require('supertest');
const app = require('../src/app');

test('GET / should render correct html', t => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      // console.log(res.text);
      const body = res.text;
      const signUp = 'signup-modal modal';
      const signIn = 'signin-modal modal';
      t.same(res.statusCode, 200, 'Status code is 200');
      t.notEqual(body.search(signUp), -1, ' Should contain sign up');
      t.notEqual(body.search(signIn), -1, ' Should contain sign in');
      t.error(err, 'No error');
      t.end();
    });
});

test('GET /home  Should redirect to home page ', t => {
  request(app)
    .get('/home')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      // console.log(res);
      t.same(res.statusCode, 302, 'Should contain home page');
      // console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});

test('GET /profile (unauthenticated)  should redirect to home page', t => {
  request(app)
    .get('/profile')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      // console.log(res);
      t.equal(res.headers.location, '/', 'Should return to home page');
      t.same(res.statusCode, 302, 'Should contain profile page');
      t.error(err, 'No error');
      t.end();
    });
});

test('GET /goods/report (unauthenticated)  should redirect to home page', t => {
  request(app)
    .get('/goods/report')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.headers.location, '/', 'shoud return to home page');
      t.same(res.statusCode, 302, 'Status code is 302');
      t.error(err, 'No error');
      t.end();
    });
});

test('GET /goods/add  (unauthenticated)  should redirect to home page', t => {
  const newGoods = { name: 'بنطلون', quantity: 55, type: 'قطن', charge_date: 11 / 3 / 2015, image: 'warehouse1.jpg', expiry_date: 12 / 12 / 2016 };
  // console.log(newGoods);
  request(app)
    .post(`/goods/add`)
    .send(newGoods)
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.headers.location, '/', 'shoud return to home page');
      t.same(res.statusCode, 302, 'Status code is 302');
      t.same(res.body.goodName, res.body.goodQuantity, res.body.goodType, res.body.chargeDate, res.imageName, res.body.expiryDate);
      t.error(err, 'No error');

      t.end();
    });
});

test('GET /goods/edit  (unauthenticated)  should redirect to home page', t => {
  const good = { id: 1, goodName: 'قميص', quantity: 10, goodType: 'قطن', image: 'warehouse1.jpg' };
  request(app)
    .post('/goods/edit')
    .send(good)
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.headers.location, '/', 'shoud return to home page');
      t.same(res.statusCode, 302, 'Status code is 302');
      t.same(res.body.goodName, res.body.goodQuantity, res.body.goodType, res.body.image);
      t.error(err, 'No error');
      t.end();
    });
});

test.onFinish(() => process.exit(0));
