--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: docker
--



--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: docker
--

INSERT INTO public.category (category, description, color) VALUES ('news', 'generic news articles', '#cc0099');
INSERT INTO public.category (category, description, color) VALUES ('politics', 'current political events and debate articles', '#ea6d2d');
INSERT INTO public.category (category, description, color) VALUES ('business', 'business, fintech, or economic articles', '#f403fc');
INSERT INTO public.category (category, description, color) VALUES ('culture', 'culturally significant articles', '#0aa834');
INSERT INTO public.category (category, description, color) VALUES ('world', 'world news and event articles', '#ffcc66');
INSERT INTO public.category (category, description, color) VALUES ('style', 'world fashion', '#009999');
INSERT INTO public.category (category, description, color) VALUES ('health', 'deceases, new medicines, medical research articles', '#ff9933');
INSERT INTO public.category (category, description, color) VALUES ('weather', 'forecasts, climate', '#71a832');
INSERT INTO public.category (category, description, color) VALUES ('travel', 'cultural learnings of other countries', '#8d32a8');
INSERT INTO public.category (category, description, color) VALUES ('opinions', 'peoples opinions on current events', '#3271a8');
INSERT INTO public.category (category, description, color) VALUES ('entertainment', 'to have fun and smile', '#a87532');
INSERT INTO public.category (category, description, color) VALUES ('science', 'scientific research articles', '#a83232');
INSERT INTO public.category (category, description, color) VALUES ('tech', 'technology, gadgets, and software articles', '#1cba9d');
INSERT INTO public.category (category, description, color) VALUES ('food', 'food, cooking, and recipes articles', '#5039a3');
INSERT INTO public.category (category, description, color) VALUES ('sport', 'sport, fitness, and exercise articles', '#39a375');


--
-- Data for Name: article_raw; Type: TABLE DATA; Schema: public; Owner: docker
--



--
-- Data for Name: article_visits; Type: TABLE DATA; Schema: public; Owner: docker
--



--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: docker
--

INSERT INTO public.author (name) VALUES ('Michael Knight');
INSERT INTO public.author (name) VALUES ('Maggie Seaver');
INSERT INTO public.author (name) VALUES ('Hannibal Smith');
INSERT INTO public.author (name) VALUES ('Alex P. Keaton');
INSERT INTO public.author (name) VALUES ('Angela Bower');
INSERT INTO public.author (name) VALUES ('Tony Micelli');
INSERT INTO public.author (name) VALUES ('MacGyver');
INSERT INTO public.author (name) VALUES ('Jessica Fletcher');
INSERT INTO public.author (name) VALUES ('Al Bundy');
INSERT INTO public.author (name) VALUES ('Dorothy Zbornak');
INSERT INTO public.author (name) VALUES ('Hawkeye Pierce');
INSERT INTO public.author (name) VALUES ('Sam Malone');
INSERT INTO public.author (name) VALUES ('Crockett');
INSERT INTO public.author (name) VALUES ('Tubbs');
INSERT INTO public.author (name) VALUES ('Max Headroom');
INSERT INTO public.author (name) VALUES ('Murphy Brown');
INSERT INTO public.author (name) VALUES ('A-Team');
INSERT INTO public.author (name) VALUES ('Bo Duke');
INSERT INTO public.author (name) VALUES ('Luke Duke');
INSERT INTO public.author (name) VALUES ('Daisy Duke');
INSERT INTO public.author (name) VALUES ('Magnum');
INSERT INTO public.author (name) VALUES ('Higgins');
INSERT INTO public.author (name) VALUES ('Mr. T');
INSERT INTO public.author (name) VALUES ('Face');
INSERT INTO public.author (name) VALUES ('B.A. Baracus');
INSERT INTO public.author (name) VALUES ('Murdock');
INSERT INTO public.author (name) VALUES ('Mork');
INSERT INTO public.author (name) VALUES ('Mindy');
INSERT INTO public.author (name) VALUES ('Alf');
INSERT INTO public.author (name) VALUES ('Will Smith');
INSERT INTO public.author (name) VALUES ('Carlton Banks');
INSERT INTO public.author (name) VALUES ('Hilary Banks');
INSERT INTO public.author (name) VALUES ('Uncle Phil');
INSERT INTO public.author (name) VALUES ('Ashley Banks');
INSERT INTO public.author (name) VALUES ('Geoffrey Butler');
INSERT INTO public.author (name) VALUES ('Screech Powers');
INSERT INTO public.author (name) VALUES ('Zack Morris');
INSERT INTO public.author (name) VALUES ('A.C. Slater');
INSERT INTO public.author (name) VALUES ('Kelly Kapowski');
INSERT INTO public.author (name) VALUES ('Lisa Turtle');
INSERT INTO public.author (name) VALUES ('Jessie Spano');
INSERT INTO public.author (name) VALUES ('Maddie Hayes');
INSERT INTO public.author (name) VALUES ('David Addison');
INSERT INTO public.author (name) VALUES ('Blanche Devereaux');
INSERT INTO public.author (name) VALUES ('Rose Nylund');
INSERT INTO public.author (name) VALUES ('Sophia Petrillo');
INSERT INTO public.author (name) VALUES ('Mama');
INSERT INTO public.author (name) VALUES ('Cliff Huxtable');
INSERT INTO public.author (name) VALUES ('Clair Huxtable');
INSERT INTO public.author (name) VALUES ('Theo Huxtable');
INSERT INTO public.author (name) VALUES ('Denise Huxtable');
INSERT INTO public.author (name) VALUES ('Rudy Huxtable');
INSERT INTO public.author (name) VALUES ('Vanessa Huxtable');
INSERT INTO public.author (name) VALUES ('Elvin Tibideaux');
INSERT INTO public.author (name) VALUES ('Samantha Micelli');
INSERT INTO public.author (name) VALUES ('Jonathan Bower');
INSERT INTO public.author (name) VALUES ('Phoebe Buffay');
INSERT INTO public.author (name) VALUES ('Monica Geller');
INSERT INTO public.author (name) VALUES ('Rachel Green');
INSERT INTO public.author (name) VALUES ('Ross Geller');
INSERT INTO public.author (name) VALUES ('Chandler Bing');
INSERT INTO public.author (name) VALUES ('Joey Tribbiani');
INSERT INTO public.author (name) VALUES ('Blair Warner');
INSERT INTO public.author (name) VALUES ('Natalie Green');
INSERT INTO public.author (name) VALUES ('Tootie Ramsey');
INSERT INTO public.author (name) VALUES ('Jo Polniaczek');
INSERT INTO public.author (name) VALUES ('Mrs. Garrett');
INSERT INTO public.author (name) VALUES ('Willie Tanner');
INSERT INTO public.author (name) VALUES ('Kate Tanner');
INSERT INTO public.author (name) VALUES ('Lynn Tanner');
INSERT INTO public.author (name) VALUES ('Brian Tanner');
INSERT INTO public.author (name) VALUES ('Judith Light');
INSERT INTO public.author (name) VALUES ('Vinnie Barbarino');
INSERT INTO public.author (name) VALUES ('Juan Epstein');
INSERT INTO public.author (name) VALUES ('Freddie Washington');
INSERT INTO public.author (name) VALUES ('Arnold Horshack');
INSERT INTO public.author (name) VALUES ('Mr. Kotter');
INSERT INTO public.author (name) VALUES ('Laura Ingalls');
INSERT INTO public.author (name) VALUES ('Mary Ingalls');
INSERT INTO public.author (name) VALUES ('Caroline Ingalls');
INSERT INTO public.author (name) VALUES ('Charles Ingalls');
INSERT INTO public.author (name) VALUES ('Nellie Oleson');
INSERT INTO public.author (name) VALUES ('Almanzo Wilder');
INSERT INTO public.author (name) VALUES ('Fred Sanford');
INSERT INTO public.author (name) VALUES ('Lamont Sanford');
INSERT INTO public.author (name) VALUES ('Aunt Esther');
INSERT INTO public.author (name) VALUES ('Grady Wilson');
INSERT INTO public.author (name) VALUES ('Rollo Lawson');


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: docker
--

