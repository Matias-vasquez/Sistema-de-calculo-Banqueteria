-- ─────────────────────────────────────────────────────────────────────────────
-- MICROSERVICIO: INGREDIENTES (puerto 8081)
-- BASE DE DATOS: banqueteria_ingredientes
-- ─────────────────────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS banqueteria_ingredientes;
USE banqueteria_ingredientes;

-- ─── INGREDIENTES ─────────────────────────────────────────────────────────────

CREATE TABLE INGREDIENTE (
    ID       BIGINT          NOT NULL AUTO_INCREMENT,
    NOMBRE   VARCHAR(50)  NOT NULL,
    ALERGIA  VARCHAR(2)   NOT NULL,
    VALOR_K  INT          NOT NULL,
    PRIMARY KEY (ID)
);

-- ─── PASTEL ───────────────────────────────────────────────────────────────────

CREATE TABLE PASTEL (
    ID   BIGINT       NOT NULL AUTO_INCREMENT,
    NOMBRE      VARCHAR(50)  NOT NULL,
    DESCRIPCION VARCHAR(200),
    PRIMARY KEY (ID)
);

-- ─── BEBESTIBLES ──────────────────────────────────────────────────────────────

CREATE TABLE BEBESTIBLE (
    ID          BIGINT         NOT NULL AUTO_INCREMENT,
    NOMBRE      VARCHAR(50) NOT NULL,
    DESCRIPCION VARCHAR(100),
    ALCOHOLICA  CHAR(1)     NOT NULL,
    PRIMARY KEY (ID)
);

-- ─── PLATILLOS ────────────────────────────────────────────────────────────────

CREATE TABLE PLATILLO (
    ID          BIGINT         NOT NULL AUTO_INCREMENT,
    NOMBRE      VARCHAR(50) NOT NULL,
    DESCRIPCION VARCHAR(100),
    DIETA       VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
);

-- ─── PASTEL_INGR (tabla intermedia) ──────────────────────────────────────────

CREATE TABLE PASTEL_INGR (
    PASTEL_ID  BIGINT NOT NULL,
    INGREDIENTE_ID   BIGINT    NOT NULL,
    PRIMARY KEY (PASTEL_ID, INGREDIENTE_ID),
    CONSTRAINT FK_PI_PASTEL FOREIGN KEY (PASTEL_ID) REFERENCES PASTEL(ID),
    CONSTRAINT FK_PI_ING    FOREIGN KEY (INGREDIENTE_ID)  REFERENCES INGREDIENTE(ID)
);

-- ─── PLATILLO_INGREDIENTES (tabla intermedia) ─────────────────────────────────

CREATE TABLE PLATILLO_INGREDIENTE (
    PLATILLO_ID    BIGINT NOT NULL,
    INGREDIENTE_ID BIGINT NOT NULL,
    PRIMARY KEY (PLATILLO_ID, INGREDIENTE_ID),
    CONSTRAINT FK_PLAT_ING_PLAT FOREIGN KEY (PLATILLO_ID)    REFERENCES PLATILLO(ID),
    CONSTRAINT FK_PLAT_ING_ING  FOREIGN KEY (INGREDIENTE_ID) REFERENCES INGREDIENTE(ID)
);
