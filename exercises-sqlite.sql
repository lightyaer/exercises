BEGIN TRANSACTION;
-- Database Setup File

-- Drop Tables
DROP TABLE IF EXISTS `muscle`;
DROP TABLE IF EXISTS `force`;
DROP TABLE IF EXISTS `level`;
DROP TABLE IF EXISTS `mechanic`;
DROP TABLE IF EXISTS `equipment`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `alias`;
DROP TABLE IF EXISTS `exercise`;
DROP TABLE IF EXISTS `exercise_primary_muscles`;
DROP TABLE IF EXISTS `exercise_secondary_muscles`;
DROP TABLE IF EXISTS `exercise_force`;
DROP TABLE IF EXISTS `exercise_level`;
DROP TABLE IF EXISTS `exercise_mechanic`;
DROP TABLE IF EXISTS `exercise_equipment`;
DROP TABLE IF EXISTS `exercise_category`;

CREATE TABLE muscle ( id text(24) PRIMARY KEY, name text NOT NULL);
INSERT INTO muscle (id, name) VALUES ('ovz116ddk9v3p4pzyv2s8dcc', 'shoulders'),
('lmukfz7p1xh339x2ss5rdfay', 'middle back'),
('c30ea5blnaeuk1gzs2iwch22', 'chest'),
('hjgutvfpsclubhv8atedljol', 'calves'),
('jdq8573zmglvh4ycbime2jv6', 'forearms'),
('vm1rjqw42e9kvmxeebtxppb4', 'quadriceps'),
('faswud8jiay7bpr13v8av9rg', 'abdominals'),
('k7a0kczt08mrknd7jdbidkk3', 'triceps'),
('uk6kxmcvmdeqsjlzd305akk6', 'adductors'),
('kbtysoyh8zaju6e1jfjrfa39', 'lats'),
('un7wlqmnkko8h45oa3rxqeoa', 'biceps'),
('j1e931bbbv6czonbbhdciceo', 'lower back'),
('tn4es3b5xvgljqwr4822ghw8', 'hamstrings'),
('kv8197ji7qp7246bzqnfwwho', 'neck'),
('l5xroilp3y9onvzzmoy8z9l1', 'glutes'),
('q7ugfoa4cn4h7u3p0zlclka9', 'abductors'),
('yu0k5axi5gfgbkpbhxobmf86', 'traps');

CREATE TABLE force ( id text(24) PRIMARY KEY, name text NOT NULL);
INSERT INTO force (id, name) VALUES ('lst61x5uw1fv5jngw72i9ycg', 'static'),
('nh966jwyxogev7so24523eis', 'push'),
('i88mv1rpeaa2s71sto93lcj2', 'pull');

CREATE TABLE level ( id text(24) PRIMARY KEY, name text NOT NULL);
INSERT INTO level (id, name) VALUES ('xgmo4wpumlfcj20x39uisvrm', 'beginner'),
('m98pwfg1drjmadvjk4ad0wtj', 'intermediate'),
('t45egqchqks16phd0rr3xnma', 'expert');

CREATE TABLE mechanic ( id text(24) PRIMARY KEY, name text NOT NULL);
INSERT INTO mechanic (id, name) VALUES ('daziw36xz2n8frzdhf1va2v8', 'isolation'),
('p9ettid5yb1q01fe1mie9aop', 'compound');

CREATE TABLE equipment ( id text(24) PRIMARY KEY, name text NOT NULL);
INSERT INTO equipment (id, name) VALUES ('i2vg3nhxf0kxlte08sw5pyjt', 'bands'),
('amtlezu10lu5k7vn3iyxyjt7', 'kettlebells'),
('lam79idego4fumg4mo5ydn0k', 'barbell'),
('puabjm5085jqgmzl5z44jmv7', 'other'),
('daubhia5bq8e40dsqscd2n8v', 'cable'),
('p2aayaj9w3d18ui141nxhyog', 'dumbbell'),
('zxdcdzbbqjnga6grnsd0vzrm', 'body only'),
('tqsovs8df6qc0reube9s96bh', 'foam roll'),
('r7xcegvwjii9h38t2jwu8d4q', 'machine'),
('bsc524bcr6igyf0xg5wbm7q5', 'e-z curl bar'),
('loq4q0j36kf4bsdm67kbvknk', 'medicine ball'),
('p30lqq0n2s4hdofw4hpstnyj', 'exercise ball');

CREATE TABLE category ( id text(24) PRIMARY KEY, name text NOT NULL);
INSERT INTO category (id, name) VALUES ('alcqnfa6l7sdtprpfb154pke', 'strength'),
('uvj11jgp1bniz9lp1tnt0d9o', 'stretching'),
('xelnajawrxjn3z1hmwl7ec7z', 'plyometrics'),
('e1u1ez82ijltdu5x26xhrqe8', 'powerlifting'),
('yzi0z3wj3r5frkpgpqu9f08h', 'olympic weightlifting'),
('err1lo26qa2rb0bgpxnj9b17', 'strongman'),
('ozwamxotcal29yms5qillt9o', 'cardio');

-- Create Exercises Table
CREATE TABLE exercise (
  id text(24) PRIMARY KEY NOT NULL,
  instructions Text,
  created_at text(24) NOT NULL,
  updated_at text(24) NOT NULL
);

CREATE TABLE alias (
    id text(24) PRIMARY KEY NOT NULL,
    name text NOT NULL,
    exercise_id text(24) NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id)
  );
  

CREATE TABLE exercise_primary_muscles ( 
    muscle_id text(24),
    exercise_id text(24),
    FOREIGN KEY (muscle_id) REFERENCES muscle(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (muscle_id, exercise_id)
   );
CREATE TABLE exercise_secondary_muscles ( 
    muscle_id text(24),
    exercise_id text(24),
    FOREIGN KEY (muscle_id) REFERENCES muscle(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (muscle_id, exercise_id)
   );
CREATE TABLE exercise_force ( 
    force_id text(24),
    exercise_id text(24),
    FOREIGN KEY (force_id) REFERENCES force(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (force_id, exercise_id)
   );
CREATE TABLE exercise_level ( 
    level_id text(24),
    exercise_id text(24),
    FOREIGN KEY (level_id) REFERENCES level(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (level_id, exercise_id)
   );
CREATE TABLE exercise_mechanic ( 
    mechanic_id text(24),
    exercise_id text(24),
    FOREIGN KEY (mechanic_id) REFERENCES mechanic(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (mechanic_id, exercise_id)
   );
CREATE TABLE exercise_equipment ( 
    equipment_id text(24),
    exercise_id text(24),
    FOREIGN KEY (equipment_id) REFERENCES equipment(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (equipment_id, exercise_id)
   );
CREATE TABLE exercise_category ( 
    category_id text(24),
    exercise_id text(24),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (category_id, exercise_id)
   );

COMMIT;