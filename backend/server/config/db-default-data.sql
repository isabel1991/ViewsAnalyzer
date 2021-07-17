-- SQLite
-- SQLite
-- -----------------------------------------------------
-- Table 'User'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'User' ;

CREATE TABLE IF NOT EXISTS 'User' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'username' TEXT NOT NULL UNIQUE,
  'email' TEXT NOT NULL,
  'password' TEXT NOT NULL,
  'isAdmin' INTEGER NOT NULL DEFAULT 0,
  'manager' INTEGER,
  'creationDate' TEXT NOT NULL,
  CONSTRAINT 'fk_User_User'
    FOREIGN KEY ('manager')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_User_User_idx' ON 'User' ('manager' ASC);


-- -----------------------------------------------------
-- Table 'State'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'State' ;

CREATE TABLE IF NOT EXISTS 'State' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL,
  'userId' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  CONSTRAINT 'fk_State_User1'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_State_User1_idx' ON 'State' ('userId' ASC);


-- -----------------------------------------------------
-- Table 'View'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'View' ;

CREATE TABLE IF NOT EXISTS 'View' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL,
  'description' TEXT NOT NULL,
  'usingFiltroMayores' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  'userId' INTEGER NOT NULL,
  'stateId' INTEGER NOT NULL,
  CONSTRAINT 'fk_View_User1'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_View_State1'
    FOREIGN KEY ('stateId')
    REFERENCES 'State' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_View_User1_idx' ON 'View' ('userId' ASC);

CREATE INDEX 'fk_View_State1_idx' ON 'View' ('stateId' ASC);


-- -----------------------------------------------------
-- Table 'ComponentType'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'ComponentType' ;

CREATE TABLE IF NOT EXISTS 'ComponentType' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'type' TEXT NOT NULL,
  'userId' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
 CONSTRAINT 'fk_ComponentType_User1'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_ComponentType_User1_idx' ON 'ComponentType' ('userId' ASC);


-- -----------------------------------------------------
-- Table 'ComponentSubType'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'ComponentSubType' ;

CREATE TABLE IF NOT EXISTS 'ComponentSubType' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'subtype' TEXT NOT NULL,
  'userId' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  'componentTypeId' INTEGER NOT NULL,
  'isWrapper' INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT 'fk_ComponentType_User10'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_ComponentSubType_ComponentType1'
    FOREIGN KEY ('componentTypeId')
    REFERENCES 'ComponentType' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_ComponentSubType_User1_idx' ON 'ComponentSubType' ('userId' ASC);

CREATE INDEX 'fk_ComponentSubType_ComponentType1_idx' ON 'ComponentSubType' ('componentTypeId' ASC);


-- -----------------------------------------------------
-- Table 'Component'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'Component' ;

CREATE TABLE IF NOT EXISTS 'Component' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'viewId' INTEGER NOT NULL,
  'ComponentSubTypeId' INTEGER NOT NULL,
  'wrapperComponent' INTEGER NOT NULL,
  'userId' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  CONSTRAINT 'fk_View_has_ComponentStructure_View1'
    FOREIGN KEY ('viewId')
    REFERENCES 'View' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_View_has_Component_User1'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Component_Component1'
    FOREIGN KEY ('wrapperComponent')
    REFERENCES 'Component' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Component_ComponentSubType1'
    FOREIGN KEY ('ComponentSubTypeId')
    REFERENCES 'ComponentSubType' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_View_has_ComponentStructure_View1_idx' ON 'Component' ('viewId' ASC);

CREATE INDEX 'fk_View_has_Component_User1_idx' ON 'Component' ('userId' ASC);

CREATE INDEX 'fk_Component_Component1_idx' ON 'Component' ('wrapperComponent' ASC);

CREATE INDEX 'fk_Component_ComponentSubType1_idx' ON 'Component' ('ComponentSubTypeId' ASC);


-- -----------------------------------------------------
-- Table 'ValueType'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'ValueType' ;

CREATE TABLE IF NOT EXISTS 'ValueType' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'value' TEXT NOT NULL,
  'description' TEXT NOT NULL,
  'userId' INTEGER NOT NULL,
  'creationDate' INTEGER NOT NULL,
  CONSTRAINT 'fk_ValueType_User1'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_ValueType_User1_idx' ON 'ValueType' ('userId' ASC);


-- -----------------------------------------------------
-- Table 'ParameterType'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'ParameterType' ;

CREATE TABLE IF NOT EXISTS 'ParameterType' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL,
  'description' TEXT NOT NULL,
  'userId' INTEGER NOT NULL,
  'creationDate' TEXT NOT NULL,
  'componentTypeId' INTEGER,
  'componentSubTypeId' INTEGER,
  'ValueTypeId' INTEGER,
  CONSTRAINT 'fk_Parameters_has_ComponentStructure_User1'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_ParameterType_ValueType1'
    FOREIGN KEY ('ValueTypeId')
    REFERENCES 'ValueType' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_Parameters_has_ComponentStructure_User1_idx' ON 'ParameterType' ('userId' ASC);

CREATE INDEX 'fk_ParameterType_ValueType1_idx' ON 'ParameterType' ('ValueTypeId' ASC);


-- -----------------------------------------------------
-- Table 'Parameter'
-- -----------------------------------------------------
DROP TABLE IF EXISTS 'Parameter' ;

CREATE TABLE IF NOT EXISTS 'Parameter' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'ParameterTypeId' INTEGER NOT NULL,
  'value' TEXT NOT NULL,
  'ComponentId' INTEGER NOT NULL,
  'userId' INTEGER NOT NULL,
  'creationDate' INTEGER NOT NULL,
  CONSTRAINT 'fk_Parameters_User1'
    FOREIGN KEY ('userId')
    REFERENCES 'User' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Parameter_Component1'
    FOREIGN KEY ('ComponentId')
    REFERENCES 'Component' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT 'fk_Parameter_ParameterType1'
    FOREIGN KEY ('ParameterTypeId')
    REFERENCES 'ParameterType' ('id')
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE INDEX 'fk_Parameters_User1_idx' ON 'Parameter' ('userId' ASC);

CREATE INDEX 'fk_Parameter_Component1_idx' ON 'Parameter' ('ComponentId' ASC);

CREATE INDEX 'fk_Parameter_ParameterType1_idx' ON 'Parameter' ('ParameterTypeId' ASC);