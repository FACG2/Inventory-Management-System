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

test('POST /sign-in should set a token in the cookie', t => {
  request(app)
    .post('/sign-in')
    .set('Cookie', `token=${process.env.TEST_TOKEN}`)
    .send({username: 'salwa23', password: 'salwa23'})
    .end((err, res) => {
      t.same(res.statusCode, 302, 'Should contain sign in page');
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
      t.equal(res.headers.location, '/', 'return to home page');
      t.same(res.statusCode, 302, 'redirect status code');
      t.error(err, 'No error');
      t.end();
    });
});
test('GET /profile (authenticated) should render user\'s profile', t => {
  request(app)
    .get('/profile')
    .expect(200)
    .set('Cookie', `token=${process.env.TEST_TOKEN}`)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Should contain profile page');
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
      t.equal(res.headers.location, '/', ' return to home page');
      t.same(res.statusCode, 302, 'Status code is 302');
      t.error(err, 'No error');
      t.end();
    });
});

test('GET /goods/report (authenticated) should render report', t => {
  request(app)
    .get('/goods/report')
    .set('Cookie', `token=${process.env.TEST_TOKEN}`)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Should contain report page');
      t.error(err, 'No error');
      t.end();
    });
});

test('POST /goods/add  (unauthenticated)  should redirect to home page', t => {
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
      t.error(err, 'No error');

      t.end();
    });
});

test('POST /goods/add  (authenticated)  should redirect to add goods page', t => {
  const newGoods = { name: 'بنطلون', quantity: 55, type: 'قطن', charge_date: 11 / 3 / 2015, image: 'warehouse1.jpg', expiry_date: 12 / 12 / 2016 };
  // console.log(newGoods);
  request(app)
    .post(`/goods/add`)
    .set('Cookie', `token=${process.env.TEST_TOKEN}`)
    .send(newGoods)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 200');
      t.same(res.body.goodName, res.body.goodQuantity, res.body.goodType, res.body.chargeDate, res.imageName, res.body.expiryDate);
      t.error(err, 'No error');

      t.end();
    });
});

test('POST /goods/edit  (unauthenticated)  should redirect to home page', t => {
  const good = { id: 1, goodName: 'قميص', quantity: 10, goodType: 'قطن', image: 'warehouse1.jpg' };
  request(app)
    .post('/goods/edit')
    .send(good)
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.equal(res.headers.location, '/', 'shoud return to home page');
      t.same(res.statusCode, 302, 'Status code is 302');
      t.error(err, 'No error');
      t.end();
    });
});

test('POST /goods/edit  (authenticated)  should redirect to edit goods page', t => {
  const good = { id: 1, goodName: 'قميص', quantity: 10, goodType: 'قطن', image: 'warehouse1.jpg' };
  request(app)
    .post('/goods/edit')
    .set('Cookie', `token=${process.env.TEST_TOKEN}`)
    .send(good)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 200, 'Status code is 302');
      t.same(res.body.goodName, res.body.goodQuantity, res.body.goodType, res.body.image);
      t.error(err, 'No error');
      t.end();
    });
});

test.onFinish(() => process.exit(0));
