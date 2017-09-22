BEGIN;

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS inventories cascade;
DROP TABLE IF EXISTS goods cascade;
DROP TABLE IF EXISTS transactions cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE inventories(
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  location VARCHAR NOT NULL,
  capacity VARCHAR not NULL,
  status VARCHAR,
  user_id INTEGER REFERENCES users (id)
);

CREATE TABLE goods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  quantity INTEGER,
  type VARCHAR(250),
  charge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  image BYTEA NOT NULL,
  expiry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  inventory_id INTEGER REFERENCES inventories(id)
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  transaction_date DATE NOT NULL,
  worker_name VARCHAR(20) NOT NULL,
  good_type VARCHAR NOT NULL,
  good_quantity INTEGER NOT NULL,
  inventory_id INTEGER REFERENCES inventories(id)
);

INSERT INTO users (name, email, role, username, password) VALUES
         ('سهاد دادر', 'sohadwd9@gmail.com', ' مالك المستودع ' ,
          ' سهاد ' ,
          '555'
);

INSERT INTO inventories (name, location, capacity, status, user_id) VALUES
        ('  مستودع النصر ' ,
        ' شارع النصر ' ,
      300 ,
    ' ممتلئ ' ,
  1);

  INSERT INTO goods (name, quantity, type, charge_date, image, expiry_date, inventory_id) VALUES
          (' قميص ',
          70,
        ' قطن ',
        CURRENT_DATE,
        'dsfsdfmsdvxcvxc',
        CURRENT_DATE,
      1);

INSERT INTO transactions(transaction_date , worker_name , good_type , good_quantity , inventory_id ) VALUES
                        (CURRENT_DATE , 'سهاد' , 'قميص' ,
                          5 , 1
                        );

COMMIT;
