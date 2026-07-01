-- ─────────────────────────────────────────────────────────────────────────────
-- MICROSERVICIO: CUENTAINFO (puerto 8082)
-- BASE DE DATOS: banqueteria_cuentainfo
-- ─────────────────────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS banqueteria_calculo;
USE banqueteria_calculo;

CREATE TABLE CALCULOS(
    ID      BIGINT,
    CANT_CHEFS INT,
    LIQUIDO INT,
    PORCION INT,

    CONSTRAINT FK_CALCULOS_EVENTO UNIQUE KEY(ID),
    CONSTRAINT Uk_key UNIQUE Key(ID)
);
