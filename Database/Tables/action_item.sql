--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: action_item; Type: TABLE; Schema: public; Owner: swetanshu.patel
--

CREATE TABLE public.action_item (
    action_item_id integer,
    project_name character varying,
    next_step character varying
);


ALTER TABLE public.action_item OWNER TO "swetanshu.patel";

--
-- PostgreSQL database dump complete
--

