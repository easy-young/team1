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

    -- INSERT INTO user(userid,userpw,name,username,birth,gender,contact,phone)
    -- VALUES('shkim','1111','김성호','john','1998-10-02','agender','02-1111-2222','010-3333-4444');

    -- INSERT INTO user(userid,userpw,name,username,birth,gender,contact,phone)
    -- VALUES('cslee','1111','이철수','charles','2000-12-25','male','02-4444-5555','010-6666-7777');

    -- INSERT INTO user(userid,userpw,name,username,birth,gender,contact,phone) 
    -- VALUES('yhpark','1111','박영희','jane','2100-01-18','female','02-8888-9999','010-1234-5678');
    
CREATE TABLE board(
  idx int auto_increment primary key,
  title varchar(40) not null,
  content text not null,
  date timestamp not null,
  hit int not null
);