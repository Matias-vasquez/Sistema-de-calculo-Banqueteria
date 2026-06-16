-- ─────────────────────────────────────────────────────────────────────────────
-- MICROSERVICIO: CUENTAINFO
-- FLYWAY: V2__inserts_cuentainfo.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── ROL ─────────────────────────────────────────────────────────────────────

INSERT INTO ROL (NOMBRE, DESCRIPCION, ACCIONES, VALOR_HORA) VALUES
('Administrador',  'Control total del sistema',          'CREAR,EDITAR,ELIMINAR,VER', 0),
('Chef',           'Responsable de la cocina',           'VER,EDITAR',                5000),
('Mesero',         'Atención de mesas',                  'VER',                       3500),
('Bartender',      'Manejo de barra de bebestibles',     'VER,EDITAR',                4000),
('Coordinador',    'Coordinación general del evento',    'CREAR,EDITAR,VER',          6000),
('Asistente',      'Apoyo en labores generales',         'VER',                       3000),
('Decorador',      'Decoración del espacio',             'VER,EDITAR',                4500),
('Fotógrafo',      'Registro fotográfico del evento',    'VER',                       7000),
('DJ',             'Animación musical del evento',       'VER',                       8000),
('Seguridad',      'Control de acceso al evento',        'VER',                       3200);

-- ─── CUENTA ──────────────────────────────────────────────────────────────────

INSERT INTO CUENTA (EMAIL, CONTRASENIA, ESTADO, FECHA_CREACION, ROL_ID) VALUES
('admin@banquetera.cl',      '$2a$10$hashadmin',      'A', NOW(), 1),
('chef.carlos@banquetera.cl','$2a$10$hashchef',       'A', NOW(), 2),
('mesero.ana@banquetera.cl', '$2a$10$hashmesero',     'A', NOW(), 3),
('bar.pedro@banquetera.cl',  '$2a$10$hashbar',        'A', NOW(), 4),
('coord.luis@banquetera.cl', '$2a$10$hashcoord',      'A', NOW(), 5),
('asist.maria@banquetera.cl','$2a$10$hashasist',      'I', NOW(), 6),
('deco.jose@banquetera.cl',  '$2a$10$hashdeco',       'A', NOW(), 7),
('foto.paula@banquetera.cl', '$2a$10$hashfoto',       'A', NOW(), 8),
('dj.marco@banquetera.cl',   '$2a$10$hashdj',         'A', NOW(), 9),
('seg.rosa@banquetera.cl',   '$2a$10$hashseg',        'I', NOW(), 10);

-- ─── DATOS_USUARIO ───────────────────────────────────────────────────────────

INSERT INTO DATOS_USUARIO (CUENTA_ID, NOMBRE, APELLIDO, TELEFONO, DIRECCION, FECHA_NACIMIENTO) VALUES
(1,  'Carlos',   'González',  '98765432', 'Av. Principal 123, Santiago',    '1985-03-15'),
(2,  'Carlos',   'Ramírez',   '97654321', 'Calle Cocina 45, Santiago',      '1990-07-22'),
(3,  'Ana',      'Martínez',  '96543210', 'Pasaje Flores 67, Maipú',        '1995-11-08'),
(4,  'Pedro',    'López',     '95432109', 'Av. Barra 89, Pudahuel',         '1988-05-30'),
(5,  'Luis',     'Fernández', '94321098', 'Calle Eventos 12, Providencia',  '1982-09-14'),
(6,  'María',    'Torres',    '93210987', 'Av. Asistente 34, La Florida',   '1998-02-25'),
(7,  'José',     'Morales',   '92109876', 'Pasaje Deco 56, Ñuñoa',          '1993-12-01'),
(8,  'Paula',    'Soto',      '91098765', 'Calle Foto 78, Las Condes',      '1991-06-17'),
(9,  'Marco',    'Díaz',      '90987654', 'Av. Música 90, Vitacura',        '1987-04-09'),
(10, 'Rosa',     'Vega',      '99876543', 'Calle Segura 11, San Bernardo',  '1996-08-20');
