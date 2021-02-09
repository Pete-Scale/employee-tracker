USE employeeTracker_db;

-- department seeds

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

-- role seeds

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

-- employee seeds

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Murray", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ernie", "Hudson", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harold", "Ramis", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Aykroyd", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rick", "Moranis", 5, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sigourney", "Weaver", 6, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Annie", "Potts", 7, 6);