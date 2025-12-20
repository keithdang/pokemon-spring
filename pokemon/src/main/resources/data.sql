insert into todo (id, description, done, target_date,username)
values (10001, 'Learn AWS', false, CURRENT_DATE(), 'in28minutes');

insert into todo (id, description, done, target_date,username)
values (10002, 'Get AWS Certified', false, CURRENT_DATE(), 'in28minutes');

insert into todo (id, description, done, target_date,username)
values (10003, 'Learn DevOps', false, CURRENT_DATE(), 'in28minutes');

insert into todo (id, description, done, target_date,username)
values (10004, 'Learn SpringBoot', false, CURRENT_DATE(), 'keith');


INSERT INTO pokemon_species (id, name, base_hp)
VALUES (1, 'Bulbasaur', 10);

INSERT INTO pokemon_species_types (pokemon_species_id, types)
VALUES (1, 'GRASS');

INSERT INTO pokemon_species_types (pokemon_species_id, types)
VALUES (1, 'POISON');

INSERT INTO pokemon_species (id, name, base_hp)
VALUES (4, 'Charmander', 10);

INSERT INTO pokemon_species_types (pokemon_species_id, types)
VALUES (4, 'FIRE');

INSERT INTO pokemon_species (id, name, base_hp)
VALUES (7, 'Squirtle', 10);

INSERT INTO pokemon_species_types (pokemon_species_id, types)
VALUES (7, 'WATER');

--INSERT INTO pokemon (id, name, trainer_id, pokemon_species_id, level)
--VALUES (101, 'froggy', 1, 1, 1);
--
--INSERT INTO pokemon (id, name, trainer_id, pokemon_species_id, level)
--VALUES (102, 'bernie', 2, 4, 3);

INSERT INTO move (id, name,element_type,damage)
VALUES (1, 'Flamethrower', 'FIRE',10);

INSERT INTO move (id, name,element_type,damage)
VALUES (2, 'Razor Leaf', 'GRASS',10);

INSERT INTO move (id, name,element_type,damage)
VALUES (3, 'Hydro Pump', 'WATER', 20);

INSERT INTO move (id, name,element_type,damage)
VALUES (4, 'Bubble Beam', 'WATER', 10);

INSERT INTO move (id, name,element_type,damage)
VALUES (5, 'Tackle', 'NORMAL', 10);

INSERT INTO move (id, name,element_type,damage)
VALUES (6, 'Tail Whip', 'NORMAL', 10);

INSERT INTO species_moves(move_id, species_id)
VALUES (1, 4);

INSERT INTO species_moves(move_id, species_id)
VALUES (6, 4);

INSERT INTO species_moves(move_id, species_id)
VALUES (3, 7);

INSERT INTO species_moves(move_id, species_id)
VALUES (4, 7);

INSERT INTO species_moves(move_id, species_id)
VALUES (2, 1);

INSERT INTO species_moves(move_id, species_id)
VALUES (5, 1);

--
--INSERT INTO pokemon (id, name)
--VALUES (7, 'Squirtle');
--
--INSERT INTO pokemon_types (pokemon_id, types)
--VALUES (7, 'WATER');

--insert into element_type (id, element)
--values (1, 'Fire');
--
--insert into element_type (id, element)
--values (2, 'Water');
--
--insert into element_type (id, element)
--values (3, 'Grass');
--
--insert into element_type (id, element)
--values (4, 'Rock');
--
--insert into element_type (id, element)
--values (5, 'Normal');

