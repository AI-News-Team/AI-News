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
        name varchar(256) not null UNIQUE,
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

        