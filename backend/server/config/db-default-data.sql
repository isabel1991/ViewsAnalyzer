DROP TABLE IF EXISTS 'User';
DROP TABLE IF EXISTS 'State';
DROP TABLE IF EXISTS 'View';
DROP TABLE IF EXISTS 'Component_Subtype';
DROP TABLE IF EXISTS 'Component_Type';
DROP TABLE IF EXISTS 'Parameter';
DROP TABLE IF EXISTS 'Component';
DROP TABLE IF EXISTS 'Component_Structure';
DROP TABLE IF EXISTS 'Component_of_View';

-- -----------------------------------------------------
-- Table 'User'
-- -----------------------------------------------------

DROP TABLE IF EXISTS 'User';
DROP TABLE IF EXISTS 'State';
DROP TABLE IF EXISTS 'View';
DROP TABLE IF EXISTS 'Component_Subtype';
DROP TABLE IF EXISTS 'Component_Type';
DROP TABLE IF EXISTS 'Parameter';
DROP TABLE IF EXISTS 'Component';
DROP TABLE IF EXISTS 'Component_Structure';
DROP TABLE IF EXISTS 'Component_of_View';




CREATE TABLE IF NOT EXISTS 'User' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'username' TEXT NOT NULL,
  'email' TEXT NOT NULL,
  'password' TEXT NOT NULL,
  'isAdmin' INTEGER NOT NULL DEFAULT 0,
  'manager' INTEGER NULL,
  CONSTRAINT 'fk_User_User'
    FOREIGN KEY ('manager')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX 'fk_User_User_idx' ON 'User' ('manager' ASC);


-- -----------------------------------------------------
-- Table 'State'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'State' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL,
  'creador' INTEGER NOT NULL,
  CONSTRAINT 'fk_State_User1'
    FOREIGN KEY ('creador')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_State_User1_idx' ON 'State' ('creador' ASC);


-- -----------------------------------------------------
-- Table 'View'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'View' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL,
  'description' TEXT NOT NULL,
  'usaFiltroMayores' INTEGER NOT NULL,
  'creador' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  'state' INTEGER NOT NULL,
  CONSTRAINT 'fk_View_User1'
    FOREIGN KEY ('creador')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_View_State1'
    FOREIGN KEY ('state')
    REFERENCES 'State' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_View_User1_idx' ON 'View' ('creador' ASC);

CREATE INDEX 'fk_View_State1_idx' ON 'View' ('state' ASC);


-- -----------------------------------------------------
-- Table 'Component_Subtype'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'Component_Subtype' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'subtype' TEXT NOT NULL,
  'creator' INTEGER NOT NULL,
  CONSTRAINT 'fk_Component_Subtype_User1'
    FOREIGN KEY ('creator')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_Component_Subtype_User1_idx' ON 'Component_Subtype' ('creator' ASC);


-- -----------------------------------------------------
-- Table 'Component_Type'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'Component_Type' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'type' TEXT NOT NULL,
  'subtipo' INTEGER NULL,
  'creator' INTEGER NOT NULL,
  CONSTRAINT 'fk_Component_Type_Component_Subtype1'
    FOREIGN KEY ('subtipo')
    REFERENCES 'Component_Subtype' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Component_Type_User1'
    FOREIGN KEY ('creator')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_Component_Type_Component_Subtype1_idx' ON 'Component_Type' ('subtipo' ASC);

CREATE INDEX 'fk_Component_Type_User1_idx' ON 'Component_Type' ('creator' ASC);


-- -----------------------------------------------------
-- Table 'Parameter'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'Parameter' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL);



-- -----------------------------------------------------
-- Table 'Component'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'Component' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'id_component' INTEGER NOT NULL,
  'id_component_subtype' INTEGER NOT NULL,
  'isVisible' INTEGER NOT NULL,
  'isActive' INTEGER NOT NULL,
  'wrapper_component' INTEGER NOT NULL,
  'creator' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  CONSTRAINT 'fk_Component_Component_Type1'
    FOREIGN KEY ('id_component' , 'id_component_subtype')
    REFERENCES 'Component_Type' ('id' , 'subtipo')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Component_User1'
    FOREIGN KEY ('creator')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_Component_User1_idx' ON 'Component' ('creator' ASC);


-- -----------------------------------------------------
-- Table 'Component_Structure'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'Component_Structure' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'id_component' INTEGER NOT NULL,
  'id_parameter' INTEGER NOT NULL,
  'value' TEXT NOT NULL,
  'creador' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  CONSTRAINT 'fk_Parameter_has_Component_Parameter1'
    FOREIGN KEY ('id_parameter')
    REFERENCES 'Parameter' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Parameter_has_Component_User1'
    FOREIGN KEY ('creador')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Component_Structure_Component1'
    FOREIGN KEY ('id_component')
    REFERENCES 'Component' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_Parameter_has_Component_Parameter1_idx' ON 'Component_Structure' ('id_parameter' ASC);
CREATE INDEX 'fk_Parameter_has_Component_User1_idx' ON 'Component_Structure' ('creador' ASC);
CREATE INDEX 'fk_Component_Structure_Component1_idx' ON 'Component_Structure' ('id_component' ASC);


-- -----------------------------------------------------
-- Table 'Component_of_View'
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS 'Component_of_View' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'id_view' INTEGER NOT NULL,
  'id_component_structure' INTEGER NOT NULL,
  'creador' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  CONSTRAINT 'fk_View_has_Parameter_of_Component_View1'
    FOREIGN KEY ('id_view')
    REFERENCES 'View' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_View_has_Parameter_of_Component_Parameter_of_Component1'
    FOREIGN KEY ('id_component_structure')
    REFERENCES 'Component_Structure' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Component_of_View_User1'
    FOREIGN KEY ('creador')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_View_has_Parameter_of_Component_Parameter_of_Component1_idx' ON 'Component_of_View' ('id_component_structure' ASC);

CREATE INDEX 'fk_View_has_Parameter_of_Component_View1_idx' ON 'Component_of_View' ('id_view' ASC);

CREATE INDEX 'fk_Component_of_View_User1_idx' ON 'Component_of_View' ('creador' ASC);
