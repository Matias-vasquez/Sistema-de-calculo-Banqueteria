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
