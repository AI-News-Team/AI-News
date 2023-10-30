-- Environment --

set time zone 'Pacific/Auckland';

-- Tables --

create table Category (
        category varchar(32) primary key,
        description varchar(128) not null,
        color varchar(32) not null
);
create table Article (
        id int primary key not null,
        name varchar(256) not null,
        body json not null,
        image_gen boolean default false
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

create table Article_Visits (
        id int not null,
        click_date date not null default CURRENT_DATE,
        clicks int not null,
        primary key (id, click_date),
        constraint fk_article
                foreign key(id) 
                     references Article (id) 
                     on delete cascade
);

create table Author (
        name varchar(32) primary key
);

create table Routes (
        route_id serial primary key,
        route_name varchar(256),
        description varchar(128) not null
);

create table Tokens (
        token_id serial primary key,
        token varchar(256) not null,
        module varchar(32) not null, -- Used to identify which module the token is for
        created_at timestamptz not null default now()
        -- expires_at timestamptz -- Can add this for token expiration. Not sure for how long we want tokens to last.
);

create table Permissions (
        permission_id serial primary key,
        token_id int references Tokens(token_id),
        route_id int references Routes(route_id)
);

create or replace procedure record_visit(
   sent_id integer,
   today date
)
language plpgsql    
as $$
begin
if exists (select id, click_date from Article_Visits where sent_id = id and click_date = today) then
        update Article_Visits set clicks = clicks+1 where id = sent_id;
else
        insert into Article_Visits (id, click_date, clicks)
        values (sent_id, today, 1);
END IF;
    commit;
end;$$

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

-- Inserts existing routes into Route table
insert into Routes (route_name, description)
values  ('/article.create_raw', 'creates an article after scraping website'),
        ('/article.create', 'creates parahprased article'),
        ('/article.get', 'retrieves a single article by id'),
        ('/article.getAll', 'retrieves all scraped articles'),
        ('/article.list', 'retrieves articles from selected category'),
        ('/article.search.domain', 'saerches an article using embbedings'),
        ('/article.search', 'searches for an article'),
        ('/article.summary', 'retrieves a categorized summary of articles');

