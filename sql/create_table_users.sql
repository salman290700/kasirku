CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) not null 
);

INSERT INTO roles (name) VALUES ('user');
INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('super admin');
INSERT INTO roles (name) VALUES ('admin platform');

CREATE TABLE USERS (
  id int PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  role_id INT NOT NULL,
  Foreign Key (role_id) REFERENCES roles(id)  
);

CREATE TABLE employees (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) not null,
  name VARCHAR(255) not null,
  rating DOUBLE,
  store_id INT NOT NULL,
  department_id int not null,  
  FOREIGN KEY (department_id) REFERENCES departments(id),
  Foreign Key (store_id) REFERENCES stores(id)
);

CREATE TABLE employees_stores (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  store_id INT NOT NULL,
  Foreign Key (employee_id) REFERENCES employees(id),
  Foreign Key (store_id) REFERENCES stores(id)
);

CREATE TABLE departments (
  id int PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) not NULL
);

CREATE TABLE stores (
  id int PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) not NULL,
  description TEXT not NULL
);

CREATE TABLE items (
  id int PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  name VARCHAR(255) not NULL,
  description TEXT not NULL,
  price DOUBLE NOT NULL,
  profit DOUBLE NOT NULL,
  profit_percentage DOUBLE NOT NULL,  
  responsible_dept INT NOT NULL,
  Foreign Key (responsible_dept) REFERENCES departments(id),
  Foreign Key (store_id) REFERENCES stores(id)
);

CREATE TABLE orders (
  id int PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  total_price DOUBLE NOT NULL,
  status VARCHAR(25) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Foreign Key (store_id) REFERENCES stores(id)
);

CREATE TABLE USER_ROLE (
  id int PRIMARY KEY AUTO_INCREMENT,
  role_id int not null,
  user_id int NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
);



