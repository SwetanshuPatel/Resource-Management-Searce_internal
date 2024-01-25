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
-- Name: resources; Type: TABLE; Schema: public; Owner: swetanshu.patel
--

CREATE TABLE public.resources (
    resource_name character varying,
    project_assigned character varying,
    time_on_project character varying,
    time_off_project character varying,
    skill_learned_learning character varying,
    resource_id integer NOT NULL,
    project_id integer
);


ALTER TABLE public.resources OWNER TO "swetanshu.patel";

--
-- Name: resources after_delete_resources_projects; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER after_delete_resources_projects AFTER DELETE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.update_projects_on_resource_delete();


--
-- PostgreSQL database dump complete
--

