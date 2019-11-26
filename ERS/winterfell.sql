drop schema if exists westeros cascade;--we are nuking the entire schema
create schema westeros;--then recreating it
set schema 'westeros';

create table "user" (
	user_id serial primary key,
	username text,
	"password" text,
	first_name text,
	last_name text,
	email text
);

create table roles (
	role_id serial primary key,
	role_name text
);

create table user_roles (
	user_id int4 references "user" (user_id),
	role_id int4 references roles (role_id),
	constraint user_roles_PK primary key (user_id, role_id)
);

create table reimbursement_status(	
	status_id serial primary key,
	status text
);

create table reimbursement_type(	
	type_id serial primary key,
	"type" text
);

create table reimbursement (
	reimbursement_id serial primary key,
	author int4 references "user" (user_id),
	amount int4,
	date_submitted int4,
	date_resolved int4,
	description text,
	resolver int4 references "user" (user_id), 
	status int4 references reimbursement_status (status_id), 
	"type" int4 references reimbursement_type (type_id)
);

create table reimbursement_resolver_status_types_(
	reimbursement_id int4 references reimbursement (reimbursement_id),
	status_id int4 references reimbursement_status (status_id),
	type_id int4 references reimbursement_type (type_id),
	
	constraint reimbursement_resolver_status_types_PK primary key (reimbursement_id, status_id, type_id)
);


insert into "user"(username, "password", first_name, last_name, email)
	values ('kingofthenorth', 'password', 'Jon', 'Snow', 'iknownothing@westeros.com'),
		   ('thehalfman', 'password', 'Tyrion', 'Lannister', 'handtoqueen@westeros.com'),
		   ('agirlhasnoname', 'password', 'Arya', 'Stark', 'valarmorghulis@westeros.com'),
		   ('queenofthenorth', 'password', 'Sansa', 'Stark', 'ladysansa@westeros.com');
		  
insert into roles(role_name)
	values ('Admin'),
		   ('Finance Manager'),
		   ('User');
		  
insert into user_roles
	values (1,1),
		   (2, 2),
		   (3, 3),
		   (4, 3);

--select * from "user" natural join user_roles natural join roles where username = 'kingofthenorth' and "password" = 'password'; 
--select * from westeros."user" natural join westeros.user_roles natural join westeros.roles where user_id = $1

insert into reimbursement_status(status)
	values ('Pending'),
		   ('Approved'),
		   ('Denied');
		  
insert into reimbursement_type("type")
	values ('Lodging'),
		   ('Travel'),
		   ('Food'),
		   ('Other');
		  
		  
insert into reimbursement(author, amount, date_submitted, date_resolved, description, resolver, status, "type")
	values (1, 500, 11, 3, 'Food for the dragons', 100, 1, 2);








select * from reimbursement;