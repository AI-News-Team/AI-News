create table Category (
        category varchar(32) primary key
);

create table Article (
        id serial primary key,
        name varchar(96) not null,
        author varchar(32) not null,
        category varchar(32) not null references Category(category),
        body json not null,
        source_url varchar(256) not null,
        cover_url varchar(256) null,
        publication_date varchar(24) null -- bad, make not null!
);

insert into Category (category) values ('news');

insert into Article (id, name, author, category, body, source_url, cover_url)
values (
        1,
        'British bus driver stops to give loose sheep a lift',
        'Ben Hooper',
        'news',
        '["''The sheep was running all over the road'', Martine said in a news release. ''It was difficult to catch, but then it slipped just in front of me and I was able to get hold of it and to use my handbag strap like a lasso. Two other motorists had stopped to help and together we were able to hold onto it until the police arrived''"]',
        'https://www.upi.com/Odd_News/2023/03/03/Brighton-Hove-Buses-loose-sheep/3311677870361/',
        'https://cdnph.upi.com/svc/sv/i/3311677870361/2023/1/16778704733821/British-bus-driver-stops-to-give-loose-sheep-a-lift.jpg'
),(
        2,
        'Minnesota officer removes jar from raccoon''s head',
        'Ben Hooper',
        'news',
        '["The officer engaged in a foot chase with the raccoon, which led to the officer traveling ''a quarter mile in steps within 10 square feet'' as the animal attempted to evade capture", "The officer was eventually able to grab the raccoon and remove the jar."]',
        'https://www.upi.com/Odd_News/2023/03/02/Oak-Grove-police-raccoon-jar-video/5671677787328/',
        'https://www.irishnews.com/picturesarchive/irishnews/irishnews/2017/03/09/180005893-a2d58e60-3107-49b3-a0e4-0e29c187dfd4.jpg'
),(
        3,
        'World''s Ugliest Dog contest seeking unalluring canines for 2023 competition',
        'Ben Hooper',
        'news',
        '["The contest, held each June at the Sonoma-Marin Fair, said it is seeking dogs with ''too little hair, too many wrinkles, an unusual nose or a funny waddle'' to compete in this year''s competition. "]',
        'https://www.upi.com/Odd_News/2023/02/28/Worlds-Ugliest-Dog-contest-accepting-applications/9171677609998/',
        'https://cdnph.upi.com/svc/sv/i/9171677609998/2023/1/16776103117700/Worlds-Ugliest-Dog-contest-seeking-unalluring-canines-for-2023-competition.jpg'
),(
        4,
        'This is the world''s greatest story',
        'Ben Hooper',
        'news',
        '["Look, Its the world''s most important story and you must pay attention to it.  Without this story the world as we know it will never be the same.  Thank you."]',
        'https://www.upi.com/Odd_News/2023/02/28/Worlds-Ugliest-Dog-contest-accepting-applications/9171677609998/',
        'https://images.squarespace-cdn.com/content/v1/60e6341f017575363ab46dbc/1627357208379-MVVT1Q1MZXUAFYOFJ3W3/placeholder-world.png'
);;