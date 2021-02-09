-- all employee view
SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS "Role Title", department.name AS "Department", role.salary AS "Salary", CONCAT (m.first_name, " " ,  m.last_name) AS "Manager" FROM employee e 
LEFT JOIN employee m ON e.manager_id = m.id 
LEFT JOIN role ON e.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id

-- all role view
SELECT title AS "Role Title" FROM role;

-- all department view
SELECT name AS "Department" FROM department;