-- Environment --

set time zone 'Pacific/Auckland';

-- Tables --

create table Category (
        category varchar(32) primary key,
        description varchar(128) not null
);
create table Article (
        id serial primary key,
        name varchar(128) null,
        author varchar(128) not null,
        category varchar(32) not null references Category(category),
        fake_category varchar(32) not null references Category(category),
        body json not null,
        source_url varchar(256) not null,
        cover_url varchar(256) null,
        publication_date varchar(24) null, -- I don't like this, should be `Date` or `Timestamptz` type
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
        ('sport', 'sport, fitness, and exercise articles');
        