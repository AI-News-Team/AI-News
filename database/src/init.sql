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
        name varchar(256) not null,
        body json not null
);

create table Article_Raw (
        id serial primary key,
        name varchar(256) not null unique,
        -- embbeded_name varchar(16276) not null,
        author varchar(256) not null,
        category varchar(32) not null references Category(category),
        body json not null,
        source_url varchar(256) not null,
        cover_url varchar(256) null,
        publication_date timestamptz not null,
        retrieved_date timestamptz not null default now()
);

create table Author (
        name varchar(32) primary key
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

insert into Author (name)
values ('Michael Knight'),
        ('Maggie Seaver'),
        ('Hannibal Smith'),
        ('Alex P. Keaton'),
        ('Angela Bower'),
        ('Tony Micelli'),
        ('MacGyver'),
        ('Jessica Fletcher'),
        ('Al Bundy'),
        ('Dorothy Zbornak'),
        ('Hawkeye Pierce'),
        ('Sam Malone'),
        ('Crockett'),
        ('Tubbs'),
        ('Max Headroom'),
        ('Murphy Brown'),
        ('A-Team'),
        ('Bo Duke'),
        ('Luke Duke'),
        ('Daisy Duke'),
        ('Magnum'),
        ('Higgins'),
        ('Mr. T'),
        ('Face'),
        ('B.A. Baracus'),
        ('Murdock'),
        ('Mork'),
        ('Mindy'),
        ('Alf'),
        ('Will Smith'),
        ('Carlton Banks'),
        ('Hilary Banks'),
        ('Uncle Phil'),
        ('Ashley Banks'),
        ('Geoffrey Butler'),
        ('Screech Powers'),
        ('Zack Morris'),
        ('A.C. Slater'),
        ('Kelly Kapowski'),
        ('Lisa Turtle'),
        ('Jessie Spano'),
        ('Maddie Hayes'),
        ('David Addison'),
        ('Blanche Devereaux'),
        ('Rose Nylund'),
        ('Sophia Petrillo'),
        ('Mama'),
        ('Cliff Huxtable'),
        ('Clair Huxtable'),
        ('Theo Huxtable'),
        ('Denise Huxtable'),
        ('Rudy Huxtable'),
        ('Vanessa Huxtable'),
        ('Elvin Tibideaux'),
        ('Samantha Micelli'),
        ('Jonathan Bower'),
        ('Phoebe Buffay'),
        ('Monica Geller'),
        ('Rachel Green'),
        ('Ross Geller'),
        ('Chandler Bing'),
        ('Joey Tribbiani'),
        ('Blair Warner'),
        ('Natalie Green'),
        ('Tootie Ramsey'),
        ('Jo Polniaczek'),
        ('Mrs. Garrett'),
        ('Willie Tanner'),
        ('Kate Tanner'),
        ('Lynn Tanner'),
        ('Brian Tanner'),
        ('Judith Light'),
        ('Vinnie Barbarino'),
        ('Juan Epstein'),
        ('Freddie Washington'),
        ('Arnold Horshack'),
        ('Mr. Kotter'),
        ('Laura Ingalls'),
        ('Mary Ingalls'),
        ('Caroline Ingalls'),
        ('Charles Ingalls'),
        ('Nellie Oleson'),
        ('Almanzo Wilder'),
        ('Fred Sanford'),
        ('Lamont Sanford'),
        ('Aunt Esther'),
        ('Grady Wilson'),
        ('Rollo Lawson');


        