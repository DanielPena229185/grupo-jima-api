INSERT INTO
    tortillerias (id, telefono, nombre, direccion)
VALUES
    ('1', '6421700028', 'Miriam', 'Rio Santasinta'),
    ('2', '6441942558', 'Edgar', 'Rio Santasinta'),
    ('3', '6441951272', 'Emir', 'Rio Santasinta');
    
INSERT INTO
    empleados (id, codigo_empleado, telefono, nombres, apellidos, tipo)
VALUES
	('1','OS1GH2GS3K','6441942558','Daniel Armando','Peña García','EMPLEADO'),
	('2','OS4GH5GS6K','6421700028','Edgar Emir','Borbón Jiménez','REPARTIDOR'),
	('3','OS7GH8GS9K','6441951272','Luis Angel','Toledo Russo','EMPLEADO');

INSERT INTO
    empleados_tortillerias (tortilleria_id, empleado_id)
VALUES
    ('1', '1'),
    ('1', '2'),
    ('1', '3');
    
INSERT INTO
    gramajes (id, gramaje)
VALUES
    ('1', 500),
    ('2', 1500),
    ('3', 2300);
    
INSERT INTO
    tiendas (id, telefono, nombre, direccion,repartidor_id,tortilleria_id)
VALUES
    ('1','6441425582','Don Chente','direccion_tienda_1','2','1'),
    ('2','6442685912','La Bodega','direccion_tienda_2','2','1'),
    ('3','6441587124','Don Pancho','direccion_tienda_3','2','1');
    
INSERT INTO
    productos (id, precio, gramajeId, tiendaId)
VALUES
    ('1', 16, '1', '1'),
    ('2', 20, '2', '1'),
    ('3', 23, '3', '1'),
    ('4', 14.50, '1', '2'),
    ('5', 21, '2', '2'),
    ('6', 22.50, '3', '2'),
    ('7', 11, '1', '3'),
    ('8', 18.90, '2', '3'),
    ('9', 22.70, '3', '3');