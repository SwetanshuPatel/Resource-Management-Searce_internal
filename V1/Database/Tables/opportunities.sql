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
-- Name: opportunities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opportunities (
    consultant_name character varying,
    poc_name character varying,
    estimated_amount integer,
    opportunity_name character varying,
    stage character varying,
    closure_date character varying,
    resource_id integer,
    resource_name character varying,
    project_name character varying,
    region character varying,
    opportunity_id integer NOT NULL
);

-- ALTER TABLE public.opportunities OWNER TO "swetanshu.patel";

--
-- Name: opportunities_opportunity_id_seq; Type: SEQUENCE; Schema: public; Owner: swetanshu.patel
--

CREATE SEQUENCE public.opportunities_opportunity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public.opportunities_opportunity_id_seq OWNER TO "swetanshu.patel";

--
-- Name: opportunities_opportunity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: swetanshu.patel
--

ALTER SEQUENCE public.opportunities_opportunity_id_seq OWNED BY public.opportunities.opportunity_id;


--
-- Name: opportunities opportunity_id; Type: DEFAULT; Schema: public; Owner: swetanshu.patel
--

ALTER TABLE ONLY public.opportunities ALTER COLUMN opportunity_id SET DEFAULT nextval('public.opportunities_opportunity_id_seq'::regclass);


--
-- PostgreSQL database dump complete
--

