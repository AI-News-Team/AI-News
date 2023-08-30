-- Environment --

set time zone 'Pacific/Auckland';

-- Tables --

create table Category (
        category varchar(32) primary key,
        description varchar(128) not null,
        color varchar(32) not null
);
create table Article (
        id INT primary key not null,
        body json not null
);

create table Article_Raw (
        id serial primary key,
        name varchar(256) not null unique,
        embbeded_name varchar(16276) not null,
        author varchar(256) not null,
        category varchar(32) not null references Category(category),
        body json not null,
        source_url varchar(256) not null,
        cover_url varchar(256) null,
        publication_date timestamptz not null,
        retrieved_date timestamptz not null default now()
);

-- Defaults --

insert into Category (category, description, color)
values  ('news', 'generic news articles', '#cc0099'),
        ('politics', 'current political events and debate articles', '#ea6d2d'),
        ('business', 'business, fintech, or economic articles', '#f403fc'),
        ('culture', 'culturally significant articles', '#0aa834'),
        ('world', 'world news and event articles', '#ffcc66'),
        ('style', 'world fashion', '#009999'),
        ('health', 'deceases, new medicines, medical research articles', '#ff9933'),
        ('weather', 'forecasts, climate', '#71a832'),
        ('travel', 'cultural learnings of other countries', '#8d32a8'),
        ('opinions', 'peoples opinions on current events', '#3271a8'),
        ('entertainment', 'to have fun and smile', '#a87532'),
        ('science', 'scientific research articles', '#a83232'),
        ('tech', 'technology, gadgets, and software articles', '#1cba9d'),
        ('food', 'food, cooking, and recipes articles', '#5039a3'),
        ('sport', 'sport, fitness, and exercise articles', '#39a375');


create table Access (
  permission varchar(32) not null,
  description varchar(128) not null
  
  primary key(permission)
);

create table Permission (
  name varchar(32) not null
  access varchar(32) not null,
  route varchar(32) not null, -- probably use same name as API, or some other identifier
   
  primary key(name), -- unique name to identify this permission (read.Article.list, etc.)
  constraint FK_access_permission
    foreign key(permission)
    references Access(permission)
);

-- Tokens handed out to users (hash wold be passed along with API requests)
create table Token (
  id serial int not null,
  key uuid not null default gen_random_uuid() -- API key
  name varchar(32) null, -- user defined useful name?
  primary key(id) -- faster to index on `id` than hash
);

-- Associates permissions with API Tokens, eg:
-- 'f7sdf89asd89fs8d7fd' 'READ.article.list'
-- 'f7sdf89asd89fs8d7fd' 'READ.article.list_all'
-- 'f7sdf89asd89fs8d7fd' 'READ.article.summary'
create table Authorization (
  token int not null,
  permission varchar(32) not null,
  
  primary key(token, permission),
  constraint FK_authorization_permission
    foreign key(permission)
    references Permission(name)
  constraint FK_authorization_token
    foreign key(token)
    references Token(key)
); 

        