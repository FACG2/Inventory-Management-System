const test = require('tape');
const Goods = require('../src/models/db_functions/goodsFunctions.js');
const Users = require('../src/models/db_functions/userFunctions.js');
const Inv = require('../src/models/db_functions/inventoryFunctions.js');

var date = new Date();

// GOODS
// 1. Test for add new goods (addGoods())
test('add new goods type', (t) => {
  var goods = {
    name: 'بلوزة',
    quantity: 5,
    type: 'قطن',
    charge_date: date,
    image: 'sadfvdd',
    expiry_date: date,
    inventory_id: 1
  };
  Goods.addGoods(goods, (err, data) => {
    // console.log(data);
    t.equal(err, null, 'should be null');
    t.equal(data.name, goods.name, `${data.name} should be equal ${goods.name}`);
    t.equal(Number.isInteger(data.id), true, 'should return a number as an Id');
    t.equal(data.hasOwnProperty('id'), true, 'should return true');
    t.end();
  });
});

// 2. Get All goods
test('Get all goods', (t) => {
  Goods.getAllGoods((err, data) => {
    t.equal(err, null, 'should be null');
    t.equal(Array.isArray(data), true, 'should return an array');
    t.equal(data[0].hasOwnProperty('name'), true, 'should return true');
    // t.equal(Number.isInteger(data.id), true, 'should return a number as an Id');
    // t.equal()
    t.end();
  });
});

// Get good by id
test('get good by id', (t) => {
  var id = 1;
  Goods.getgoodById(id, (err, data) => {
    t.equal(err, null, 'error should be null');
    t.equal(data.length, 1, 'should retrun an array with only one object');
    t.equal(data[0].id, id, 'should retrun the same id');
    t.end();
  });
});

// 3. Update goods
test('test Update goods', (t) => {
  var good = {
    id: 1,
    name: 'بلوزة',
    quantity: 5,
    type: 'قطن',
    charge_date: date,
    image: 'sadfvdd',
    expiry_date: date,
    inventory_id: 1
  };
  Goods.updateGoods(good, (err, res) => {
    // console.log(res);
    t.equal(err, null, 'Should be null');
    // t.equal(res.type, good.type, `${res.type} should be equal ${good.type}`);
    // t.equal(res.hasOwnProperty('id'), true, 'should equal true');
    // t.equal(res, undefined, `${res.type} should be equal ${good.type}`);
    t.equal(res.hasOwnProperty('name'), true, 'should return true');
    t.end();
  });
});

// 4. Delete Goods
test('Delete goods from inventory', (t) => {
  var dGoods = [{
    id: 1,
    name: 'wewf',
    quantity: 75,
    type: 'wf',
    charge_date: date,
    image: 'sadgrtyfvdd',
    expiry_date: date,
    inventory_id: 1
  }, {
    id: 2,
    name: 'زة',
    quantity: 3,
    type: 'zsf',
    charge_date: date,
    image: 'sadafvdd',
    expiry_date: date,
    inventory_id: 2 }];
  Goods.deletGoods(dGoods, (err, data) => {
    // var actual = Goods.deletGoods(dGoods, 1);
    // var expect = [ {
    //   id: 2,
    //   name: 'زة',
    //   quantity: 3,
    //   type: 'zsf',
    //   charge_date: date,
    //   image: 'sadafvdd',
    //   expiry_date: date,
    //   inventory_id: 2 }];
    // console.log(dGoods);
    t.equal(err, null, 'should be null');
    t.equal(dGoods.length, 2, 'Should delet first object');
    t.end();
  });
});

// USERS
// // 1. Test to add new user
// test('add new goods typedfadsfdsfsdfsdf', (t) => {
//   var users = {
//     name: 'ddd',
//     email: 'qq',
//     role: 'hgfd',
//     username: 'wdef',
//     password: '85'
//   };
//   Users.addUser(users, (err, data) => {
//     // console.log(data);
//     t.equal(err, null, 'should be null');
//     t.equal(data.name, users.name, `${data.name} should be equal ${users.name}`);
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
    name: 'مستودع الصناعة',
    location: 'شارع الصناعة',
    capacity: 200,
    status: 'فارغ'
  };
  Inv.addInventory(inventory, (err, data) => {
    t.equal(err, null, 'should be null');
    t.equal(data.location, inventory.location, `${data.location} should be equal ${inventory.location}`);
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
