create database if not exists todo; 

use todo;

create table IF NOT EXISTS lists (
		listID int not null auto_increment,
		listName varchar(50),
         taskCount int,
         digitalOceanKey varchar(255),
		primary key (listID)

);
create table IF NOT EXISTS tasks (
		taskID int not null auto_increment,
		taskName varchar(50),
		listID int not null,
		primary key (taskID),
			constraint fk_list_id
			foreign key(listID)
			references lists(listID)
);

insert into lists (listName, taskCount) values 
('vouchers' , 0),
('tasks', 0),
('groceries', 0);

SELECT * FRoM lists;
SELECT * FRoM tasks;
SELECT count(*) FRoM tasks;

drop table lists;
drop table tasks;


UPDATE lists SET taskCount = ? WHERE listID = ?;