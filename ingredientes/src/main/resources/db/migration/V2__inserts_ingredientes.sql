-- ─────────────────────────────────────────────────────────────────────────────
-- MICROSERVICIO: INGREDIENTES
-- FLYWAY: V2__inserts_ingredientes.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── INGREDIENTE ─────────────────────────────────────────────────────────────

INSERT INTO INGREDIENTE (NOMBRE, ALERGIA, VALOR_K) VALUES
('Harina de trigo',  'GL', 364),
('Huevo',            'HU', 155),
('Leche entera',     'LA', 61),
('Mantequilla',      'LA', 717),
('Azúcar',           'NO', 387),
('Sal',              'NO', 0),
('Levadura',         'NO', 105),
('Cacao en polvo',   'NO', 228),
('Crema de leche',   'LA', 340),
('Vainilla',         'NO', 288);

-- ─── PASTEL ──────────────────────────────────────────────────────────────────

INSERT INTO PASTEL (NOMBRE, DESCRIPCION) VALUES
('Torta de chocolate',     'Bizcocho húmedo con cobertura de ganache'),
('Torta de vainilla',      'Esponjosa torta con crema pastelera'),
('Red Velvet',             'Torta roja con frosting de queso crema'),
('Torta de zanahoria',     'Con nueces y betún de queso'),
('Torta tres leches',      'Empapada en leche condensada, evaporada y crema'),
('Cheesecake de frutilla', 'Base de galleta con relleno de queso crema'),
('Torta de maracuyá',      'Con mousse de maracuyá y bizcocho suave'),
('Torta Ópera',            'Capas de bizcocho de almendra, café y chocolate'),
('Torta de limón',         'Con crema de limón y merengue italiano'),
('Torta Selva Negra',      'Bizcocho de chocolate con cerezas y crema');

-- ─── BEBESTIBLE ──────────────────────────────────────────────────────────────

INSERT INTO BEBESTIBLE (NOMBRE, DESCRIPCION, ALCOHOLICA) VALUES
('Agua mineral',        'Agua sin gas embotellada',              'N'),
('Jugo de naranja',     'Jugo natural de naranja',               'N'),
('Coca-Cola',           'Bebida gaseosa',                        'N'),
('Vino tinto reserva',  'Vino tinto de cepa Cabernet Sauvignon', 'S'),
('Vino blanco',         'Vino blanco de cepa Chardonnay',        'S'),
('Champagne',           'Espumante brut para brindis',           'S'),
('Cerveza artesanal',   'Cerveza rubia artesanal',               'S'),
('Pisco sour',          'Cóctel de pisco con limón',             'S'),
('Limonada natural',    'Limonada con menta y azúcar',           'N'),
('Té helado',           'Té negro frío con limón',               'N');

-- ─── PLATILLO ────────────────────────────────────────────────────────────────

INSERT INTO PLATILLO (NOMBRE, DESCRIPCION, DIETA) VALUES
('Lomo a la plancha',       'Lomo vetado a la plancha con papas',        'NO'),
('Salmón al horno',         'Filete de salmón con verduras asadas',      'NO'),
('Pasta primavera',         'Pasta con verduras salteadas',              'VE'),
('Ensalada César',          'Lechuga romana, crutones y aderezo César',  'VE'),
('Pollo al curry',          'Pollo en salsa de curry con arroz basmati', 'NO'),
('Risotto de champiñones',  'Arroz arbóreo cremoso con champiñones',     'VE'),
('Tacos de res',            'Tortillas con carne, guacamole y salsa',    'NO'),
('Bowl vegano',             'Quinoa, garbanzos, espinaca y hummus',      'VG'),
('Ceviche de camarones',    'Camarones marinados con limón y cilantro',  'NO'),
('Lasaña de verduras',      'Capas de pasta, verduras y bechamel',       'VE');

-- ─── PASTEL_INGR ─────────────────────────────────────────────────────────────

INSERT INTO PASTEL_INGR (PASTEL_ID, INGREDIENTE_ID) VALUES
(1, 1), (1, 2), (1, 3), (1, 8),
(2, 1), (2, 2), (2, 3), (2, 10),
(3, 1), (3, 4);

-- ─── PLATILLO_INGREDIENTE ─────────────────────────────────────────────────────

INSERT INTO PLATILLO_INGREDIENTE (PLATILLO_ID, INGREDIENTE_ID) VALUES
(3, 1), (3, 6),
(4, 2), (4, 6),
(6, 3), (6, 4),
(8, 6), (8, 5),
(10, 1), (10, 3);
