USE emp_tracker_db
INSERT INTO department(dept_name) VALUES ('Sales');


INSERT INTO emp_role(title, salary, dept_id)
 VALUES ('Sales Associate', 50000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Billy', 'Joel', 1, 1);