-- PROCEDIMIENTO PARA CREAR USUARIOS
DROP PROCEDURE IF EXISTS crearUsuario;
DELIMITER $$
CREATE PROCEDURE crearUsuario (
IN _usuario VARCHAR(80),
IN _password VARCHAR(80),
IN _correo VARCHAR(100),
IN _foto VARCHAR(250)
)
BEGIN
	
	SET @idusuario=(select MAX(idusuario)+1 FROM tusuario);
    IF @idusuario IS NULL 
    THEN
		set @idusuario=1;
    END IF;
	INSERT INTO tusuario(idusuario,usuario,password,correo,foto)
		VALUES (@idusuario,_usuario,_password,_correo,_foto);
END$$
-- procedimiento para actualizar usuario
DROP PROCEDURE IF EXISTS updateUsuario;
DELIMITER $$
CREATE PROCEDURE updateUsuario (
IN _usuario VARCHAR(80),
IN _password VARCHAR(80),
IN _correo VARCHAR(100),
IN _foto VARCHAR(250),
IN _idusuario INT
)
BEGIN
	IF EXISTS (select 1 FROM 
    tusuario 
    WHERE idusuario=_idusuario)
    THEN 
		IF _foto=''
        THEN 
			UPDATE tusuario
			set usuario=_usuario,
			password=_password,
			correo=_correo
			WHERE 
			idusuario=_idusuario;
        ELSE 
			UPDATE tusuario
			set usuario=_usuario,
			password=_password,
			correo=_correo,
			foto=_foto
			WHERE
			idusuario=_idusuario;    
        END IF;
	
    END IF;
END$$

-- PROCEDIMIENTO CONSULTAR USUARIO
DROP PROCEDURE IF EXISTS consultarUsuario;
DELIMITER $$
CREATE PROCEDURE consultarUsuario (
)
BEGIN
	SELECT * FROM tusuario;
END$$

DROP PROCEDURE IF EXISTS loginuser;
DELIMITER $$
CREATE PROCEDURE loginuser(
IN _usuario VARCHAR(80),
IN _password VARCHAR(80)
)
BEGIN 
	SELECT * FROM tusuario WHERE usuario=_usuario and password=_password;
END$$

-- Agregar agencia
DROP PROCEDURE IF EXISTS crearAgencia;
DELIMITER $$
CREATE PROCEDURE crearAgencia(
IN _nombre VARCHAR(80),
IN _latitud double(18,2),
IN _longitud double(18,2),
IN _cantidad_personas INT,
IN _capacidad_personas INT
)
BEGIN
	SET @idagencia=(SELECT max(idagencia)+1 FROM tagencia);
    IF @idagencia IS NULL 
    THEN 
		SET @idagencia=1;
    END IF;
    INSERT INTO tagencia(idagencia,nombre,latitud,longitud,cant_personas,capacidad_personas)
    VALUES(@idagencia,_nombre,_latitud,_longitud,_cantidad_personas,_capacidad_personas);
END$$
-- actualizar agencias
DROP PROCEDURE IF EXISTS updateAgencia;
DELIMITER $$
CREATE PROCEDURE updateAgencia (
IN _nombre VARCHAR(80),
IN _latitud double(18,2),
IN _longitud double(18,2),
IN _cantidad_personas INT,
IN _capacidad_personas INT,
IN _idagencia INT
)
BEGIN 
	IF EXISTS (
    SELECT 1 FROM 
    tagencia 
    WHERE idagencia=_idagencia
    )
    THEN 
		UPDATE tagencia 
		set nombre=_nombre,
		latitud=_latitud,
		longitud=_longitud,
		cant_personas=_cantidad_personas,
		capacidad_personas=_capacidad_personas
		WHERE idagencia=_idagencia;
    END IF ;
