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
-- Name: projects; Type: TABLE; Schema: public; Owner: swetanshu.patel
--

CREATE TABLE public.projects (
    project_name character varying,
    project_stage character varying,
    delivery_date character varying,
    resource_name character varying,
    region character varying,
    budget integer,
    start_date character varying,
    resource_id integer,
    project_id integer NOT NULL
);


ALTER TABLE public.projects OWNER TO "swetanshu.patel";

--
-- Name: projects_project_id_seq; Type: SEQUENCE; Schema: public; Owner: swetanshu.patel
--

CREATE SEQUENCE public.projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_project_id_seq OWNER TO "swetanshu.patel";

--
-- Name: projects_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: swetanshu.patel
--

ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;


--
-- Name: projects project_id; Type: DEFAULT; Schema: public; Owner: swetanshu.patel
--

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);


--
-- Name: projects delete_resources_on_project_delete; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER delete_resources_on_project_delete AFTER DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.delete_related_resources();


--
-- Name: projects delete_utilizations_trigger; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER delete_utilizations_trigger AFTER DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.projects_delete_trigger();


--
-- Name: projects insert_resource_trigger; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER insert_resource_trigger AFTER INSERT ON public.projects FOR EACH ROW EXECUTE FUNCTION public.insert_resource();


--
-- Name: projects insert_update_utilization_trigger; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER insert_update_utilization_trigger AFTER INSERT OR UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.projects_insert_update_trigger();


--
-- PostgreSQL database dump complete
--

