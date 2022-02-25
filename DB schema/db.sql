CREATE DATABASE homepage;

USE homepage;

CREATE TABLE user(
    num INT, 
    userid varchar(30), 
    userpw varchar(50), 
    name varchar(10), 
    username varchar(30), 
    birth date, 
    gender varchar(20), 
    contact varchar(50), 
    phone varchar(50), 
    date timestamp default current_timestamp, 
    level int default 3, 
    status varchar(30) default 'Available' 
    );


CREATE TABLE board(
  num int auto_increment primary key,
  title varchar(40) not null,
  username text not null,
  date timestamp default current_timestamp,
  hit int not null
);

insert into board(title, username, hit) values('메롱', '영희', 11);
insert into board(title, username, hit) values('안녕하기세요', '김철수', 13);
insert into board(title, username, hit) values('안녕하세요', '김성호', 12);