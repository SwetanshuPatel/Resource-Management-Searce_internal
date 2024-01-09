SET statement_timeout = 0;
SET lock_timeout = 0;

CREATE TABLE public.action_item (
    action_item_id integer,
    project_name character varying,
    next_step character varying
);

ALTER TABLE public.action_item OWNER TO "swetanshu.patel";

CREATE TABLE public.interactions (
    organizer character varying,
    project_name character varying,
    date_and_time character varying,
    summary character varying,
    action_item_id integer NOT NULL,
    interaction_id integer NOT NULL
);

ALTER TABLE public.interactions OWNER TO "swetanshu.patel";

CREATE SEQUENCE public.interactions_action_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.interactions_action_item_id_seq OWNER TO "swetanshu.patel";

ALTER SEQUENCE public.interactions_action_item_id_seq OWNED BY public.interactions.action_item_id;

CREATE SEQUENCE public.interactions_interaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.interactions_interaction_id_seq OWNER TO "swetanshu.patel";

ALTER SEQUENCE public.interactions_interaction_id_seq OWNED BY public.interactions.interaction_id;

ALTER TABLE ONLY public.interactions ALTER COLUMN action_item_id SET DEFAULT nextval('public.interactions_action_item_id_seq'::regclass);

ALTER TABLE ONLY public.interactions ALTER COLUMN interaction_id SET DEFAULT nextval('public.interactions_interaction_id_seq'::regclass);

CREATE TABLE public.opportunities (
    consultant_name character varying,
    poc_name character varying,
    estimated_amount integer,
    oppotunity_name character varying,
    stage character varying,
    closure_date character varying,
    resource_name character varying,
    project_name character varying,
    region character varying,
    opportunity_id integer NOT NULL
);

ALTER TABLE public.opportunities OWNER TO "swetanshu.patel";

CREATE SEQUENCE public.opportunities_opportunity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.opportunities_opportunity_id_seq OWNER TO "swetanshu.patel";

ALTER SEQUENCE public.opportunities_opportunity_id_seq OWNED BY public.opportunities.opportunity_id;

ALTER TABLE ONLY public.opportunities ALTER COLUMN opportunity_id SET DEFAULT nextval('public.opportunities_opportunity_id_seq'::regclass);

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

CREATE SEQUENCE public.projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.projects_project_id_seq OWNER TO "swetanshu.patel";

ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);

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

CREATE TABLE public.users (
    name character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL
);

ALTER TABLE public.users OWNER TO "swetanshu.patel";

CREATE TABLE public.utilization (
    resource_name character varying,
    project_name character varying,
    billable_in_percent integer,
    utilization_id integer NOT NULL
);

ALTER TABLE public.utilization OWNER TO "swetanshu.patel";

CREATE SEQUENCE public.utilization_utilization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.utilization_utilization_id_seq OWNER TO "swetanshu.patel";

ALTER SEQUENCE public.utilization_utilization_id_seq OWNED BY public.utilization.utilization_id;

ALTER TABLE ONLY public.utilization ALTER COLUMN utilization_id SET DEFAULT nextval('public.utilization_utilization_id_seq'::regclass);

CREATE OR REPLACE FUNCTION update_projects_on_resource_delete() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    DELETE FROM projects
    WHERE resource_name = OLD.resource_name AND project_id = OLD.project_id;
    RETURN OLD;
END;
$function$;

CREATE OR REPLACE FUNCTION delete_null_resource_utilization() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    DELETE FROM utilization
    WHERE resource_name IS NULL;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION delete_from_action_item() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    DELETE FROM action_item
    WHERE action_item_id = OLD.action_item_id;
    RETURN OLD;
END;
$function$;

CREATE OR REPLACE FUNCTION delete_related_resources() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    DELETE FROM resources
    WHERE resource_name = OLD.resource_name AND project_id = OLD.project_id;
    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION projects_delete_trigger() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    DELETE FROM utilization
    WHERE resource_name = OLD.resource_name AND project_name = OLD.project_name;
    RETURN OLD;
END;
$function$;

CREATE OR REPLACE FUNCTION insert_or_update_action_item() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO action_item (project_name, action_item_id, next_step)
        VALUES (NEW.project_name, NEW.action_item_id, 'Please Enter...');
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE action_item
        SET project_name = NEW.project_name,
            action_item_id = NEW.action_item_id,
            next_step = NEW.next_step
        WHERE action_item_id = NEW.action_item_id;
    END IF;

    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION insert_resource() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM resources
        WHERE project_assigned = NEW.project_name AND resource_name = NEW.resource_name
    ) THEN
        RAISE EXCEPTION 'Resource % already assigned', NEW.resource_name;
    END IF;

    INSERT INTO resources (resource_name, project_assigned, time_on_project, time_off_project, skill_learned_learning, resource_id, project_id)
    VALUES (NEW.resource_name, NEW.project_name, 'NA', 'NA', 'NA', NEW.resource_id, NEW.project_id);

    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION projects_insert_update_trigger() RETURNS trigger LANGUAGE plpgsql AS $function$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM utilization
        WHERE resource_name = NEW.resource_name AND project_name = NEW.project_name
    ) THEN
        UPDATE utilization
        SET resource_name = NEW.resource_name,
            project_name = NEW.project_name
        WHERE resource_name = NEW.resource_name AND project_name = NEW.project_name;
    ELSE
        INSERT INTO utilization (resource_name, project_name, billable_in_percent)
        VALUES (NEW.resource_name, NEW.project_name, 0);
    END IF;

    RETURN NEW;
END;
$function$;

-- Trigger creation statements

CREATE TRIGGER before_delete_interactions_trigger BEFORE DELETE ON public.interactions FOR EACH ROW EXECUTE FUNCTION public.delete_from_action_item();

CREATE TRIGGER insert_or_update_interactions_trigger AFTER INSERT OR DELETE ON public.interactions FOR EACH ROW EXECUTE FUNCTION public.insert_or_update_action_item();

CREATE TRIGGER delete_resources_on_project_delete AFTER DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.delete_related_resources();

CREATE TRIGGER delete_utilizations_trigger AFTER DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.projects_delete_trigger();

CREATE TRIGGER insert_resource_trigger AFTER INSERT ON public.projects FOR EACH ROW EXECUTE FUNCTION public.insert_resource();

CREATE TRIGGER insert_update_utilization_trigger AFTER INSERT OR UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.projects_insert_update_trigger();

CREATE TRIGGER after_delete_resources_projects AFTER DELETE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.update_projects_on_resource_delete();

CREATE TRIGGER after_utilization_changes AFTER INSERT OR DELETE OR UPDATE ON public.utilization FOR EACH ROW EXECUTE FUNCTION public.delete_null_resource_utilization();
