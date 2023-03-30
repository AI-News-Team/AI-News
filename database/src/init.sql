create table Category (
        category varchar(32) primary key,
        description varchar(128) not null
);

insert into Category (category, description)
values  ('news', 'generic news articles'),
        ('gardening', 'gardening, landscaping, or botanical articles'),
        ('motoring', 'cars or motor sports related articles'),
        ('politics', 'current political events and debate articles'),
        ('business', 'business, fintech, or economic articles'),
        ('culture', 'culturally significant articles'),
        ('world', 'world news and event articles'),
        ('sport', 'generic sports articles');

create table Article (
        id serial primary key,
        name varchar(96) not null,
        author varchar(128),
        category varchar(32) not null references Category(category),
        fake_category varchar(32) not null references Category(category),
        body json not null,
        source_url varchar(256) not null,
        cover_url varchar(256) null,
        publication_date varchar(24) null -- bad, make not null!
);
