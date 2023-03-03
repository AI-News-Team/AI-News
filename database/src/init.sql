create table Article (
        id serial primary key,
        name varchar(64) not null,
        body varchar(256) not null
);

insert into Article (name, body)
values (
        'How to use Scrapy!', 'first run pip3 install scrappy in your teminal..'
),(
        '10 Reasons why AI is going to take your Job!', 'May as well quit now hile we still have our dignity'
);