INSERT INTO public.routes (route_id, route_name, description) VALUES (1, '/article.create_raw', 'creates an article after scraping website');
INSERT INTO public.routes (route_id, route_name, description) VALUES (2, '/article.create', 'creates parahprased article');
INSERT INTO public.routes (route_id, route_name, description) VALUES (3, '/article.get', 'retrieves a single article by id');
INSERT INTO public.routes (route_id, route_name, description) VALUES (4, '/article.getAll', 'retrieves all scraped articles');
INSERT INTO public.routes (route_id, route_name, description) VALUES (5, '/article.list', 'retrieves articles from selected category');
INSERT INTO public.routes (route_id, route_name, description) VALUES (6, '/article.search.domain', 'saerches an article using embbedings');
INSERT INTO public.routes (route_id, route_name, description) VALUES (7, '/article.search', 'searches for an article');
INSERT INTO public.routes (route_id, route_name, description) VALUES (8, '/article.summary', 'retrieves a categorized summary of articles');


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: docker
--

INSERT INTO public.tokens (token_id, token, module, created_at) VALUES (1, 'A65F717EB78C5D01784ED19B45CB07C63731FD947E241375E6E90475D160E28E', 'scrapy', '2023-11-13 10:41:24.755419+00');
INSERT INTO public.tokens (token_id, token, module, created_at) VALUES (2, '707D8DE0C1C7700524C9E1070B585A8926952FA039D3537B010D1EB3E9D37A9E', 'reWriter', '2023-11-13 10:41:24.757803+00');


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: docker
--

INSERT INTO public.permissions (permission_id, token_id, route_id) VALUES (1, 1, 1);
INSERT INTO public.permissions (permission_id, token_id, route_id) VALUES (2, 2, 2);


--
-- Name: article_raw_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.article_raw_id_seq', 1, false);


--
-- Name: permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.permissions_permission_id_seq', 2, true);


--
-- Name: routes_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.routes_route_id_seq', 8, true);


--
-- Name: tokens_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.tokens_token_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

