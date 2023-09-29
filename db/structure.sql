create or replace table ep_users
(
    id       int      null,
    username tinytext null,
    password tinytext null
);

create or replace table es_cc_column
(
    id          int  null,
    id_model    int  null,
    column_name text null
);

create or replace table es_cc_model
(
    id         int          null,
    model_name text         null,
    folder     varchar(255) null
);

create or replace table es_cc_series
(
    id          int  null,
    id_model    int  null,
    series_name text null
);

create or replace table es_cc_specification
(
    id                     int auto_increment
        primary key,
    no                     int            null,
    update_date            date           null,
    status                 varchar(255)   null,
    ordercode              varchar(255)   null,
    description            text           null,
    group_p                varchar(255)   null,
    compatible             varchar(255)   null,
    msrp                   decimal(10, 2) null,
    msrp_vat               decimal(10, 2) null,
    specs_length_m         varchar(255)   null,
    remark                 text           null,
    bundle_items           varchar(255)   null,
    std_warranty_term      varchar(255)   null,
    lamp_light_source_head varchar(255)   null,
    service_type           varchar(255)   null,
    brochure               text           null
)
    collate = utf8_unicode_ci;

create or replace table es_cc_val
(
    id        int  null,
    id_series int  null,
    id_column int  null,
    val       text null
);

create or replace table es_token
(
    id      int      null,
    id_user int      null,
    token   text     null,
    expire  datetime null
);


