
create database fase2ayd2;

use fase2ayd2;

CREATE TABLE tusuario(
	idusuario INT NOT NULL,
    usuario VARCHAR(80) NOT NULL,
    password VARCHAR(80) not null,
    correo VARCHAR(100),
    foto VARCHAR(250),
    CONSTRAINT PK_tusuario PRIMARY KEY(idusuario)
);



CREATE TABLE tagencia(
	idagencia INT NOT NULL,
    nombre VARCHAR(80) not null,
    latitud double(18,2),
    longitud double(18,2),
    cant_personas INT,
    capacidad_personas INT,
    CONSTRAINT PK_tagencia PRIMARY KEY(idagencia)
);

CREATE TABLE ttipo_servicio(
	idtiposervicio INT NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    CONSTRAINT PK_ttipo_servicio PRIMARY KEY(idtiposervicio)
);
CREATE TABLE tservicio_agencia(
	idagencia INT NOT NULL,
    descripcion VARCHAR(80),
    idtiposervicio INT NOT NULL,
    CONSTRAINT PK_tservicio_agencia PRIMARY KEY(idagencia,idtiposervicio),
    CONSTRAINT FK_tservicio_agencia_ttipo_servicio FOREIGN KEY (idtiposervicio) REFERENCES ttipo_servicio(idtiposervicio),
    CONSTRAINT FK_tservicio_agencia_tagencia FOREIGN KEY (idagencia) REFERENCES tagencia(idagencia)
);

CREATE TABLE thistorial_agencia(
	idhistorialagencia INT NOT NULL,
    fecha_hora DATETIME,
    idagencia INT NOT NULL,
    idusuario INT NOT NULL,
    tiempo_estadia double(18,2),
    idtiposervicio INT NOT NULL,
    CONSTRAINT PK_thistorial_agencia PRIMARY KEY(idhistorialagencia),
    CONSTRAINT FK_thisorial_agencia_tagencia FOREIGN KEY (idagencia) REFERENCES tagencia(idagencia),
    CONSTRAINT FK_thistorial_agencia_tusuario FOREIGN KEY (idusuario) REFERENCES tusuario(idusuario)
);
