--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
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
-- Name: adonis_schema; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adonis_schema (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    batch integer NOT NULL,
    migration_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.adonis_schema OWNER TO postgres;

--
-- Name: adonis_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adonis_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.adonis_schema_id_seq OWNER TO postgres;

--
-- Name: adonis_schema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adonis_schema_id_seq OWNED BY public.adonis_schema.id;


--
-- Name: adonis_schema_versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adonis_schema_versions (
    version integer NOT NULL
);


ALTER TABLE public.adonis_schema_versions OWNER TO postgres;

--
-- Name: auth_access_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_access_tokens (
    id integer NOT NULL,
    tokenable_id integer NOT NULL,
    type character varying NOT NULL,
    name character varying,
    hash character varying NOT NULL,
    abilities text NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    last_used_at timestamp without time zone,
    expires_at timestamp without time zone
);


ALTER TABLE public.auth_access_tokens OWNER TO postgres;

--
-- Name: auth_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_access_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_access_tokens_id_seq OWNER TO postgres;

--
-- Name: auth_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_access_tokens_id_seq OWNED BY public.auth_access_tokens.id;


--
-- Name: boletas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boletas (
    id integer NOT NULL,
    fecha timestamp with time zone NOT NULL,
    pais character varying(255) NOT NULL,
    departamento character varying(255),
    genero character varying(255) NOT NULL,
    edad character varying(255) NOT NULL,
    usuario_id integer NOT NULL,
    serie integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    correo character varying(100),
    motivo json,
    viaja json,
    entero json,
    actividad json
);


ALTER TABLE public.boletas OWNER TO postgres;

--
-- Name: boletas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boletas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.boletas_id_seq OWNER TO postgres;

--
-- Name: boletas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boletas_id_seq OWNED BY public.boletas.id;


--
-- Name: combustible; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.combustible (
    id integer NOT NULL,
    fecha timestamp with time zone NOT NULL,
    placa character varying(255) NOT NULL,
    kilometraje_inicial integer NOT NULL,
    kilometraje_final integer,
    chofer character varying(255) NOT NULL,
    cupon_desde integer NOT NULL,
    cupon_hasta integer NOT NULL,
    saldo numeric(10,2) NOT NULL,
    estado_cupon character varying(255) NOT NULL,
    pdf text,
    observacion_cupon text,
    usuario_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.combustible OWNER TO postgres;

--
-- Name: combustible_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.combustible_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.combustible_id_seq OWNER TO postgres;

--
-- Name: combustible_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.combustible_id_seq OWNED BY public.combustible.id;


--
-- Name: departamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamentos (
    id integer NOT NULL,
    nombre character varying(254) NOT NULL,
    estado character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.departamentos OWNER TO postgres;

--
-- Name: departamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamentos_id_seq OWNER TO postgres;

--
-- Name: departamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamentos_id_seq OWNED BY public.departamentos.id;


--
-- Name: estado_expedientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_expedientes (
    id integer NOT NULL,
    nombre character varying(254) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.estado_expedientes OWNER TO postgres;

--
-- Name: estado_expedientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_expedientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_expedientes_id_seq OWNER TO postgres;

--
-- Name: estado_expedientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_expedientes_id_seq OWNED BY public.estado_expedientes.id;


--
-- Name: expedientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expedientes (
    id integer NOT NULL,
    poligono character varying NOT NULL,
    predio character varying NOT NULL,
    estanteria character varying NOT NULL,
    titular character varying NOT NULL,
    nivel integer NOT NULL,
    hojas integer NOT NULL,
    leitz character varying NOT NULL,
    archivo text,
    comentarios character varying NOT NULL,
    municipio_id integer,
    departamento_id integer,
    expediente_estado_id integer,
    usuario_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.expedientes OWNER TO postgres;

--
-- Name: expedientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expedientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expedientes_id_seq OWNER TO postgres;

--
-- Name: expedientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expedientes_id_seq OWNED BY public.expedientes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    password character varying NOT NULL,
    estado character varying DEFAULT 'ACTIVO'::character varying,
    rol_id integer,
    persona_id integer,
    foto text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
    
);



ALTER TABLE public.users OWNER TO postgres;

--
-- Name: expedientes_por_usuario; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.expedientes_por_usuario AS
 SELECT u.id AS usuario_id,
    u.nombre AS usuario_nombre,
    e.created_at AS fecha_ingreso,
    count(e.id) AS total_expedientes
   FROM (public.expedientes e
     JOIN public.users u ON ((u.id = e.usuario_id)))
  GROUP BY u.id, u.nombre, e.created_at
  ORDER BY u.nombre, e.created_at;


ALTER VIEW public.expedientes_por_usuario OWNER TO postgres;

--
-- Name: expedientes_por_usuario_nombre; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.expedientes_por_usuario_nombre AS
 SELECT u.nombre AS usuario_nombre,
    e.created_at AS fecha_ingreso,
    count(e.id) AS total_expedientes
   FROM (public.expedientes e
     JOIN public.users u ON ((u.id = e.usuario_id)))
  GROUP BY u.nombre, e.created_at
  ORDER BY u.nombre, e.created_at;


ALTER VIEW public.expedientes_por_usuario_nombre OWNER TO postgres;

--
-- Name: movimiento_expediente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movimiento_expediente (
    id integer NOT NULL,
    usuario_id integer,
    usuario_destino_id integer,
    expediente_id integer,
    fecha_salida timestamp without time zone,
    fecha_entrega timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.movimiento_expediente OWNER TO postgres;

--
-- Name: movimiento_expediente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movimiento_expediente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movimiento_expediente_id_seq OWNER TO postgres;

--
-- Name: movimiento_expediente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movimiento_expediente_id_seq OWNED BY public.movimiento_expediente.id;


--
-- Name: municipios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.municipios (
    id integer NOT NULL,
    nombre character varying(254) NOT NULL,
    departamento_id integer,
    estado character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.municipios OWNER TO postgres;

--
-- Name: municipios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.municipios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.municipios_id_seq OWNER TO postgres;

--
-- Name: municipios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.municipios_id_seq OWNED BY public.municipios.id;


--
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones (
    id integer NOT NULL,
    mensaje character varying(255) NOT NULL,
    visto boolean DEFAULT false,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    usuario_id integer NOT NULL
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- Name: notificaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notificaciones_id_seq OWNER TO postgres;

--
-- Name: notificaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_id_seq OWNED BY public.notificaciones.id;


--
-- Name: persona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persona (
    id integer NOT NULL,
    dpi character varying(20) NOT NULL
    nombres character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    telefono character varying(15) NOT NULL,
    estado character varying DEFAULT 'ACTIVO'::character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
    
);


ALTER TABLE public.persona OWNER TO postgres;

--
-- Name: persona_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.persona ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.persona_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255),
    estado character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vehiculos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehiculos (
    id integer NOT NULL,
    propietario character varying(254) NOT NULL,
    placa character varying(8) NOT NULL,
    modelo character varying(50),
    chofer character varying(100),
    foto text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    comentarios text,
    usuario_id integer
);


ALTER TABLE public.vehiculos OWNER TO postgres;

--
-- Name: vehiculos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehiculos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehiculos_id_seq OWNER TO postgres;

--
-- Name: vehiculos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehiculos_id_seq OWNED BY public.vehiculos.id;


--
-- Name: adonis_schema id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adonis_schema ALTER COLUMN id SET DEFAULT nextval('public.adonis_schema_id_seq'::regclass);


--
-- Name: auth_access_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.auth_access_tokens_id_seq'::regclass);


--
-- Name: boletas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletas ALTER COLUMN id SET DEFAULT nextval('public.boletas_id_seq'::regclass);


--
-- Name: combustible id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combustible ALTER COLUMN id SET DEFAULT nextval('public.combustible_id_seq'::regclass);


--
-- Name: departamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos ALTER COLUMN id SET DEFAULT nextval('public.departamentos_id_seq'::regclass);


--
-- Name: estado_expedientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_expedientes ALTER COLUMN id SET DEFAULT nextval('public.estado_expedientes_id_seq'::regclass);


--
-- Name: expedientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expedientes ALTER COLUMN id SET DEFAULT nextval('public.expedientes_id_seq'::regclass);


--
-- Name: movimiento_expediente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_expediente ALTER COLUMN id SET DEFAULT nextval('public.movimiento_expediente_id_seq'::regclass);


--
-- Name: municipios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipios ALTER COLUMN id SET DEFAULT nextval('public.municipios_id_seq'::regclass);


--
-- Name: notificaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones ALTER COLUMN id SET DEFAULT nextval('public.notificaciones_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vehiculos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos ALTER COLUMN id SET DEFAULT nextval('public.vehiculos_id_seq'::regclass);


--
-- Data for Name: adonis_schema; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adonis_schema (id, name, batch, migration_time) FROM stdin;
9	database/migrations/17203621051_create_roles_table	1	2024-07-17 00:37:19.151597-06
\.


--
-- Data for Name: adonis_schema_versions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adonis_schema_versions (version) FROM stdin;
2
\.


--
-- Data for Name: auth_access_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_access_tokens (id, tokenable_id, type, name, hash, abilities, created_at, updated_at, last_used_at, expires_at) FROM stdin;
1	1	auth_token	\N	1f3f0a46c843cb78d9d64bc513e9a3de51e2dee57af37aac25225f34ccde8948	["*"]	2024-07-17 06:47:02.564	2024-07-17 06:47:02.564	\N	2024-07-18 06:47:02.564
46	1	auth_token	\N	872f5cb9f9781a42530bc315a6b6ce51edfb5489523bd788108d2580f760acc1	["*"]	2024-08-03 12:53:57.34	2024-08-03 12:53:57.34	\N	2024-08-04 12:53:57.337
43	1	auth_token	\N	b42844d208c3ca9b6ba2701656da9c24f31e89c03cb4437b8dc86b2df13022aa	["*"]	2024-08-03 11:24:48.37	2024-08-03 11:24:48.37	2024-08-03 11:25:15.173	2024-08-04 11:24:48.346
44	1	auth_token	\N	dcb2e0645ff08ad93767180bd0fc21056aba8be5ee94f2cfffe073983a30f09d	["*"]	2024-08-03 11:34:28.885	2024-08-03 11:34:28.885	\N	2024-08-04 11:34:28.885
30	1	auth_token	\N	1c7d44cd517eccabcaa5cb6f1b7f1b12961633c816f8ada809008be221735a98	["*"]	2024-08-02 22:22:18.409	2024-08-02 22:22:18.409	2024-08-02 22:22:37.872	2024-08-03 22:22:18.408
31	1	auth_token	\N	77e6bd5393119330e6091819fbfa76872998ee5047b989b4ab7f15249c4fa5fc	["*"]	2024-08-02 22:28:09.803	2024-08-02 22:28:09.803	\N	2024-08-03 22:28:09.803
32	1	auth_token	\N	21c447f055b6b2e89f5d375241249caf43854f854e679dbb872017e582c9db92	["*"]	2024-08-02 22:28:46.718	2024-08-02 22:28:46.718	\N	2024-08-03 22:28:46.718
33	1	auth_token	\N	da244e99e7e2b4cd6e3bf134bde5bb4153d0c5847552ba74a4cb9ecee95c8147	["*"]	2024-08-02 22:30:58.262	2024-08-02 22:30:58.262	\N	2024-08-03 22:30:58.261
34	1	auth_token	\N	1f2a85cf6982cc3f8665d172270eab4a779de2d2d3f774a8cd68948c6cab3470	["*"]	2024-08-02 22:32:34.448	2024-08-02 22:32:34.448	\N	2024-08-03 22:32:34.447
35	1	auth_token	\N	95dad6ecb8f30331002f1dd75e67abdd04281eb76feaa886190fb6f649293904	["*"]	2024-08-02 22:35:45.333	2024-08-02 22:35:45.333	\N	2024-08-03 22:35:45.333
24	1	auth_token	\N	ab85dba2230991311e21c9477d564af348adf87b59d246a2d046f54e2dd34288	["*"]	2024-08-02 22:07:36.174	2024-08-02 22:07:36.174	2024-08-02 22:08:54.075	2024-08-03 22:07:36.173
25	1	auth_token	\N	d17ae4a4f3e1f8a5765a47c83adb4611d20832133e33f73ed31dfe959b406e9a	["*"]	2024-08-02 22:09:07.525	2024-08-02 22:09:07.525	\N	2024-08-03 22:09:07.525
6	1	auth_token	\N	58ed233b08c6957d9bcd5d378579b22c10527f540db11df346ed3220b9484bf4	["*"]	2024-07-27 05:40:49.216	2024-07-27 05:40:49.216	2024-07-27 07:23:26.74	2024-07-28 05:40:49.215
26	1	auth_token	\N	139d6c6155ae028271a0722b35fd6b8b4d7bdd02d406a51025db5a9711dc6ab1	["*"]	2024-08-02 22:15:20.408	2024-08-02 22:15:20.408	\N	2024-08-03 22:15:20.407
27	1	auth_token	\N	00df0bc55b76c2bda96327e745d92d245728589f58b35db970b9c19b290cef74	["*"]	2024-08-02 22:15:35.507	2024-08-02 22:15:35.507	\N	2024-08-03 22:15:35.507
28	1	auth_token	\N	645d4b92a93afc7e64067bc711dbd55d231fd5d689051e7ca7d56a8363631b5a	["*"]	2024-08-02 22:18:10.902	2024-08-02 22:18:10.902	\N	2024-08-03 22:18:10.901
29	1	auth_token	\N	ed9070897dc02527758a2815f0e206e61049047715261f2736e4c0f8e3314c19	["*"]	2024-08-02 22:21:34.104	2024-08-02 22:21:34.104	\N	2024-08-03 22:21:34.103
2	1	auth_token	\N	79ebb171dc94ffda3f5ea33de365c7f93f58b7d1020fec8bee7fde9b065752e0	["*"]	2024-07-17 06:47:17.314	2024-07-17 06:47:17.314	2024-07-17 22:18:38.095	2024-07-18 06:47:17.314
36	1	auth_token	\N	9acf567176c0ab6b2972771f5c8b8d64cb235ba3aaa59b87946d3c55e071553a	["*"]	2024-08-02 22:37:48.446	2024-08-02 22:37:48.446	\N	2024-08-03 22:37:48.445
37	1	auth_token	\N	c7974e738ebab662d5a3670ce25f04bd79668732806149a2e5360be7f01ce432	["*"]	2024-08-02 22:40:29.796	2024-08-02 22:40:29.796	\N	2024-08-03 22:40:29.796
38	1	auth_token	\N	af81005c43091cc30d9c2a0467014b5d5720cc856363ede6baf6d196fdf5c133	["*"]	2024-08-02 22:44:38.147	2024-08-02 22:44:38.147	\N	2024-08-03 22:44:38.145
39	1	auth_token	\N	0329aa8ea8d7fca89fdf379d0e89be7d3a548f26d7ad5bea967db883f6aad875	["*"]	2024-08-02 22:47:05.646	2024-08-02 22:47:05.646	\N	2024-08-03 22:47:05.646
7	1	auth_token	\N	af9d7072a478b741c5c17bdb074b0841cc792bf3bf9693ef3ec4bf839e665060	["*"]	2024-08-02 21:47:17.766	2024-08-02 21:47:17.766	2024-08-02 21:47:18.091	2024-08-03 21:47:17.765
8	1	auth_token	\N	98f8ca8394b39a209b1d857e097342ab941907f9d4235b7c72fd4d4eab3faca6	["*"]	2024-08-02 21:48:53.69	2024-08-02 21:48:53.69	\N	2024-08-03 21:48:53.689
9	1	auth_token	\N	2cec76646e9158f9669d044514b2a7f8f85789dc92c7a5bfaa1df70cb1cab1b7	["*"]	2024-08-02 21:49:02.608	2024-08-02 21:49:02.608	\N	2024-08-03 21:49:02.608
10	1	auth_token	\N	0fb95d831b2724950d25b3f8e6baa78fb1d45245ae6c60f8cb030ea5debb3af7	["*"]	2024-08-02 21:49:12.182	2024-08-02 21:49:12.182	\N	2024-08-03 21:49:12.182
11	1	auth_token	\N	897ff48c9c04f975eae34ab76f1e1071e0fd9f1b45d12b47dddd34ece1fa834e	["*"]	2024-08-02 21:49:56.918	2024-08-02 21:49:56.918	\N	2024-08-03 21:49:56.918
12	1	auth_token	\N	a33c689baa7cc1117f38c66441082b74e94697513ebca7f4af3842153d88953f	["*"]	2024-08-02 21:51:57.024	2024-08-02 21:51:57.024	\N	2024-08-03 21:51:57.024
3	1	auth_token	\N	aa5e53296ed23a1da4051707610c27709449ed8ffd4c6db916459c692416494e	["*"]	2024-07-20 05:55:51.15	2024-07-20 05:55:51.15	2024-07-20 07:30:15.059	2024-07-21 05:55:51.148
13	1	auth_token	\N	e643f5bc8fab56d179af7810bebebc75263940300469bd8f158c81bed4a5091b	["*"]	2024-08-02 21:54:03.144	2024-08-02 21:54:03.144	\N	2024-08-03 21:54:03.143
14	1	auth_token	\N	10152f71a9fc1b4c3366ac0e951744ffe0a3b4bd65ff6bf940302de9789ef97d	["*"]	2024-08-02 21:57:23.241	2024-08-02 21:57:23.241	\N	2024-08-03 21:57:23.239
15	1	auth_token	\N	d93d481b8118bf49b38b912cb37f1cdda8b8c61ec8c3f328b74a07782a3ae45f	["*"]	2024-08-02 21:58:29.265	2024-08-02 21:58:29.265	\N	2024-08-03 21:58:29.264
16	1	auth_token	\N	365eb7b63d3b8f9554101fc477e88dc449768c07e013a05b223f384a8d420195	["*"]	2024-08-02 21:58:33.228	2024-08-02 21:58:33.228	\N	2024-08-03 21:58:33.227
17	1	auth_token	\N	75b352202a0f89e90379f25d779587e13676b491f8fab902eb67f1e81f11cb26	["*"]	2024-08-02 21:59:03.12	2024-08-02 21:59:03.12	\N	2024-08-03 21:59:03.119
18	1	auth_token	\N	d840753a7ff7719ecacade2969d66a74048833ad7b70ed3d73a56f2391ddae4e	["*"]	2024-08-02 21:59:45.853	2024-08-02 21:59:45.853	\N	2024-08-03 21:59:45.851
5	1	auth_token	\N	36628db800b6981d304c06c0826d11fb53a26b04add84f7ed012705b66360873	["*"]	2024-07-27 02:09:26.152	2024-07-27 02:09:26.152	2024-07-27 04:50:23.888	2024-07-28 02:09:26.152
19	1	auth_token	\N	7cad29b5f9ff4401c4dc32d2a8c4ad121cd5ab7fa6f82332744ba442e1fc5f79	["*"]	2024-08-02 21:59:59.55	2024-08-02 21:59:59.55	\N	2024-08-03 21:59:59.549
4	1	auth_token	\N	b201b1f532a166871536caad5cba082b2b754f9a51fd0feca49c9d96458643b7	["*"]	2024-07-20 07:31:26.053	2024-07-20 07:31:26.053	2024-07-20 07:31:34.683	2024-07-21 07:31:26.05
20	1	auth_token	\N	e50da0f13a6a23edec719d53edf65d1119f1194f82ba357e29eb3cb16a27cf87	["*"]	2024-08-02 22:00:17.276	2024-08-02 22:00:17.276	\N	2024-08-03 22:00:17.275
21	1	auth_token	\N	684f9b611a988ee6615c2d5fb995ecbacc00307ff67cd8841d630a1035280d32	["*"]	2024-08-02 22:04:18.745	2024-08-02 22:04:18.745	\N	2024-08-03 22:04:18.744
22	1	auth_token	\N	06acf31e98bbe8997461212da69946e55342031fac6c90480cfd5aaf6dd89dbb	["*"]	2024-08-02 22:06:00.033	2024-08-02 22:06:00.033	\N	2024-08-03 22:06:00.032
40	1	auth_token	\N	810f8f2ee7017a740b3081ad201b29ca41d7bc3a3e603f8d6bc97a0ca4745c6f	["*"]	2024-08-02 22:50:53.365	2024-08-02 22:50:53.365	\N	2024-08-03 22:50:53.364
23	1	auth_token	\N	1eb23460ae00f2def775bfaa20f0cfc24b372692507387c5d4602b40522c378c	["*"]	2024-08-02 22:06:46.492	2024-08-02 22:06:46.492	\N	2024-08-03 22:06:46.491
42	1	auth_token	\N	c3f723d61430cadf6278d440c3bd8eb0367a73f884e64fc0fd029b19890964c7	["*"]	2024-08-02 22:52:55.969	2024-08-02 22:52:55.969	2024-08-02 22:53:28.84	2024-08-03 22:52:55.966
41	1	auth_token	\N	b60ef67f7fc5da1ce2180639fbae041d788219d98fde7917599197bd5e60aa4d	["*"]	2024-08-02 22:51:58.061	2024-08-02 22:51:58.061	\N	2024-08-03 22:51:58.061
45	1	auth_token	\N	ff74987842d536543b174ce34dd0f85053bc723b965d583e8d0b5649820e676e	["*"]	2024-08-03 11:34:37.477	2024-08-03 11:34:37.477	2024-08-03 11:35:04.202	2024-08-04 11:34:37.477
47	1	auth_token	\N	ce3f4be412f82e5d8f0ae73884acacaeac9742787c441ba3fb8c957ca4a83924	["*"]	2024-08-10 02:59:10.379	2024-08-10 02:59:10.379	\N	2024-08-11 02:59:10.377
48	1	auth_token	\N	ae35bca469bf32a1a619252f4d0589b575bd592be067f93c07a5d6af3610469d	["*"]	2024-08-10 03:00:53.782	2024-08-10 03:00:53.782	2024-08-10 15:56:47.178	2024-08-11 03:00:53.782
49	1	auth_token	\N	352cb1c10fcb617974786e4fcd9397ac97a712cca756df005dfa6beea3541f56	["*"]	2024-08-10 16:14:40.582	2024-08-10 16:14:40.582	2024-08-10 16:16:34.501	2024-08-11 16:14:40.517
52	1	auth_token	\N	0c0fefa9a360b5417bd70818615c7e8a249157982a8f522aa99b0939b9f51f13	["*"]	2024-08-17 06:50:07.501	2024-08-17 06:50:07.501	2024-08-17 06:56:47.406	2024-08-18 06:50:07.5
53	1	auth_token	\N	651bfb52d3462c8312832cb3c733a43bd8dbdd42bd4b6fcb424a45566345964e	["*"]	2024-09-06 21:11:51.61	2024-09-06 21:11:51.61	2024-09-06 22:05:21.953	2024-09-07 21:11:51.606
54	1	auth_token	\N	ac575fdfebaf911909d2b65629db0afbda0c478b023198732ba9055dba3d426a	["*"]	2024-09-06 22:16:04.321	2024-09-06 22:16:04.321	2024-09-06 22:16:39.9	2024-09-07 22:16:04.315
60	1	auth_token	\N	2a6d217daf7ea753097d5512e3c0770a790aa529ab32e29ed089d7118c619078	["*"]	2024-09-14 22:02:25.169	2024-09-14 22:02:25.169	2024-09-14 22:09:00.057	2024-09-15 22:02:25.166
51	2	auth_token	\N	62909818012a5264f31e6c0d8355b870a7b42fc2589efd93c835c314d52c7de5	["*"]	2024-08-17 06:49:35.425	2024-08-17 06:49:35.425	2024-08-17 06:49:54.754	2024-08-18 06:49:35.425
55	1	auth_token	\N	a657ba2010c68bdf58ab96fd17e4afb8cf051455402885060784824ff9245cd9	["*"]	2024-09-08 22:04:07.84	2024-09-08 22:04:07.84	2024-09-08 22:28:27.284	2024-09-09 22:04:07.836
56	1	auth_token	\N	aee34ee44bf9d170eb009bca17441f3dcefecb19c8f04f9641af074732a3149c	["*"]	2024-09-08 22:28:38.287	2024-09-08 22:28:38.287	2024-09-09 23:29:16.856	2024-09-09 22:28:38.286
57	1	auth_token	\N	f1f333ad581be57c6c00cf24d8863977a535ddef114289dee2b486faf9ea68bc	["*"]	2024-09-14 06:05:31.604	2024-09-14 06:05:31.604	2024-09-14 09:21:14.158	2024-09-15 06:05:31.603
50	1	auth_token	\N	03a5ba0e7c1c8802b92f7f2e7590469bdd7f92a238d553dbc70cae52d644df93	["*"]	2024-08-16 23:15:10.55	2024-08-16 23:15:10.55	2024-08-17 06:49:21.214	2024-08-17 23:15:10.546
59	1	auth_token	\N	2827dda07e276f8e3a208698e5dba15d366e4ac5dd36d71bce7680aaabf7551f	["*"]	2024-09-14 09:34:34.436	2024-09-14 09:34:34.436	2024-09-14 22:01:28.024	2024-09-15 09:34:34.436
58	1	auth_token	\N	c2ce10e759c0f69c7e267c8145a41afd3344632e67e77bfff7a54bf78d684857	["*"]	2024-09-14 09:21:53.516	2024-09-14 09:21:53.516	2024-09-14 09:33:52.451	2024-09-15 09:21:53.515
62	1	auth_token	\N	c447872040bd2ad23a0eb48111be84bf7abd14c51dfdd376e7a6c22836c13945	["*"]	2024-09-28 17:05:48.227	2024-09-28 17:05:48.227	2024-09-28 22:42:57.193	2024-09-29 17:05:48.225
61	1	auth_token	\N	9f96266043b1e20cdcee046bcc71066d9441822bc4e6d81c3a536ac14606e11d	["*"]	2024-09-27 05:27:59.512	2024-09-27 05:27:59.512	2024-09-28 17:05:18.491	2024-09-28 05:27:59.511
63	1	auth_token	\N	6e1817b9142275fa7e082d9129b4597fdb9587a73e602597e83be302f6b0f7ae	["*"]	2024-09-28 22:43:14.192	2024-09-28 22:43:14.192	2024-09-28 23:25:55.6	2024-09-29 22:43:14.19
66	1	auth_token	\N	d0131a879ce190cef389f96e47d108f3d18999c059d071acf5c43f744c55f1ac	["*"]	2024-10-01 20:34:35.8	2024-10-01 20:34:35.8	2024-10-03 01:40:08.828	2024-10-02 20:34:35.8
64	1	auth_token	\N	c296663417b7295b0bb60aeb423812a05dfc63cd27e57217ca9fcdc367194f4c	["*"]	2024-10-01 14:34:34.129	2024-10-01 14:34:34.129	2024-10-01 20:33:33.082	2024-10-02 14:34:34.127
65	1	auth_token	\N	5182320f4887c539e6566093b23dd8f037e436dea9912e6c4e63cfcffb05d074	["*"]	2024-10-01 20:33:41.961	2024-10-01 20:33:41.961	\N	2024-10-02 20:33:41.96
68	1	auth_token	\N	e08b6c05768c839d283bacfe78d9a1a2bda3ddb462a79f424e0e8802904e09bc	["*"]	2024-10-03 01:40:18.764	2024-10-03 01:40:18.764	2024-10-03 02:23:09.375	2024-10-04 01:40:18.761
74	1	auth_token	\N	cf9cf7956e74e7136c13ae366bef29f37d71241b7795b04addf5acac084a1ff4	["*"]	2024-10-05 14:20:39.07	2024-10-05 14:20:39.07	2024-10-05 14:26:56.046	2024-10-06 14:20:39.069
70	1	auth_token	\N	d2d1fde73555a9d918ccdb2bdac9080c1a32d8a55bf1e94feb4f4c0553c0e77e	["*"]	2024-10-03 21:15:22.439	2024-10-03 21:15:22.439	2024-10-04 14:11:05.053	2024-10-04 21:15:22.438
77	1	auth_token	\N	618e82ba7f76eee9b4c9484a77c873effc83d21e23da12f3fce0969a5d9bf242	["*"]	2024-10-06 00:44:56.987	2024-10-06 00:44:56.987	2024-10-06 02:27:00.183	2024-10-07 00:44:56.986
69	1	auth_token	\N	46732d00573e6ae6a8ad89098307e1baa3d9352a333bf3dce27531038b8d35e0	["*"]	2024-10-03 02:23:19.534	2024-10-03 02:23:19.534	2024-10-03 15:30:33.617	2024-10-04 02:23:19.533
71	1	auth_token	\N	d933a2e94bbb0f3dd4a166a63dd9f9b18437701f5c587ab5e8e0ad9c537f9677	["*"]	2024-10-04 14:11:10.921	2024-10-04 14:11:10.921	2024-10-04 14:36:49.855	2024-10-05 14:11:10.92
67	1	auth_token	\N	1f32eec6f05201ea8bd30ab293108a5a880edeaf47b45a12311ad688683a388c	["*"]	2024-10-02 20:14:32.048	2024-10-02 20:14:32.048	2024-10-05 14:20:29.292	2024-10-03 20:14:32.045
79	1	auth_token	\N	47fb6e391fbe0de5ce5d5ba20b42b376bd1d25c415616df3d844221c2d457008	["*"]	2024-10-07 20:33:51.244	2024-10-07 20:33:51.244	2024-10-08 14:33:43.043	2024-10-08 20:33:51.243
73	1	auth_token	\N	401ff1f58a9b1864c1909e956fde86e8ad383ffd8bce08cdc908fb92ea87d626	["*"]	2024-10-04 15:59:31.219	2024-10-04 15:59:31.219	2024-10-05 22:09:13.119	2024-10-05 15:59:31.218
72	2	auth_token	\N	c2ef1547136c9a016e7905dcc29320b2ec1464377042ad79c29a257fce573857	["*"]	2024-10-04 14:37:01.587	2024-10-04 14:37:01.587	2024-10-04 15:59:10.194	2024-10-05 14:37:01.586
75	1	auth_token	\N	da82bb9a6056b89d62ee27c1edfb403d8b04b717b9e415b844ce8685d33d6740	["*"]	2024-10-05 14:33:40.632	2024-10-05 14:33:40.632	2024-10-07 18:29:26.793	2024-10-06 14:33:40.631
76	1	auth_token	\N	3aa375a8a98a48f67c70432c06db14b03f9867146dfc2c8bc8fe6edbfeb8143d	["*"]	2024-10-05 22:11:30.985	2024-10-05 22:11:30.985	2024-10-05 22:26:30.419	2024-10-06 22:11:30.984
78	1	auth_token	\N	4342ca14097c38e989521d692cc94db1db9d0a5b4a26bc5a3ffed159755ed799	["*"]	2024-10-07 18:29:39.215	2024-10-07 18:29:39.215	2024-10-07 18:41:33.443	2024-10-08 18:29:39.213
\.


--
-- Data for Name: boletas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boletas (id, fecha, pais, departamento, genero, edad, usuario_id, serie, created_at, updated_at, correo, motivo, viaja, entero, actividad) FROM stdin;
4	2024-08-14 23:00:00-06	Colombia	Antioquia	Masculino	31 - 50	1	3335	2024-08-16 23:41:36.09-06	2024-10-02 15:59:24.908-06	dfd@dfd.cm	{"naturaleza":true,"recreacion":false,"cultura":true,"arqueologia":false,"aventura":false,"investigacion":false,"otro":true}	{"solo":false,"familia":true,"amigos":false,"escuela":false,"universidad":true,"agencia":false,"otro":false}	{"recomendacion":true,"agencia":true,"guia":true,"trifoliares":true,"internet":true,"radiotvprensa":true,"otro":false}	{"caminata":true,"canopy":false,"observacion":false,"historia":true,"bicicleta":false,"acampar":false,"religiosas":false,"otras":false,"otro":true}
6	2024-10-03 00:00:00-06	Barbados	ADMINISTRADOR	Masculino	12 - 20	1	3336	2024-10-02 22:43:30.517-06	2024-10-02 22:43:30.517-06	Rol que tiene todos los permisos.	{"naturaleza":false,"recreacion":false,"cultura":true,"arqueologia":false,"aventura":false,"investigacion":false,"otro":false}	{"solo":false,"familia":false,"amigos":false,"escuela":true,"universidad":false,"agencia":false,"otro":false}	{"recomendacion":false,"agencia":false,"guia":false,"trifoliares":false,"internet":true,"radiotvprensa":false,"otro":false}	{"caminata":false,"canopy":false,"observacion":true,"historia":false,"bicicleta":false,"acampar":false,"religiosas":false,"otras":false}
\.


--
-- Data for Name: combustible; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.combustible (id, fecha, placa, kilometraje_inicial, kilometraje_final, chofer, cupon_desde, cupon_hasta, saldo, estado_cupon, pdf, observacion_cupon, usuario_id, created_at, updated_at) FROM stdin;
4	2024-08-15 23:00:00-06	123ABC	111	200	Christian  Gamez 	222	456	3666.00	NUEVO	JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc5OTk5OTk5OTk5OTcyNyA4NDEuODg5OTk5OTk5OTk5OTg2NF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMTcxOAo+PgpzdHJlYW0KMC41NjcwMDAwMDAwMDAwMDAxIHcKMCBHCnEKMTQxLjczMjI4MzQ2NDU2NjkzMzIgMCAwIDcwLjg2NjE0MTczMjI4MzQ2NjYgMjI2Ljc3MTY1MzU0MzMwNzExMDEgNzQyLjY3NzQwMTU3NDgwMzA3MDYgY20KL0kwIERvClEKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNzAwLjE1NzcxNjUzNTQzMzExIFRkCihFTlRSRUdBIERFIEVYUEVESUVOVEU6ICkgVGoKRVQKQlQKL0YxIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI3NC45NjA2Mjk5MjEyNTk4NTE1IDcwMC4xNTc3MTY1MzU0MzMxMSBUZAooQ0NDIDAxLTAyLTEyLTg4ODg4KSBUagpFVApCVAovRjIgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjguMzQ2NDU2NjkyOTEzMzg4OCA2NDMuNDY0ODAzMTQ5NjA2MjY4NiBUZAooTm9tYnJlIGRlIHF1aeluIGVudHJlZ2E6KSBUagpFVApCVAovRjEgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjU1LjExODExMDIzNjIyMDUwMjQgNjQzLjQ2NDgwMzE0OTYwNjI2ODYgVGQKKENocmlzdGlhbikgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNjE1LjExODM0NjQ1NjY5Mjg0NzggVGQKKEZpcm1hIGRlIHF1aeluIGVudHJlZ2E6KSBUagpFVApCVAovRjEgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjM4LjExMDIzNjIyMDQ3MjQ3MjcgNjE1LjExODM0NjQ1NjY5Mjg0NzggVGQKKF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18pIFRqCkVUCkJUCi9GMiAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyOC4zNDY0NTY2OTI5MTMzODg4IDU3Mi41OTg2NjE0MTczMjI3NzM2IFRkCihOb21icmUgZGUgcXVp6W4gcmVjaWJlOikgVGoKRVQKQlQKL0YxIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI0Ni42MTQxNzMyMjgzNDY0ODc2IDU3Mi41OTg2NjE0MTczMjI3NzM2IFRkCihMb3JuYSkgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNTQ0LjI1MjIwNDcyNDQwOTQ2NjUgVGQKKEZpcm1hIGRlIHF1aeluIHJlY2liZTopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyMzguMTEwMjM2MjIwNDcyNDcyNyA1NDQuMjUyMjA0NzI0NDA5NDY2NSBUZAooX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXykgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNTAxLjczMjUxOTY4NTAzOTMzNTQgVGQKKEZlY2hhIGRlIGVudHJlZ2E6KSBUagpFVApCVAovRjEgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjQ2LjYxNDE3MzIyODM0NjQ4NzYgNTAxLjczMjUxOTY4NTAzOTMzNTQgVGQKKDIwMjQtMDctMjYgMjE6MzcpIFRqCkVUCkJUCi9GMiAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyOC4zNDY0NTY2OTI5MTMzODg4IDQ3My4zODYwNjI5OTIxMjU5MTQ3IFRkCihGZWNoYSBkZSBsaW1pdGUgZGUgZGV2b2x1Y2nzbjopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyNDYuNjE0MTczMjI4MzQ2NDg3NiA0NzMuMzg2MDYyOTkyMTI1OTE0NyBUZAooMjAyNC0wNy0yNSAyMTozNykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllcgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Sb21hbgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1JdGFsaWMKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzCi9TdWJ0eXBlIC9U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zzzzzsvzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyRLfzzzzz7z7z/AM88+4199w4118878628z0288888888888888pzij88888/W6nA8+pUkGdUBGF/yffS8VpMosW8888888888886lt1Pe0888/D6mAmMF28x1G04V2D89Au9v18cy88888888888pUHeHyff088/XMeA+/vYyiVUa/n3D89Cs7w5yN988888888888DUQhnrRW/8APLv/AD/333+14+z/APc98ef/AL/HHErv/PPPPPPPPPPJkRv222DBItPOKH2eOY+MPrIEgu5oWPYARBVn0YiPPPPPPPPPOIOAUxvpoVBHPLbwgMKj4pSm9XE0haemHgsDSChF6vPPPPPPPPXMWVvyIuKCUJMrIWErLgEAErHnAnIgEHgHzDGvBvHPPPPPPPPL4UthRg7XDA8UveuZg6dUK4rPT7kv8qfd7offIKA/PPPPPPPPPK0P5oiqdtgBHfLKufPOqn6AKAZV0BGKfluGD9IwgfPPPPPPPPPKzvL2io5DDOQRR/LPtZ/HBihfKaupT7fWtqZFu1kwIvPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP/8QAKhEBAAICAAMIAwEBAQEAAAAAAQARITEQQWFRcYGRobHB8DDR4fEgUED/2gAIAQMBAT8Q/EoFsdd6d3/o4htg37D2giWf99SdSbihudSdTj1II6ihuCOuHUgjqINs6k6ksZ1J1OKhudT/AOAjbwINZiM3NdP+t0F0zqRNc2IANzqRSYNlnUgREeFhJgLwMcjDdrCrUIFZV6humdSNTNA3GNk7BjBQv8plqANFHWZcAgyl59f/ADumyJbNQcpsRVKlxat8dJxLX3NwIo8NCaZumzEtsQc+fBNcNH5crkctx912HvBWFEUyIxjOn7uNyD2/j6e3HdN0q2b4Y2IUDw0McQpOGpYcbzU8PVIFFTQmmbpsypZuVQTBKiuDoASpX5KduD536e8CW68oAp685Q2WS3lFfO9hKunDBCd/MZUvh5Y47hqHBZtItsnRnRgAURB3OjAtERgwAURbZOjADXANiABREvDDUOCjaRK9BBlVdqTowA1+TMSwW5Y5QbzHR4vUjFeaMrMwRiAeNvTikU7H2jxBTW39w7aQ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NScwMCcpCj4+CmVuZG9iagoyMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDE5MjIgMDAwMDAgbiAKMDAwMDAzNzQ3MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxNTIgMDAwMDAgbiAKMDAwMDAwMTk3OSAwMDAwMCBuIAowMDAwMDAyMTA0IDAwMDAwIG4gCjAwMDAwMDIyMzQgMDAwMDAgbiAKMDAwMDAwMjM2NyAwMDAwMCBuIAowMDAwMDAyNTA0IDAwMDAwIG4gCjAwMDAwMDI2MjcgMDAwMDAgbiAKMDAwMDAwMjc1NiAwMDAwMCBuIAowMDAwMDAyODg4IDAwMDAwIG4gCjAwMDAwMDMwMjQgMDAwMDAgbiAKMDAwMDAwMzE1MiAwMDAwMCBuIAowMDAwMDAzMjc5IDAwMDAwIG4gCjAwMDAwMDM0MDggMDAwMDAgbiAKMDAwMDAwMzU0MSAwMDAwMCBuIAowMDAwMDAzNjQzIDAwMDAwIG4gCjAwMDAwMDM3MzkgMDAwMDAgbiAKMDAwMDAzNzczMSAwMDAwMCBuIAowMDAwMDM3ODE3IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMjIKL1Jvb3QgMjEgMCBSCi9JbmZvIDIwIDAgUgovSUQgWyA8MkEyMUVENDJGMDRDRjU3OUI4REFCMkZFOTJEQUM4M0Y+IDwyQTIxRUQ0MkYwNENGNTc5QjhEQUIyRkU5MkRBQzgzRj4gXQo+PgpzdGFydHhyZWYKMzc5MjEKJSVFT0Y=	rtr	1	2024-08-10 09:43:40.313-06	2024-08-10 09:43:40.313-06
5	2024-08-15 23:00:00-06	123ABC	123	126	Christian  Gamez 	444	446	4545.00	NUEVO	\N	rrtt	1	2024-08-10 09:49:23.16-06	2024-08-10 09:49:23.16-06
7	2024-08-13 23:00:00-06	123ABC	120000	120150	Christian  Gamez z	20	21	50000.00	NUEVO	\N	ggg	1	2024-08-16 17:40:06.676-06	2024-08-16 18:07:31.47-06
6	2024-08-14 23:00:00-06	123ABC	120000	125000	Marcos Mejía	100	102	40000.00	NUEVO	JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc5OTk5OTk5OTk5OTcyNyA4NDEuODg5OTk5OTk5OTk5OTg2NF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggNDA0MQo+PgpzdHJlYW0KMC41NjcwMDAwMDAwMDAwMDAxIHcKMCBHCnEKMTQxLjczMjI4MzQ2NDU2NjkzMzIgMCAwIDcwLjg2NjE0MTczMjI4MzQ2NjYgMjI2Ljc3MTY1MzU0MzMwNzExMDEgNzQyLjY3NzQwMTU3NDgwMzA3MDYgY20KL0kwIERvClEKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNzAwLjE1NzcxNjUzNTQzMzExIFRkCihTQUxJREEgREUgRVhQRURJRU5URTogKSBUagpFVApCVAovRjEgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjc0Ljk2MDYyOTkyMTI1OTg1MTUgNzAwLjE1NzcxNjUzNTQzMzExIFRkCihDQ0MgMDEtMDItMTItMjMyMzIpIFRqCkVUCkJUCi9GMiAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyOC4zNDY0NTY2OTI5MTMzODg4IDY0My40NjQ4MDMxNDk2MDYyNjg2IFRkCihOb21icmUgZGUgcXVp6W4gZW50cmVnYTopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyNTUuMTE4MTEwMjM2MjIwNTAyNCA2NDMuNDY0ODAzMTQ5NjA2MjY4NiBUZAooQ2hyaXN0aWFuKSBUagpFVApCVAovRjIgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjguMzQ2NDU2NjkyOTEzMzg4OCA2MTUuMTE4MzQ2NDU2NjkyODQ3OCBUZAooRmlybWEgZGUgcXVp6W4gZW50cmVnYTopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyMzguMTEwMjM2MjIwNDcyNDcyNyA2MTUuMTE4MzQ2NDU2NjkyODQ3OCBUZAooX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXykgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNTcyLjU5ODY2MTQxNzMyMjc3MzYgVGQKKE5vbWJyZSBkZSBxdWnpbiByZWNpYmU6KSBUagpFVApCVAovRjEgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjQ2LjYxNDE3MzIyODM0NjQ4NzYgNTcyLjU5ODY2MTQxNzMyMjc3MzYgVGQKKERlbW8gdXN1YXJpbykgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNTQ0LjI1MjIwNDcyNDQwOTQ2NjUgVGQKKEZpcm1hIGRlIHF1aeluIHJlY2liZTopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyMzguMTEwMjM2MjIwNDcyNDcyNyA1NDQuMjUyMjA0NzI0NDA5NDY2NSBUZAooX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXykgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNTAxLjczMjUxOTY4NTAzOTMzNTQgVGQKKEZlY2hhIGRlIFNhbGlkYTopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoxODQuMjUxOTY4NTAzOTM3MDM1OCA1MDEuNzMyNTE5Njg1MDM5MzM1NCBUZAooMjAyNC0wNy0yMikgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggNDczLjM4NjA2Mjk5MjEyNTkxNDcgVGQKKEZlY2hhIGRlIGxpbWl0ZSBkZSBkZXZvbHVjafNuOikgVGoKRVQKQlQKL0YxIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMCBnCjI5MS45Njg1MDM5MzcwMDc4ODEyIDQ3My4zODYwNjI5OTIxMjU5MTQ3IFRkCigyMDI0LTA3LTI2KSBUagpFVApCVAovRjIgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMjguMzQ2NDU2NjkyOTEzMzg4OCA0MTYuNjkzMTQ5NjA2Mjk5MTMgVGQKKERFVk9MVUNJ004gREUgRVhQRURJRU5URTogKSBUagpFVApCVAovRjEgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowIGcKMzAzLjMwNzA4NjYxNDE3MzI3MjIgNDE2LjY5MzE0OTYwNjI5OTEzIFRkCihDQ0MgMDEtMDItMTItMjMyMzIpIFRqCkVUCkJUCi9GMiAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAgZwoyOC4zNDY0NTY2OTI5MTMzODg4IDM2MC4wMDAyMzYyMjA0NzI0MDIyIFRkCihOb21icmUgZGUgcXVp6W4gZW50cmVnYTopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAuOTc2IGcKMjU1LjExODExMDIzNjIyMDUwMjQgMzYwLjAwMDIzNjIyMDQ3MjQwMjIgVGQKKDo6Ojo6OiBQZW5kaWVudGUgOjo6Ojo6KSBUagpFVApCVAovRjEgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowLiBnCjI1NS4xMTgxMTAyMzYyMjA1MDI0IDM2MC4wMDAyMzYyMjA0NzI0MDIyIFRkCihfX19fX19fX19fX19fX19fX19fX19fX19fXykgVGoKRVQKQlQKL0YyIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMC4gZwoyOC4zNDY0NTY2OTI5MTMzODg4IDMwMy4zMDczMjI4MzQ2NDU1NjA4IFRkCihGaXJtYSBkZSBxdWnpbiBlbnRyZWdhOikgVGoKRVQKQlQKL0YxIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMC45NzYgZwoyNDkuNDQ4ODE4ODk3NjM3ODA2OSAzMDMuMzA3MzIyODM0NjQ1NTYwOCBUZAooOjo6Ojo6IFBlbmRpZW50ZSA6Ojo6OjopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAuIGcKMjM4LjExMDIzNjIyMDQ3MjQ3MjcgMzAzLjMwNzMyMjgzNDY0NTU2MDggVGQKKF9fX19fX19fX19fX19fX19fX19fX19fX19fKSBUagpFVApCVAovRjIgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowLiBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggMjc0Ljk2MDg2NjE0MTczMjI1MzcgVGQKKE5vbWJyZSBkZSBxdWnpbiBlbnRyZWdhOikgVGoKRVQKQlQKL0YxIDE4IFRmCjIwLjY5OTk5OTk5OTk5OTk5OTMgVEwKMC45NzYgZwoyNTUuMTE4MTEwMjM2MjIwNTAyNCAyNzQuOTYwODY2MTQxNzMyMjUzNyBUZAooOjo6Ojo6IFBlbmRpZW50ZSA6Ojo6OjopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAuIGcKMjU1LjExODExMDIzNjIyMDUwMjQgMjc0Ljk2MDg2NjE0MTczMjI1MzcgVGQKKF9fX19fX19fX19fX19fX19fX19fX19fX19fKSBUagpFVApCVAovRjIgMTggVGYKMjAuNjk5OTk5OTk5OTk5OTk5MyBUTAowLiBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggMjQ2LjYxNDQwOTQ0ODgxODgzMyBUZAooRmlybWEgZGUgcXVp6W4gZW50cmVnYTopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAuOTc2IGcKMjU1LjExODExMDIzNjIyMDUwMjQgMjQ2LjYxNDQwOTQ0ODgxODgzMyBUZAooOjo6Ojo6IFBlbmRpZW50ZSA6Ojo6OjopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAuIGcKMjM4LjExMDIzNjIyMDQ3MjQ3MjcgMjQ2LjYxNDQwOTQ0ODgxODgzMyBUZAooX19fX19fX19fX19fX19fX19fX19fX19fX18pIFRqCkVUCkJUCi9GMiAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAuIGcKMjguMzQ2NDU2NjkyOTEzMzg4OCAxODkuOTIxNDk2MDYyOTkxOTkxNSBUZAooRmVjaGEgZGUgRGV2b2x1Y2nzbjopIFRqCkVUCkJUCi9GMSAxOCBUZgoyMC42OTk5OTk5OTk5OTk5OTkzIFRMCjAuIGcKMjIxLjEwMjM2MjIwNDcyNDQ0MyAxODkuOTIxNDk2MDYyOTkxOTkxNSBUZAooMjAyNC0wNy0yMCkgVGoKRVQKQlQKL0YxIDkgVGYKMTAuMzQ5OTk5OTk5OTk5OTk5NiBUTAowLjggZwoyOC4zNDY0NTY2OTI5MTMzODg4IDEwNC44ODIxMjU5ODQyNTE4NDMgVGQKKEZlY2hhIHkgaG9yYSBkZSBnZW5lcmFjafNuOikgVGoKRVQKQlQKL0YxIDkgVGYKMTAuMzQ5OTk5OTk5OTk5OTk5NiBUTAowLjggZwoxNDQuNTY2OTI5MTMzODU4MjgwOSAxMDQuODgyMTI1OTg0MjUxODQzIFRkCigyMDI0LTA3LTI3IDA0OjUwKSBUagpFVApCVAovRjEgOSBUZgoxMC4zNDk5OTk5OTk5OTk5OTk2IFRMCjAuOCBnCjI4My40NjQ1NjY5MjkxMzM4NjYzIDEwNC44ODIxMjU5ODQyNTE4NDMgVGQKKEdlbmVyYWRvIHBvciBlbCB1c3VhcmlvOikgVGoKRVQKQlQKL0YxIDkgVGYKMTAuMzQ5OTk5OTk5OTk5OTk5NiBUTAowLjggZwozODUuNTExODExMDIzNjIyMTAxNCAxMDQuODgyMTI1OTg0MjUxODQzIFRkCihDaHJpc3RpYW4pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1PYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjggMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXIKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTIgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGRPYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjEzIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4KL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtQm9sZEl0YWxpYwovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1phcGZEaW5nYmF0cwovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1N5bWJvbAovU3VidHlwZSAvVHlwZTEKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxOSAwIG9iago8PAovVHlwZSAvWE9iamVjdAovU3VidHlwZSAvSW1hZ2UKL1dpZHRoIDgwMAovSGVpZ2h0IDIwMAovQ29sb3JTcGFjZSAvRGV2aWNlUkdCCi9CaXRzUGVyQ29tcG9uZW50IDgKL0xlbmd0aCAzMzU2MwovRmlsdGVyIC9EQ1REZWNvZGUKPj4Kc3RyZWFtCv/Y/+AAEEpGSUYAAQEAAAEAAQAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgS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TREAAsB1SSKn2TpZkTJuVDSY0q/z+7QpIorG5GxTDDBQePza2s0QnpUodbjXrL8UmNJeDiDQ6B5jSbmeRL1AJCCLFeFD5OEJGUTYl1mE51IJEzKPFPBRHMHImbfXrfRRhq4jkRZb5WW2u6FkyMFx2o/ZDCQ1Ji1AhXWAQOwH0RgZfGQ2LMBeZdaCzlRMlOQhI8prTHg72TCkwML186/VfOv1Xzr9UZj+VtChMf8Arv/ZCmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDUgMCBSCi9GMiA2IDAgUgovRjMgNyAwIFIKL0Y0IDggMCBSCi9GNSA5IDAgUgovRjYgMTAgMCBSCi9GNyAxMSAwIFIKL0Y4IDEyIDAgUgovRjkgMTMgMCBSCi9GMTAgMTQgMCBSCi9GMTEgMTUgMCBSCi9GMTIgMTYgMCBSCi9GMTMgMTcgMCBSCi9GMTQgMTggMCBSCj4+Ci9YT2JqZWN0IDw8Ci9JMCAxOSAwIFIKPj4KPj4KZW5kb2JqCjIwIDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMi41LjEpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNDA3MjYyMzUwMjYtMDUnMDAnKQo+PgplbmRvYmoKMjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCi9PcGVuQWN0aW9uIFszIDAgUiAvRml0SCBudWxsXQovUGFnZUxheW91dCAvT25lQ29sdW1uCj4+CmVuZG9iagp4cmVmCjAgMjIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDA0MjQ1IDAwMDAwIG4gCjAwMDAwMzk3OTUgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTUyIDAwMDAwIG4gCjAwMDAwMDQzMDIgMDAwMDAgbiAKMDAwMDAwNDQyNyAwMDAwMCBuIAowMDAwMDA0NTU3IDAwMDAwIG4gCjAwMDAwMDQ2OTAgMDAwMDAgbiAKMDAwMDAwNDgyNyAwMDAwMCBuIAowMDAwMDA0OTUwIDAwMDAwIG4gCjAwMDAwMDUwNzkgMDAwMDAgbiAKMDAwMDAwNTIxMSAwMDAwMCBuIAowMDAwMDA1MzQ3IDAwMDAwIG4gCjAwMDAwMDU0NzUgMDAwMDAgbiAKMDAwMDAwNTYwMiAwMDAwMCBuIAowMDAwMDA1NzMxIDAwMDAwIG4gCjAwMDAwMDU4NjQgMDAwMDAgbiAKMDAwMDAwNTk2NiAwMDAwMCBuIAowMDAwMDA2MDYyIDAwMDAwIG4gCjAwMDAwNDAwNTQgMDAwMDAgbiAKMDAwMDA0MDE0MCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIyCi9Sb290IDIxIDAgUgovSW5mbyAyMCAwIFIKL0lEIFsgPEY3NTIzQzE1NDU0ODFDOTQxODVFQ0JBNDI5NkUzODk2PiA8Rjc1MjNDMTU0NTQ4MUM5NDE4NUVDQkE0Mjk2RTM4OTY+IF0KPj4Kc3RhcnR4cmVmCjQwMjQ0CiUlRU9G	Un test	1	2024-08-10 10:15:58.2-06	2024-08-16 18:08:24.791-06
8	2024-08-14 23:00:00-06	123ABC	123	125	Christian  Gamez 	123	124	50000.00	NUEVO	\N	ghhg	1	2024-08-16 18:10:26.939-06	2024-08-16 18:10:41.161-06
9	2024-08-14 23:00:00-06	123ABC	200000	200200	Christian  Gamez 	12	14	50000.00	NUEVO	\N	yc	1	2024-08-17 00:54:33.457-06	2024-08-17 00:54:56.103-06
\.


--
-- Data for Name: departamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamentos (id, nombre, estado, created_at, updated_at) FROM stdin;
12	Petén	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
9	Izabal	INACTIVO	2024-10-02 10:00:09	2024-10-04 16:55:00.991
14	prueba	ACTIVO	2024-10-04 16:14:05.588	2024-10-04 17:01:45.995
13	Quetzaltenango	INACTIVO	2024-10-03 05:44:08.218	2024-10-04 16:54:58.542
17	pruebis	ACTIVO	2024-10-04 17:01:01.536	2024-10-05 22:14:35.922
19	Alta Verapacitaaa	ACTIVO	2024-10-07 22:04:49.247	2024-10-07 22:14:54.727
18	Escuintlita	INACTIVO	2024-10-05 22:15:16.294	2024-10-07 22:14:56.214
\.


--
-- Data for Name: estado_expedientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado_expedientes (id, nombre, created_at, updated_at) FROM stdin;
1	EN REVISIÓN	2006-08-10 10:44:03	2009-10-21 20:26:41
3	BORRADOR	1993-01-22 16:09:24	1989-01-27 04:17:35
2	COMPLETO	2003-12-19 14:45:54	1979-10-19 11:19:09
\.


--
-- Data for Name: expedientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expedientes (id, poligono, predio, estanteria, titular, nivel, hojas, leitz, archivo, comentarios, municipio_id, departamento_id, expediente_estado_id, usuario_id, created_at, updated_at) FROM stdin;
4	45	12021	M-10	Nidia Anabella Aldana Pineda	1	500	20	\N	Expediente completo	9	12	2	1	2024-10-04 14:12:46.54	2024-10-04 14:12:46.54
5	12	1000	M2	Lornna Yeraldy Juarez Aldana	1	100	20	\N	Expediente incompleto	9	12	3	1	2024-10-04 14:14:27.04	2024-10-04 14:14:27.041
6	45	12345	M-10	Aylin Lorenzana	2	200	10	\N	Expediente en modificación	1	12	1	1	2024-10-04 14:15:56.237	2024-10-04 14:15:56.237
8	96	1111	M1	Panfila Soto	1	1000	52	\N	Expediente completo	2	12	2	1	2024-10-05 00:30:11.015	2024-10-05 00:30:11.015
9	90	1001	M-4	Margarita Contreras	2	2000	60	\N	Expediente completo	12	12	2	1	2024-10-05 22:12:40.315	2024-10-05 22:25:41.579
\.


--
-- Data for Name: movimiento_expediente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movimiento_expediente (id, usuario_id, usuario_destino_id, expediente_id, fecha_salida, fecha_entrega, created_at, updated_at) FROM stdin;
13	1	25	6	2024-10-04 17:28:00	2024-10-04 17:28:00	2024-10-04 23:28:39	2024-10-04 23:28:44.678
14	1	22	5	2024-10-04 17:32:00	2024-10-04 17:32:00	2024-10-04 23:32:32	2024-10-04 23:32:39.171
16	1	23	5	2024-10-04 17:35:00	2024-10-04 17:35:00	2024-10-04 23:35:52	2024-10-04 23:36:40.692
15	1	22	4	2024-10-04 17:33:00	2024-10-04 17:33:00	2024-10-04 23:33:50	2024-10-05 00:01:24.768
17	1	21	4	2024-10-04 18:05:00	2024-10-04 18:06:00	2024-10-05 00:04:35	2024-10-05 00:04:43.111
18	1	22	4	2024-10-04 18:08:00	2024-10-04 18:08:00	2024-10-05 00:08:49	2024-10-05 00:09:01.379
19	1	21	6	2024-10-04 18:10:00	2024-10-04 18:10:00	2024-10-05 00:10:04	2024-10-05 00:10:07.96
20	1	24	8	2024-10-04 18:30:00	2024-10-04 18:30:00	2024-10-05 00:30:40	2024-10-05 00:31:30.207
21	1	22	8	2024-10-04 18:34:00	2024-10-04 18:35:00	2024-10-05 00:34:31	2024-10-05 00:37:38.941
22	1	22	8	2024-10-04 18:38:00	2024-10-04 18:39:00	2024-10-05 00:39:07	2024-10-05 00:40:34.881
23	1	23	8	2024-10-04 18:42:00	2024-10-04 18:43:00	2024-10-05 00:43:18	2024-10-05 00:45:07.113
24	1	24	8	2024-10-04 18:45:00	2024-10-04 18:46:00	2024-10-05 00:45:34	2024-10-05 00:49:11.146
25	1	24	6	2024-10-04 18:54:00	2024-10-04 18:55:00	2024-10-05 00:54:46	2024-10-05 00:56:21.132
26	1	22	5	2024-10-04 19:00:00	2024-10-04 19:01:00	2024-10-05 01:00:34	2024-10-05 01:02:46.543
27	1	21	9	2024-10-05 16:13:00	2024-10-05 16:14:00	2024-10-05 22:13:46	2024-10-05 22:16:45.238
\.


--
-- Data for Name: municipios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.municipios (id, nombre, departamento_id, estado, created_at, updated_at) FROM stdin;
1	Dolores	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
2	El Chal	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
3	Flores	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
4	La Libertad	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
5	Las Cruces	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
6	Melchor de Mencos	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
7	Poptún	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
8	San Andrés	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
14	Sayaxché	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
9	San Benito	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
10	San Francisco	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
11	San José	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
12	Santa Luis	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
13	Santa Ana	12	ACTIVO	2024-10-02 10:00:09	2024-10-02 10:00:09
15	San Beni	12	\N	2024-10-03 05:17:47.364	2024-10-03 05:17:47.365
16	Mixco	12	ACTIVO	2024-10-03 14:10:35.088	2024-10-03 14:10:35.088
17	Col	9	ACTIVO	2024-10-03 21:15:45.281	2024-10-03 21:15:45.282
18	cOP	9	ACTIVO	2024-10-03 21:43:18.065	2024-10-03 21:43:18.065
19	queeb	13	ACTIVO	2024-10-03 22:14:15.982	2024-10-03 22:14:15.982
20	qqw	13	ACTIVO	2024-10-03 22:16:26.72	2024-10-03 22:16:26.72
21	qqeeee	13	ACTIVO	2024-10-03 22:31:39.86	2024-10-03 22:31:39.861
22	queueueueueueueu	13	ACTIVO	2024-10-03 22:31:59.651	2024-10-03 22:31:59.651
\.


--
-- Data for Name: notificaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones (id, mensaje, visto, created_at, updated_at, usuario_id) FROM stdin;
2	El expediente 454454 excedió el tiempo de entrega	t	\N	2024-09-14 22:06:25.723	1
4	El expediente con ID:6 excedió el tiempo de entrega	t	2024-09-14 22:01:27.655	2024-09-14 22:06:34.455	1
3	El expediente con ID:6 excedió el tiempo de entrega	t	2024-09-14 22:00:47.984	2024-09-14 22:07:59.983	1
5	El expediente con ID:8 excedió el tiempo de entrega	t	2024-09-27 05:51:24.254	2024-09-27 05:51:39.879	1
6	El expediente con ID:9 excedió el tiempo de entrega	t	2024-09-27 14:10:32.423	2024-09-27 14:10:38.262	1
7	El expediente con ID:11´ fue devuelto a archivo.	t	2024-09-28 23:12:44.417	2024-09-28 23:24:31.527	1
8	El expediente con ID:12´ fue devuelto a archivo.	t	2024-09-28 23:24:44.488	2024-09-28 23:25:03.292	1
9	El expediente con ID:13´ fue devuelto a archivo.	t	2024-10-04 23:28:44.798	2024-10-04 23:34:01.4	1
10	El expediente con ID:undefined´ fue devuelto a archivo.	t	2024-10-04 23:32:39.282	2024-10-04 23:34:02.664	1
11	El expediente con ID:5´ fue devuelto a archivo.	f	2024-10-04 23:36:40.812	2024-10-04 23:36:40.812	1
12	El expediente con CCC: 4 fue devuelto a archivo. Departamento ID: undefined, - undefined, - 45, - 12021	f	2024-10-05 00:01:24.905	2024-10-05 00:01:24.905	1
13	El expediente con CCC: 4 . Departamento ID: 12, - 9, - 45, - 12021	f	2024-10-05 00:09:01.506	2024-10-05 00:09:01.506	1
14	El expediente con CCC:  12-1-45-12345	f	2024-10-05 00:10:08.083	2024-10-05 00:10:08.083	1
15	El expediente con el CCC: undefined-undefined-96-1111 fue devuelto al Depto de Archivo.	f	2024-10-05 00:31:30.349	2024-10-05 00:31:30.349	1
16	El expediente con el CCC:  12-2-96-1111 fue devuelto al Depto de Archivo.	t	2024-10-05 00:37:39.219	2024-10-05 00:38:41.499	1
17	El expediente con el CCC:  12-2-96-1111 fue devuelto al Depto de Archivo.	t	2024-10-05 00:40:35.007	2024-10-05 00:42:46.879	1
18	El expediente con el CCC:  12-2-96-1111 fue devuelto al Depto de Archivo.	f	2024-10-05 00:45:07.245	2024-10-05 00:45:07.245	1
19	El expediente con el CCC:  12-2-96-1111 fue devuelto al Depto de Archivo.	f	2024-10-05 00:49:11.281	2024-10-05 00:49:11.281	1
20	El expediente con el CCC: undefined-undefined-45-12345 fue devuelto al Depto de Archivo.	f	2024-10-05 00:56:21.158	2024-10-05 00:56:21.158	1
21	El expediente con el CCC: undefined-undefined-12-1000 fue devuelto al Depto de Archivo.	f	2024-10-05 01:02:46.567	2024-10-05 01:02:46.567	1
22	El expediente con el CCC: 12-10-90-1001 fue devuelto al Depto de Archivo.	t	2024-10-05 22:16:45.384	2024-10-05 22:18:12.736	1
\.





--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nombre, descripcion, estado, created_at, updated_at) FROM stdin;
1	ADMINISTRADOR	Rol que tiene todos los permisos.	ACTIVO	2024-10-01 00:02:00-06	2024-10-02 19:47:35.99-06
13	ASISTENTE-ADMINISTRATIVA	Rol para el Depto. de Administración	ACTIVO	2024-10-04 10:51:20.878-06	2024-10-05 16:14:26.27-06
14	TECNICO-ARCHIVOo	Rol para el Depto. de Archivo	ACTIVO	2024-10-04 10:53:20.709-06	2024-10-07 15:31:39.075-06
15	ARCHIVito	Rol Arhic	INACTIVO	2024-10-07 15:38:46.829-06	2024-10-07 16:04:19.328-06
16	Pilotiyo	Rol pilo	ACTIVO	2024-10-07 15:44:52.231-06	2024-10-07 16:13:03.694-06
\.







--
-- Data for Name: vehiculos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehiculos (id, propietario, placa, modelo, chofer, foto, created_at, updated_at, comentarios, usuario_id) FROM stdin;
5	RIC-PETÉN	P492GZC	2023	Pancracio López	\N	2024-08-10 04:49:56.734	2024-10-05 14:25:53.117	Vehículo 0KMS	1
\.


--
-- Name: adonis_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adonis_schema_id_seq', 9, true);


--
-- Name: auth_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_access_tokens_id_seq', 79, true);


--
-- Name: boletas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boletas_id_seq', 6, true);


--
-- Name: combustible_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.combustible_id_seq', 9, true);


--
-- Name: departamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamentos_id_seq', 19, true);


--
-- Name: estado_expedientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_expedientes_id_seq', 3, true);


--
-- Name: expedientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expedientes_id_seq', 9, true);


--
-- Name: movimiento_expediente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movimiento_expediente_id_seq', 27, true);


--
-- Name: municipios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.municipios_id_seq', 22, true);


--
-- Name: notificaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_id_seq', 22, true);


--
-- Name: persona_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.persona_id_seq', 5, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 16, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 26, true);


--
-- Name: vehiculos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehiculos_id_seq', 6, true);


--
-- Name: adonis_schema adonis_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adonis_schema
    ADD CONSTRAINT adonis_schema_pkey PRIMARY KEY (id);


--
-- Name: adonis_schema_versions adonis_schema_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adonis_schema_versions
    ADD CONSTRAINT adonis_schema_versions_pkey PRIMARY KEY (version);


--
-- Name: auth_access_tokens auth_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_access_tokens
    ADD CONSTRAINT auth_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: boletas boletas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletas
    ADD CONSTRAINT boletas_pkey PRIMARY KEY (id);


--
-- Name: boletas boletas_serie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletas
    ADD CONSTRAINT boletas_serie_key UNIQUE (serie);


--
-- Name: combustible combustible_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.combustible
    ADD CONSTRAINT combustible_pkey PRIMARY KEY (id);


--
-- Name: departamentos departamentos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_nombre_key UNIQUE (nombre);


--
-- Name: departamentos departamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_pkey PRIMARY KEY (id);


--
-- Name: estado_expedientes estado_expedientes_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_expedientes
    ADD CONSTRAINT estado_expedientes_nombre_key UNIQUE (nombre);


--
-- Name: estado_expedientes estado_expedientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_expedientes
    ADD CONSTRAINT estado_expedientes_pkey PRIMARY KEY (id);


--
-- Name: expedientes expedientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expedientes
    ADD CONSTRAINT expedientes_pkey PRIMARY KEY (id);


--
-- Name: expedientes expedientes_predio_departamento_id_municipio_id_poligono_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expedientes
    ADD CONSTRAINT expedientes_predio_departamento_id_municipio_id_poligono_key UNIQUE (predio, departamento_id, municipio_id, poligono);


--
-- Name: movimiento_expediente movimiento_expediente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_expediente
    ADD CONSTRAINT movimiento_expediente_pkey PRIMARY KEY (id);


--
-- Name: municipios municipios_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_nombre_key UNIQUE (nombre);


--
-- Name: municipios municipios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_pkey PRIMARY KEY (id);


--
-- Name: notificaciones notificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id);


--
-- Name: persona persona_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_pkey PRIMARY KEY (id);


--
-- Name: roles roles_nombre_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_unique UNIQUE (nombre);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vehiculos vehiculos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_pkey PRIMARY KEY (id);


--
-- Name: vehiculos vehiculos_placa_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_placa_key UNIQUE (placa);


--
-- Name: dpi_1725658133192_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX dpi_1725658133192_index ON public.persona USING btree (dpi);


--
-- Name: expedientes expedientes_departamento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expedientes
    ADD CONSTRAINT expedientes_departamento_id_fkey FOREIGN KEY (departamento_id) REFERENCES public.departamentos(id) ON DELETE CASCADE;


--
-- Name: expedientes expedientes_expediente_estado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expedientes
    ADD CONSTRAINT expedientes_expediente_estado_id_fkey FOREIGN KEY (expediente_estado_id) REFERENCES public.estado_expedientes(id) ON DELETE CASCADE;




ALTER TABLE ONLY public.users
    ADD CONSTRAINT personas_persona_id_fkey FOREIGN KEY (persona_id) REFERENCES public.persona(id) ON DELETE CASCADE;


--
-- Name: expedientes expedientes_municipio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expedientes
    ADD CONSTRAINT expedientes_municipio_id_fkey FOREIGN KEY (municipio_id) REFERENCES public.municipios(id) ON DELETE CASCADE;


--
-- Name: expedientes expedientes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expedientes
    ADD CONSTRAINT expedientes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: movimiento_expediente movimiento_expediente_usuario_destino_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_expediente
    ADD CONSTRAINT movimiento_expediente_usuario_destino_id_fkey FOREIGN KEY (usuario_destino_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: movimiento_expediente movimiento_expediente_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_expediente
    ADD CONSTRAINT movimiento_expediente_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: municipios municipios_departamento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_departamento_id_fkey FOREIGN KEY (departamento_id) REFERENCES public.departamentos(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

