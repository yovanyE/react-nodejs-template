DROP PROCEDURE IF EXISTS sp_addtmovie;
DELIMITER $$
CREATE PROCEDURE sp_addtmovie(
IN _nombre VARCHAR(250),
IN _anio_lanzamiento INT,
IN _clasificacion VARCHAR(50),
IN _genero VARCHAR(50),
IN _descripcion VARCHAR(350)
)
BEGIN 
	INSERT INTO tmovie(nombre,anio_lanzamiento,clasificacion,genero,descripcion)
    VALUES(_nombre,_anio_lanzamiento,_clasificacion,_genero,_descripcion);
END$$

DROP PROCEDURE IF EXISTS sp_updatetmovie;
DELIMITER $$
CREATE PROCEDURE sp_updatetmovie(
IN _idmovie INT,
IN _nombre VARCHAR(250),
IN _anio_lanzamiento INT,
IN _clasificacion VARCHAR(50),
IN _genero VARCHAR(50),
IN _descripcion VARCHAR(350)
)
BEGIN 
	UPDATE tmovie set nombre=_nombre,anio_lanzamiento=_anio_lanzamiento,
    clasificacion=_clasificacion,genero=_genero,descripcion=_descripcion
    WHERE idmovie=_idmovie;
    
END$$


DROP PROCEDURE IF EXISTS sp_deletemovie;
DELIMITER $$
CREATE PROCEDURE sp_deletemovie(
IN _idmovie INT
)
BEGIN 
	DELETE FROM tmovie where idmovie=_idmovie;
END$$

DROP PROCEDURE IF EXISTS sp_consultamovie;
DELIMITER $$
CREATE PROCEDURE sp_consultamovie(
)
BEGIN 
	SELECT * FROM tmovie;
END$$