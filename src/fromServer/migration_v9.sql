create table distance
(
    id       integer
        constraint  id_pk
            primary key,
    data       timestamp default now() not null,
    city       text                    not null,
    number     integer   default 0     not null,
    distance   integer   default 0     not null
);