END$$
-- eliminar agencia 
DROP PROCEDURE IF EXISTS eliminarAgencia;
DELIMITER $$
CREATE PROCEDURE eliminarAgencia(
IN _idagencia INT
)
BEGIN 
	DELETE FROM tagencia WHERE idagencia=_idagencia;
END$$

-- consultar agencias
DROP PROCEDURE IF EXISTS consultarAgencia;
DELIMITER $$
CREATE PROCEDURE consultarAgencia()
BEGIN
	SELECT * FROM tagencia;
END$$  

-- CONSULTAR UNA AGENCIA con sus datos
DROP PROCEDURE IF EXISTS consultarAgenciaForId
DELIMITER $$
CREATE PROCEDURE consultarAgenciaForId(
IN _idagencia INT 
)
BEGIN 
	SELECT * FROM tagencia WHERE idagencia=_idagencia;
END$$
-- Agregar tipo servicio
DROP PROCEDURE IF EXISTS crearttipoServicio;
DELIMITER $$
CREATE PROCEDURE crearttipoServicio(
IN _descripcion VARCHAR(100)
)
BEGIN 
	SET @idtiposervicio=(SELECT MAX(idtiposervicio)+1 FROM ttipo_servicio);
    IF @idtiposervicio  IS NULL 
    THEN
     SET @idtiposervicio=1;
    END IF;
		INSERT ttipo_servicio(idtiposervicio,descripcion)
        VALUES(@idtiposervicio,_descripcion);
END$$

DROP PROCEDURE IF EXISTS updatettipoServicio;
DELIMITER $$
CREATE PROCEDURE updatettipoServicio(
IN _descripcion VARCHAR(100),
IN _idttiposervicio INT
)
BEGIN 
	UPDATE ttipo_servicio
    SET descripcion=_descripcion
    WHERE idtiposervicio=_idttiposervicio;
END$$

DROP PROCEDURE IF EXISTS consultarttipoServicio;
DELIMITER $$
CREATE PROCEDURE consultarttipoServicio()
BEGIN
	SELECT * FROM ttipo_servicio;
END$$ 

-- Agregar servicios por agencia 
DROP PROCEDURE IF EXISTS addservicio_agencia;
DELIMITER $$
CREATE PROCEDURE addservicio_agencia(
IN _idagencia INT,
IN _descripcion VARCHAR(80),
IN _idtiposervicio INT
)
BEGIN 
	IF NOT EXISTS (
    select 1
    FROM tservicio_agencia 
    where idagencia=_idagencia
    AND idtiposervicio=_idtiposervicio
    )
    THEN 
	INSERT INTO tservicio_agencia(idagencia,descripcion,idtiposervicio)
    VALUES(_idagencia,descripcion,_idtiposervicio);
    END IF;
END$$
-- consultar servicio - agencia 
DROP PROCEDURE IF EXISTS consultservicio_agencia;
DELIMITER $$
CREATE PROCEDURE consultservicio_agencia(
)
BEGIN 
	SELECT 
    ta.idagencia as idagencia,
    ta.nombre as agencia,
    tts.descripcion as servicio
    FROM tservicio_agencia tsa
    INNER JOIN tagencia ta ON ta.idagencia=tsa.idagencia
    INNER JOIN ttipo_servicio tts ON tts.idtiposervicio=tsa.idtiposervicio;
END$$ 
DROP procedure IF EXISTS consultarServicioAgencia;

DELIMITER $$
CREATE PROCEDURE consultarServicioAgencia(
IN _agencia VARCHAR(100)
)
BEGIN 
	SELECT 
    ta.idagencia as idagencia,
    ta.nombre as agencia,
    tts.descripcion as servicio
    FROM tservicio_agencia tsa
    INNER JOIN tagencia ta ON ta.idagencia=tsa.idagencia
    INNER JOIN ttipo_servicio tts ON tts.idtiposervicio=tsa.idtiposervicio
    WHERE ta.nombre like CONCAT('%',_agencia,'%');
END$$

