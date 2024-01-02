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
-- Name: utilization; Type: TABLE; Schema: public; Owner: swetanshu.patel
--

CREATE TABLE public.utilization (
    resource_name character varying,
    project_name character varying,
    billable_in_percent integer,
    utilization_id integer NOT NULL
);


ALTER TABLE public.utilization OWNER TO "swetanshu.patel";

--
-- Name: utilization_utilization_id_seq; Type: SEQUENCE; Schema: public; Owner: swetanshu.patel
--

CREATE SEQUENCE public.utilization_utilization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilization_utilization_id_seq OWNER TO "swetanshu.patel";

--
-- Name: utilization_utilization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: swetanshu.patel
--

ALTER SEQUENCE public.utilization_utilization_id_seq OWNED BY public.utilization.utilization_id;


--
-- Name: utilization utilization_id; Type: DEFAULT; Schema: public; Owner: swetanshu.patel
--

ALTER TABLE ONLY public.utilization ALTER COLUMN utilization_id SET DEFAULT nextval('public.utilization_utilization_id_seq'::regclass);


--
-- Name: utilization after_utilization_changes; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER after_utilization_changes AFTER INSERT OR DELETE OR UPDATE ON public.utilization FOR EACH ROW EXECUTE FUNCTION public.delete_null_resource_utilization();


--
-- PostgreSQL database dump complete
--

