-- all employee view
SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT (m.first_name, ' ' ,  m.last_name) AS manager FROM employee e 
LEFT JOIN employee m ON e.manager_id = m.id 
LEFT JOIN role ON e.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id;