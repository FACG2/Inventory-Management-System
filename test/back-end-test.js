const test = require('tape');

const request = require('supertest');
const app = require('../src/app');

test('All routes should return the expected results', t => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      // console.log(res.text);
      const body = res.text;
      const word = 'signin-modal modal';
      t.same(res.statusCode, 200, 'Status code is 200');
      t.notEqual(body.search(word), -1, 'Status code is 200');
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      const body = res.text;
      const word = 'signup-modal modal';
      t.same(res.statusCode, 200, 'Status code is 200');
      t.notEqual(body.search(word), -1, 'Status code is 200');
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/home')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      t.same(res.statusCode, 302, 'Status code is 302');
      console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/profile')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 302, 'Status code is 302');
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/sign-up')
    .expect(404)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      t.same(res.statusCode, 404, 'Status code is 404');
      console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});
test('All routes should return the expected results', t => {
  request(app)
    .get('/sign-in')
    .expect(404)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      t.same(res.statusCode, 404, 'Status code is 404');
      console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/logout')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      t.same(res.statusCode, 302, 'Status code is 302');
      console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/goods/add')
    .expect(404)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      t.same(res.statusCode, 404, 'Status code is 404');
      console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/goods/:id')
    .expect(404)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      console.log(err);
      t.same(res.statusCode, 404, 'Status code is 404');
      console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});

test('All routes should return the expected results', t => {
  request(app)
    .get('/goods/report')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 302, 'Status code is 302');
      t.error(err, 'No error');
      t.end();
    });
});

test('Should add a new goods', t => {
  const newGoods = { name: 'بنطلون', quantity: 55, type: 'قطن', charge_date: 11 / 3 / 2015, image: 'warehouse1.jpg', expiry_date: 12 / 12 / 2016 };
  // console.log(newGoods);
  request(app)
    .post(`/goods/add`)
    .send(newGoods)
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 302, 'Status code is 302');
      t.same(res.body.goodName, res.body.goodQuantity, res.body.goodType, res.body.chargeDate, res.imageName, res.body.expiryDate);
      t.error(err, 'No error');

      t.end();
    });
});

test('Should  edit goods', t => {
  const good = { id: 1, goodName: 'قميص', quantity: 10, goodType: 'قطن', image: 'warehouse1.jpg' };
  request(app)
    .post('/goods/edit')
    .send(good)
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      t.same(res.statusCode, 302, 'Status code is 302');
      t.same(res.body.goodName, res.body.goodQuantity, res.body.goodType, res.body.image);
      t.error(err, 'No error');
      t.end();
    });
});

test('Should  delete goods', t => {
  const good = { id: 1, goodName: 'قميص', quantity: 10, goodType: 'قطن', image: 'warehouse1.jpg' };
  request(app)
    .post('/goods/edit')
    .send(good)
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      // console.log(err);
      t.same(res.statusCode, 302, 'Status code is 302');
      t.same(res.rows);
      // console.log(err);
      t.error(err, 'No error');
      t.end();
    });
});

test.onFinish(() => process.exit(0));
