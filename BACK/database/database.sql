DROP DATABASE mimascota

CREATE DATABASE mimascota

USE mimascota;

CREATE TABLE user(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120),
    surname VARCHAR(120),
    email VARCHAR(200),
    password varchar(250),
    active boolean DEFAULT 1,
    is_admin boolean DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE product(
	id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(120),
	description VARCHAR(250),
	price DECIMAL(8,2),
	brand VARCHAR(120),
	stock INT(10),
	category_id INT(10),
	provider_id INT(10),
	img VARCHAR(250),
	active boolean DEFAULT 1
);



CREATE TABLE category(
	id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100),
	description VARCHAR(250),
	active boolean DEFAULT 1
);

CREATE TABLE provider(
	id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100),
	contact_name VARCHAR(250),
	tlf int(50),
	active boolean DEFAULT 1
);

CREATE TABLE address(
	id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	street_name VARCHAR(200),
	stree_number VARCHAR(200),
	floor VARCHAR(80),
	letter VARCHAR(80),
	province VARCHAR(150),
	locality VARCHAR(150),
	town VARCHAR(150),
	postcode INT(5),
	details VARCHAR(250),
	active boolean DEFAULT 1
);



CREATE TABLE user_address(
	user_id INT(10),
	address_id INT(10),
	main_address BOOLEAN DEFAULT 1,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (user_id, address_id)
);


