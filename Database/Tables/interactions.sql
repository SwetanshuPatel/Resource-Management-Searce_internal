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
-- Name: interactions; Type: TABLE; Schema: public; Owner: swetanshu.patel
--

CREATE TABLE public.interactions (
    organizer character varying,
    project_name character varying,
    date_and_time character varying,
    summary character varying,
    action_item_id integer NOT NULL,
    interaction_id integer NOT NULL
);


ALTER TABLE public.interactions OWNER TO "swetanshu.patel";

--
-- Name: interactions_action_item_id_seq; Type: SEQUENCE; Schema: public; Owner: swetanshu.patel
--

CREATE SEQUENCE public.interactions_action_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interactions_action_item_id_seq OWNER TO "swetanshu.patel";

--
-- Name: interactions_action_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: swetanshu.patel
--

ALTER SEQUENCE public.interactions_action_item_id_seq OWNED BY public.interactions.action_item_id;


--
-- Name: interactions_interaction_id_seq; Type: SEQUENCE; Schema: public; Owner: swetanshu.patel
--

CREATE SEQUENCE public.interactions_interaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interactions_interaction_id_seq OWNER TO "swetanshu.patel";

--
-- Name: interactions_interaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: swetanshu.patel
--

ALTER SEQUENCE public.interactions_interaction_id_seq OWNED BY public.interactions.interaction_id;


--
-- Name: interactions action_item_id; Type: DEFAULT; Schema: public; Owner: swetanshu.patel
--

ALTER TABLE ONLY public.interactions ALTER COLUMN action_item_id SET DEFAULT nextval('public.interactions_action_item_id_seq'::regclass);


--
-- Name: interactions interaction_id; Type: DEFAULT; Schema: public; Owner: swetanshu.patel
--

ALTER TABLE ONLY public.interactions ALTER COLUMN interaction_id SET DEFAULT nextval('public.interactions_interaction_id_seq'::regclass);


--
-- Name: interactions before_delete_interactions_trigger; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER before_delete_interactions_trigger BEFORE DELETE ON public.interactions FOR EACH ROW EXECUTE FUNCTION public.delete_from_action_item();


--
-- Name: interactions insert_or_update_interactions_trigger; Type: TRIGGER; Schema: public; Owner: swetanshu.patel
--

CREATE TRIGGER insert_or_update_interactions_trigger AFTER INSERT OR DELETE ON public.interactions FOR EACH ROW EXECUTE FUNCTION public.insert_or_update_action_item();


--
-- PostgreSQL database dump complete
--

