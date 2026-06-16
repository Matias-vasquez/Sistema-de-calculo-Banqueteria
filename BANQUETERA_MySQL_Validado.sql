-- ─────────────────────────────────────────────────────────────────────────────
-- MICROSERVICIO: CUENTAINFO (puerto 8082)
-- BASE DE DATOS: banqueteria_cuentainfo
-- ─────────────────────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS banqueteria_cuentainfo;
USE banqueteria_cuentainfo;

-- ─── ROL ──────────────────────────────────────────────────────────────────────

CREATE TABLE ROL (
    ID          BIGINT          NOT NULL AUTO_INCREMENT,
    NOMBRE      VARCHAR(50)  NOT NULL,
    DESCRIPCION VARCHAR(100),
    ACCIONES    TEXT         NOT NULL,
    VALOR_HORA  INT          NOT NULL,
    PRIMARY KEY (ID)
);

-- ─── CUENTA ───────────────────────────────────────────────────────────────────

CREATE TABLE CUENTA (
    ID             BIGINT          NOT NULL AUTO_INCREMENT,
    EMAIL          VARCHAR(150) NOT NULL,
    CONTRASENIA    VARCHAR(200) NOT NULL,
    ESTADO         CHAR(1),
    FECHA_CREACION TIMESTAMP    NOT NULL,
    ROL_ID         BIGINT          NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT FK_CUENTA_ROL FOREIGN KEY (ROL_ID) REFERENCES ROL(ID)
);

-- ─── DATOS_USUARIO ────────────────────────────────────────────────────────────

CREATE TABLE DATOS_USUARIO (
    CUENTA_ID        BIGINT         NOT NULL,
    NOMBRE           VARCHAR(50) NOT NULL,
    APELLIDO         VARCHAR(50) NOT NULL,
    TELEFONO         VARCHAR(8)  NOT NULL,
    DIRECCION        VARCHAR(100) NOT NULL,
    FECHA_NACIMIENTO DATE        NOT NULL,
    PRIMARY KEY (CUENTA_ID),
    CONSTRAINT FK_DATOS_USUARIO_CUENTA FOREIGN KEY (CUENTA_ID) REFERENCES CUENTA(ID)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- MICROSERVICIO: EVENTO (puerto 8083)
-- BASE DE DATOS: banqueteria_evento
-- ─────────────────────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS banqueteria_evento;
USE banqueteria_evento;

-- ─── DIETAS_ALERGIAS ──────────────────────────────────────────────────────────

CREATE TABLE DIETAS_ALERGIAS (
    ID     BIGINT         NOT NULL AUTO_INCREMENT,
    NOMBRE VARCHAR(50) NOT NULL,
    TIPO   VARCHAR(2)  NOT NULL,
    PRIMARY KEY (ID)
);

-- ─── ACTA ─────────────────────────────────────────────────────────────────────
-- PASTEL_PASTEL_ID referencia al microservicio de ingredientes (solo se guarda el ID)

CREATE TABLE ACTA (
    ID               BIGINT     NOT NULL AUTO_INCREMENT,
    BARRA_ALIMENTOS  CHAR(1) NOT NULL,
    BARRA_ALCOHOL    CHAR(1) NOT NULL,
    FORMATO_ALIMENTO CHAR(1) NOT NULL,
    PASTEL_PASTEL_ID BIGINT  NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE KEY UK_ACTA_PASTEL (PASTEL_PASTEL_ID)
);

-- ─── EVENTO ───────────────────────────────────────────────────────────────────

CREATE TABLE EVENTO (
    ID                 BIGINT         NOT NULL AUTO_INCREMENT,
    TIPO_EVENTO        VARCHAR(50) NOT NULL,
    FECHA_EVENTO       DATE        NOT NULL,
    TERMINO_EVENTO     DATE        NOT NULL,
    TIPO_ESPACIO       CHAR(1),
    CANTIDAD_INVITADOS BIGINT         NOT NULL,
    FECHA_COTIZACION   TIMESTAMP   NOT NULL,
    ESTADO             CHAR(1)     NOT NULL,
    ACTA_ID            BIGINT         NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE KEY UK_EVENTO_ACTA (ACTA_ID),
    CONSTRAINT FK_EVENTO_ACTA FOREIGN KEY (ACTA_ID) REFERENCES ACTA(ID)
);

-- ─── ACTA_BEBESTIBLES (tabla intermedia) ──────────────────────────────────────
-- BEBESTIBLES_ID referencia al microservicio de ingredientes (solo se guarda el ID)

CREATE TABLE ACTA_BEBESTIBLES (
    ACTA_ID        BIGINT    NOT NULL,
    BEBESTIBLES_ID BIGINT NOT NULL,
    PRIMARY KEY (ACTA_ID, BEBESTIBLES_ID),
    CONSTRAINT FK_AB_ACTA FOREIGN KEY (ACTA_ID) REFERENCES ACTA(ID)
);

-- ─── ACTA_DIETA_ALERGIA (tabla intermedia) ────────────────────────────────────

CREATE TABLE ACTA_DIETA_ALERGIA (
    ACTA_ID            BIGINT NOT NULL,
    DIETAS_ALERGIAS_ID BIGINT NOT NULL,
    PRIMARY KEY (ACTA_ID, DIETAS_ALERGIAS_ID),
    CONSTRAINT FK_ADA_ACTA   FOREIGN KEY (ACTA_ID)            REFERENCES ACTA(ID),
    CONSTRAINT FK_ADA_DIETA  FOREIGN KEY (DIETAS_ALERGIAS_ID) REFERENCES DIETAS_ALERGIAS(ID)
);

-- ─── ACTA_PLATILLOS (tabla intermedia) ────────────────────────────────────────
-- PLATILLOS_ID referencia al microservicio de ingredientes (solo se guarda el ID)

CREATE TABLE ACTA_PLATILLOS (
    ACTA_ID     BIGINT    NOT NULL,
    PLATILLOS_ID BIGINT NOT NULL,
    PRIMARY KEY (ACTA_ID, PLATILLOS_ID),
    CONSTRAINT FK_AP_ACTA FOREIGN KEY (ACTA_ID) REFERENCES ACTA(ID)
);

-- ─── CUENTA_EVENTO (tabla intermedia) ─────────────────────────────────────────
-- CUENTA_ID referencia al microservicio de cuentainfo (solo se guarda el ID)

CREATE TABLE CUENTA_EVENTO (
    EVENTO_ID BIGINT    NOT NULL,
    CUENTA_ID BIGINT NOT NULL,
    PRIMARY KEY (EVENTO_ID, CUENTA_ID),
    CONSTRAINT FK_CE_EVENTO FOREIGN KEY (EVENTO_ID) REFERENCES EVENTO(ID)
);

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
