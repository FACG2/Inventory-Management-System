const test = require('tape');
const Goods = require('../src/models/db_functions/goodsFunctions.js');
const Users = require('../src/models/db_functions/userFunctions.js');
const Inv = require('../src/models/db_functions/inventoryFunctions.js');
const rep = require('../src/models/db_functions/reportFunctions.js');
const trans = require('../src/models/db_functions/transaction.js');
var date = new Date();

// GOODS
// 1. Test for add new goods (addGoods())
test('add new goods type', (t) => {
  var goods = {
    body: {
      goodName: 'بلوزة',
      goodQuantity: 5,
      goodType: 'قطن',
      chargeDate: date,
      imageName: 'sadfvdd',
      expiryDate: date,
      id: 1
    },
    invId: 1,
    imageName: 'fdaa'
  };
  Goods.addGoods(goods, (err, data) => {
    console.log(data);
    t.equal(err, null, 'should be null');
    t.equal(data[0].hasOwnProperty('id'), true, 'should return true');
    t.equal(Number.isInteger(data[0].id), true, 'should return a number as an Id');
    t.end();
  });
});

// 2. Get All goods
test('Get all goods', (t) => {
  Goods.getAllGoods(13, (err, data) => {
    t.equal(err, null, 'should be null');
    t.equal(Array.isArray(data), true, 'should return an array');
    t.end();
  });
});

// 3.Get good by id
test('get good by id', (t) => {
  var id = 2;
  Goods.getGoodById(id, (err, data) => {
    t.equal(err, null, 'error should be null');
    t.equal(data.hasOwnProperty('id'), true, 'should return true');
    t.end();
  });
});

// 4. Update goods
test('test Update goods', (t) => {
  var good = {
    body: {
      goodName: 'بلوزة',
      goodType: 'قطن',
      image: 'sadfvdd',
      id: 1
    }
  };
  Goods.updateGoods(good, (err, res) => {
    t.equal(err, null, 'Should be null');
    t.equal(Array.isArray(res.fields), true, 'should return true');
    t.end();
  });
});

// USERS
// 1. Test to add new user
// test('add new user ', (t) => {
//   var users = {
//     name: 'dadadd',
//     email: 'errsdfdfdfdddsdaf@ajflsdhfdedtfferqq',
//     role: 'hgfd',
//     username: 'wdesdfhsddfdffddjafsdfsdff',
//     password: '85'
//   };
//   Users.addUser(users, (err, data) => {
//     t.equal(err, null, 'should be null');
//     t.equal(data.hasOwnProperty('id'), true, 'should return true');
//     t.equal(Number.isInteger(data.id), true, 'should return a number as an Id');
//     t.end();
//   });
// });

// 2. Get all users
test('Test get all users', (t) => {
  Users.getAllUsers((err, data) => {
    t.equal(err, null, 'Should be null');
    t.equal(Array.isArray(data), true, 'should return an Array');
    t.end();
  });
});

// Inventories
// 1. Test add new inventory (addInentory)
test('Test add new inventory', (t) => {
  var inventory = {
    name: 'مستودع الصddنsdاddعdةnn',
    location: 'ddddddشارع الصناعةd j',
    capacity: 200,
    status: 'فارغ'
  };
  Inv.addInventory(inventory, (err, data) => {
    console.log(data);
    t.equal(err, null, 'should be null');
    t.equal(data.hasOwnProperty('id'), true, 'should return true');
    t.end();
  });
});

// 2. Test get all inventories
test('Test get all inventories', (t) => {
  Inv.getAllInv((err, res) => {
    t.equal(err, null, 'Should be null');
    t.equal(Array.isArray(res), true, 'should return an Array');
    t.end();
  });
});

// 3. getInventoryStatus inventory
test('test update status inventory ', (t) => {
  var id = 2;
  Inv.getInventoryStatus(id, (err, data) => {
    t.equal(err, null, 'should return err');
    t.equal(data.hasOwnProperty('status'), true, 'should return true');
    t.end();
  });
});

// 4. getInventoryByUserId
test('test get inventory by id', (t) => {
  var id = 1;
  Inv.getInventoryByUserId(id, (err, res) => {
    t.equal(err, null, 'should return err');
    t.equal(res.hasOwnProperty('id'), true, 'should return true');
    t.end();
  });
});

// report
// 1. getTransactionsForInventory report
test('test get transactions for inventory report', (t) => {
  var id = 1;
  rep.getTransactionsForInventory(id, (err, res) => {
    console.log(res[0]);
    t.equal(err, null, 'should return null');
    t.equal(Array.isArray(res), true, 'should return true');
    t.equal(res[0].hasOwnProperty('id'), true, 'should return true');
    t.end();
  });
});

// 2. addNewTransaction report
test('test add new transactions in report', (t) => {
  var report = {
    transactionType: ' حذف ',
    transactionDate: date,
    quantity: 5,
    goodName: 'dsf',
    goodType: 'dfds'
  };
  rep.addNewTransaction(report, (err, data) => {
    t.equal(err, null, 'should return true');
    t.equal(Number.isInteger(data.id), true, 'should return a number as an Id');
    t.end();
  });
});

// transactions
// 1. getTransaction
test('test get transactions by id', (t) => {
  var id = 1;
  trans.getTransaction(id, (err, res) => {
    t.equal(err, null, 'should return true');
    t.equal(res.hasOwnProperty('id'), true, 'should return true');
    t.end();
  });
});

// 2. getAll
test('get all transactions', (t) => {
  trans.getAll(2, (err, res) => {
    t.equal(err, null, 'Should be null');
    t.equal(Array.isArray(res), true, 'should return an Array');
    t.end();
  });
});
