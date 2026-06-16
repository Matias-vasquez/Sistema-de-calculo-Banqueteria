-- ─────────────────────────────────────────────────────────────────────────────
-- MICROSERVICIO: EVENTO
-- FLYWAY: V2__inserts_evento.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── DIETAS_ALERGIAS ─────────────────────────────────────────────────────────

INSERT INTO DIETAS_ALERGIAS (NOMBRE, TIPO) VALUES
('Vegano',          'D'),
('Vegetariano',     'D'),
('Sin gluten',      'A'),
('Sin lactosa',     'A'),
('Sin mariscos',    'A'),
('Kosher',          'D'),
('Halal',           'D'),
('Sin frutos secos','A'),
('Sin huevo',       'A'),
('Bajo en sodio',   'D');

-- ─── ACTA ────────────────────────────────────────────────────────────────────
-- PASTEL_PASTEL_ID referencia IDs del microservicio ingredientes

INSERT INTO ACTA (BARRA_ALIMENTOS, BARRA_ALCOHOL, FORMATO_ALIMENTO, PASTEL_PASTEL_ID) VALUES
('S', 'S', 'B', 1),
('S', 'N', 'P', 2),
('S', 'S', 'B', 3),
('N', 'S', 'P', 4),
('S', 'S', 'B', 5),
('S', 'N', 'P', 6),
('N', 'N', 'P', 7),
('S', 'S', 'B', 8),
('S', 'S', 'P', 9),
('N', 'S', 'B', 10);

-- ─── EVENTO ──────────────────────────────────────────────────────────────────

INSERT INTO EVENTO (TIPO_EVENTO, FECHA_EVENTO, TERMINO_EVENTO, TIPO_ESPACIO, CANTIDAD_INVITADOS, FECHA_COTIZACION, ESTADO, ACTA_ID) VALUES
('Matrimonio',        '2026-07-15', '2026-07-16', 'I', 150, NOW(), 'A', 1),
('Cumpleaños',        '2026-07-20', '2026-07-20', 'E', 50,  NOW(), 'P', 2),
('Aniversario',       '2026-08-05', '2026-08-05', 'I', 80,  NOW(), 'A', 3),
('Graduación',        '2026-08-12', '2026-08-12', 'E', 120, NOW(), 'P', 4),
('Evento corporativo','2026-08-20', '2026-08-21', 'I', 200, NOW(), 'A', 5),
('Bautizo',           '2026-09-01', '2026-09-01', 'I', 60,  NOW(), 'P', 6),
('Quinceañero',       '2026-09-10', '2026-09-11', 'I', 100, NOW(), 'A', 7),
('Despedida',         '2026-09-18', '2026-09-18', 'E', 40,  NOW(), 'P', 8),
('Matrimonio',        '2026-10-03', '2026-10-04', 'I', 180, NOW(), 'A', 9),
('Cumpleaños',        '2026-10-15', '2026-10-15', 'E', 30,  NOW(), 'P', 10);

-- ─── ACTA_BEBESTIBLES ────────────────────────────────────────────────────────
-- BEBESTIBLES_ID referencia IDs del microservicio ingredientes

INSERT INTO ACTA_BEBESTIBLES (ACTA_ID, BEBESTIBLES_ID) VALUES
(1, 1), (1, 4), (1, 6),
(2, 1), (2, 2),
(3, 3), (3, 5), (3, 7),
(4, 6), (4, 8);

-- ─── ACTA_DIETA_ALERGIA ──────────────────────────────────────────────────────

INSERT INTO ACTA_DIETA_ALERGIA (ACTA_ID, DIETAS_ALERGIAS_ID) VALUES
(1, 2), (1, 3),
(2, 1), (2, 4),
(3, 3), (3, 5),
(4, 6), (4, 7),
(5, 1), (5, 8);

-- ─── ACTA_PLATILLOS ──────────────────────────────────────────────────────────
-- PLATILLOS_ID referencia IDs del microservicio ingredientes

INSERT INTO ACTA_PLATILLOS (ACTA_ID, PLATILLOS_ID) VALUES
(1, 1), (1, 4),
(2, 3), (2, 6),
(3, 2), (3, 5),
(4, 7), (4, 8),
(5, 9), (5, 10);

-- ─── CUENTA_EVENTO ───────────────────────────────────────────────────────────
-- CUENTA_ID referencia IDs del microservicio cuentainfo

INSERT INTO CUENTA_EVENTO (EVENTO_ID, CUENTA_ID) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4),
(3, 5), (3, 2),
(4, 1), (4, 6),
(5, 1), (5, 5);
