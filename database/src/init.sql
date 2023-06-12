-- Environment --

set time zone 'Pacific/Auckland';

-- Tables --

create table Category (
        category varchar(32) primary key,
        description varchar(128) not null
);
create table Article (
        id INT primary key not null,
        body json not null
);

create table Article_Raw (
        id serial primary key,
        name varchar(256) null,
        author varchar(256) not null,
        category varchar(32) not null references Category(category),
        body json not null,
        source_url varchar(256) not null,
        cover_url varchar(256) null,
        publication_date timestamptz not null,
        retrieved_date timestamptz not null default now()
);

-- Defaults --

insert into Category (category, description)
values  ('news', 'generic news articles'),
        ('gardening', 'gardening, landscaping, or botanical articles'),
        ('politics', 'current political events and debate articles'),
        ('business', 'business, fintech, or economic articles'),
        ('culture', 'culturally significant articles'),
        ('world', 'world news and event articles'),
        ('style', 'world fashion'),
        ('health', 'deceases, new medicines, medical research articles'),
        ('weather', 'forecasts, climate'),
        ('travel', 'cultural learnings of other countries'),
        ('opinions', 'peoples opinions on current events'),
        ('entertainment', 'to have fun and smile'),
        ('science', 'scientific research articles'),
        ('tech', 'technology, gadgets, and software articles'),
        ('food', 'food, cooking, and recipes articles'),
        ('us', 'united states news and event articles'),
        ('sport', 'sport, fitness, and exercise articles');
        