CREATE TABLE product_rating (
	id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	product_id INT(10),
	rating DECIMAL(2,1),
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






alter table product 
add constraint product_category foreign key (category_id) references category (id);

alter table product
add constraint product_provider foreign key (provider_id) references provider (id);


alter table user_address 
add constraint user_address foreign key (user_id) references user (id);


alter table user_address 
add constraint user_address_address foreign key (address_id) references address (id);

alter table product_rating
add constraint product_rating foreign key (product_id) references product (id);






insert into user (name, surname, email, password) values
	("Federico", "J??come", "fede@gmail.com", "1234");

insert into user (name, surname, email, password, is_admin) values
	("admin", "admin", "admin@gmail.com", "1234", 1);






insert into category (name, description) values
	("Complementos", "Todo tipo de complementos para mascotas"),
	("Juguetes", "Todo tipo de complementos para mascotas"),
	("Descanso", "Todo tipo de complementos para mascotas"),
	("Articulos", "Todo tipo de complementos para mascotas");




insert into provider (name, contact_name, tlf) values 
	("Art-atack", "Alfonso Gutierrez", 655780124),
	("Style", "Cristian Christensen", 895231457),
	("Diver", "Jesus Manuel Jandol", 623021457),
	("Confi", "Jorgue Brandon", 654254256);





insert into address (street_name, stree_number, floor, letter, province, locality, town, postcode, details) values
	("San Mateo", "3", "3", "A",  "M??laga", "Mijas", "Las Lagunas", 29651, ""),
	("Random", "5", "35", "izq",  "M??laga", "M??laga", "Campanillas", 29004, "");





insert into user_address (user_id, address_id, main_address) values
	(1, 1, 1),
	(2, 2, 1);



insert into product (name, description, price, brand, img,  stock, category_id, provider_id) values
	("Bufanda roja gato", 
		"Una bufanda bien calentita, es roja y de lana 100%, altamente recomendada.", 
		5.99, "Bufandilla", "bufanda-gato-perro.jpg", 100, 1, 1),

	("Cajita para perro", 
		"Una cajita con la que tu perro podra jugar y pasarlo bomba", 
		1.00, "Diver", "cama-invierno-mascota.jpg", 100, 2, 3),

	("Cama de mascota", 
		"Cama para perro o gato ideal para invierno o verano, muy comoda y realmente bonita.", 
		24.99, "Confi", "cama-mascota2.jpg", 100, 2, 4),

	("Bufanda gris gato", 
		"Una bufanda bien calentita, es gris y de lana 100%, altamente recomendada.", 
		6.99, "Bufandilla", "bufanda-mascota.jpg", 100, 1, 2),

	("Cama roja para mascota", 
		"Cama para perro o gato ideal para invierno o verano, muy comoda y realmente bonita.", 
		23.55, "Confi", "cama-mascota.jpg", 100, 3, 4),

	("Carrito de peluches", 
		"Un carrito ideal para tus mascotas o peluches, podras sacarlos a pasear o dejarlos ahi", 
		49.95, "Diver", "carrito-gato.jpg", 100, 4, 1),

	("Cojin rojo", 
		"Un coj??n bien suave, imprescindible para tu mascota si no quieres que se siente en el fr??o suelo", 
		16.50, "Confi", "cojin.jpg", 100, 3, 4),

	("Peluche Spider-Man", 
		"Un peluche super divertido para tu mascota, aunque tambi??n puede ser util para tus hijos.", 
		12.95, "Diver", "correa-perro.jpg", 100, 2, 3),

	("Gafas Gato", "Gafas bien modernas para que tu gato luzca fashion durante todo el a??o.", 
		5.99, "Style", "gafas-gato.jpg", 100, 1, 2),

	("Mu??equito azul", "Un mu??equito azul con cuerda para jugar con tu gato cuando no tengas otra cosa mejor que hacer", 
		3.40, "Diver", "gusanito-azul.jpg", 100, 2, 3),

	("Gusanito azul Diver", "Un gusanito azul muy gracioso para que puedas jugar con tu gato al pillalo pillalo", 
		3.75, "Diver", "gusanito-azul2.jpg", 100, 2, 3),

	("Mantita perro invierno", "Mantita 100% algodon, bien gordita e ideal para arropar a tus mascotas.", 
		12.00, "Bufandilla", "manta-perro.jpg", 100, 3, 4),

	("Manta multicolor", "Mantita 99% algodon, bien gordita e ideal para arropar a tus mascotas.", 
		18.75, "Bufandilla", "manta-perro-gato-invierno.jpg", 100, 3, 4),

	("Mu??equito rosa perro", "Mu??equito para tu perro o mascota, hace pitiditos y es de un plastico muy resistente", 
		4.99, "Diver", "muneco-perro.jpg", 100, 2, 3),

	("Peluche para mascota", "Peluche de tono marr??n para que tu mascota no pare de divertirse durante toda su vida", 
		99.99, "Diver", "oso-peluche.jpg", 100, 2, 3),

	("Peluche para gato", "Peluche de tono marr??n para que tu mascota no pare de divertirse durante toda su vida", 
		12.00, "Diver", "oso-peluche-mascota.jpg", 100, 2, 3),

	("Pareja de peluches", "Pareja de peluches, blanco y marr??n para tus mascotas o para ti, juega y dejales jugar", 
		150.25, "Diver", "oso-peluche-pareja.jpg", 100, 2, 3),

	("Pelota de hule", "Pelota roja para jugar y pasar ratos en el parque con tu perro o mascota", 
		12.00, "Style", "pelota-perro.jpg", 100, 2, 2),

	("Comedero-Bebedero perro", "Un comedero o bebedero para mascota plateado", 
		7.95, "Art-attack", "comedero-bebedero.jpg", 100, 4, 1),

	("Rascador de dos pisos", "Rascador de dos pisos con bolita colgando para que tu gato deje de destruir todos tus muebles", 
		250.25, "Art-attack", "rascador-gato.jpg", 100, 4, 1),

	("Tubo rojo para gato", "Un tubo bastante bueno para tu gato, dejalo que se meta ahi dentro y que viva la vida", 
		22.10, "Art-attack", "tubo-gato.jpg", 100, 1, 4);


insert into product_rating (product_id, rating) values 
	(1, 5),
	(1, 3.5),
	(1, 1),
	(1, 5),
	(2, 2.5),
	(2, 3),
	(2, 1.5),
	(3, 5),
	(3, 4.5),
	(4, 4),
	(4, 3.5),
	(5, 5),
	(6, 4),
	(7, 4),
	(8, 4);
