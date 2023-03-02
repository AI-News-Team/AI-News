create user docker
create database news_outlet_dev
grant all privileges on database news_outlet_dev to docker;

-- todo: make body JSON
-- todo: Add constraints on body
drop if exists table Documents;
create table documents (
        id int primary key autoincrement,
        name varchar(32) not null,
        body varchar(64) not null,
);
