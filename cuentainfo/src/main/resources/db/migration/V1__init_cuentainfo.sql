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
