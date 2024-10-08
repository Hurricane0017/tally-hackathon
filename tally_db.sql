PGDMP      1                |            postgres    14.13 (Homebrew)    16.3     L           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            M           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            N           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            O           1262    14088    postgres    DATABASE     j   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE postgres;
                raghavagarwal    false            P           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   raghavagarwal    false    3663                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                raghavagarwal    false            Q           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   raghavagarwal    false    4            �            1259    16404    contest    TABLE     �   CREATE TABLE public.contest (
    contest_id bigint NOT NULL,
    contest_name character varying,
    contest_start_time bigint,
    contest_duration bigint,
    contest_problem bigint[]
);
    DROP TABLE public.contest;
       public         heap    raghavagarwal    false    4            �            1259    16403    contest_contest_id_seq    SEQUENCE        CREATE SEQUENCE public.contest_contest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.contest_contest_id_seq;
       public          raghavagarwal    false    4    213            R           0    0    contest_contest_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.contest_contest_id_seq OWNED BY public.contest.contest_id;
          public          raghavagarwal    false    212            �            1259    16393    hidden_testcase    TABLE     z   CREATE TABLE public.hidden_testcase (
    input character varying,
    output character varying,
    problem_id bigint
);
 #   DROP TABLE public.hidden_testcase;
       public         heap    raghavagarwal    false    4            �            1259    16385    problems    TABLE     �  CREATE TABLE public.problems (
    problem_id bigint NOT NULL,
    title character varying,
    description character varying,
    rating character varying,
    input character varying,
    output character varying,
    memorylimit character varying,
    timelimit character varying,
    inputformat character varying,
    outputformat character varying,
    constrains character varying
);
    DROP TABLE public.problems;
       public         heap    raghavagarwal    false    4            �            1259    16384    problems_problem_id_seq    SEQUENCE     �   CREATE SEQUENCE public.problems_problem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.problems_problem_id_seq;
       public          raghavagarwal    false    210    4            S           0    0    problems_problem_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.problems_problem_id_seq OWNED BY public.problems.problem_id;
          public          raghavagarwal    false    209            �           2604    16407    contest contest_id    DEFAULT     x   ALTER TABLE ONLY public.contest ALTER COLUMN contest_id SET DEFAULT nextval('public.contest_contest_id_seq'::regclass);
 A   ALTER TABLE public.contest ALTER COLUMN contest_id DROP DEFAULT;
       public          raghavagarwal    false    212    213    213            �           2604    16388    problems problem_id    DEFAULT     z   ALTER TABLE ONLY public.problems ALTER COLUMN problem_id SET DEFAULT nextval('public.problems_problem_id_seq'::regclass);
 B   ALTER TABLE public.problems ALTER COLUMN problem_id DROP DEFAULT;
       public          raghavagarwal    false    209    210    210            I          0    16404    contest 
   TABLE DATA           r   COPY public.contest (contest_id, contest_name, contest_start_time, contest_duration, contest_problem) FROM stdin;
    public          raghavagarwal    false    213          G          0    16393    hidden_testcase 
   TABLE DATA           D   COPY public.hidden_testcase (input, output, problem_id) FROM stdin;
    public          raghavagarwal    false    211   `       F          0    16385    problems 
   TABLE DATA           �   COPY public.problems (problem_id, title, description, rating, input, output, memorylimit, timelimit, inputformat, outputformat, constrains) FROM stdin;
    public          raghavagarwal    false    210   }       T           0    0    contest_contest_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.contest_contest_id_seq', 2, true);
          public          raghavagarwal    false    212            U           0    0    problems_problem_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.problems_problem_id_seq', 24, true);
          public          raghavagarwal    false    209            �           2606    16411    contest contest_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.contest
    ADD CONSTRAINT contest_pkey PRIMARY KEY (contest_id);
 >   ALTER TABLE ONLY public.contest DROP CONSTRAINT contest_pkey;
       public            raghavagarwal    false    213            �           2606    16392    problems problems_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.problems
    ADD CONSTRAINT problems_pkey PRIMARY KEY (problem_id);
 @   ALTER TABLE ONLY public.problems DROP CONSTRAINT problems_pkey;
       public            raghavagarwal    false    210            �           2606    16398 /   hidden_testcase hidden_testcase_problem_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hidden_testcase
    ADD CONSTRAINT hidden_testcase_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problems(problem_id) NOT VALID;
 Y   ALTER TABLE ONLY public.hidden_testcase DROP CONSTRAINT hidden_testcase_problem_id_fkey;
       public          raghavagarwal    false    210    211    3510            I   D   x�3�I-.1�44726�0600�46Ն:��:�&�\F�%@F�F IK *1�14������ @\B      G      x������ � �      F   �  x��UMo�@=���|!�6!J{h�	�E���� �ڻhwM)?���ڀ!R>,h��͛y��t���+X��ؠ�j!�`�5vܠ~�e��(3� �Bg�<��!���;L�!;�"�ӌ�4�R���n.YEQi�=y��,dJa�q�	���BHt˅t�l�ye]��+U.so�>�g��~R��*]��G�U��6���!-.���"�
n�eLUل�`��_S��g�<��kj�����]�Eo�DLS���T�\��'�y3>��e�<A���O���J#���g[�!�>nË
����L���姖&0b�W5��xg��8J�f�g=b?8i%תD��0��S� r$=�NOb��jȸ���<�%�9�{�J[�y^!Ň��h��� ��0�H>�v
7�.���u�)pF�¬�@K��(�� >e״zJ^��kY(��C�j ��tA�mTӉ1���M]�S���]Z�K�z��}%4�1�n����%�K����>Z�'}D���&�Y��0�	$l����t�1�ʼ��x�_�O_�gl�*���J,i�iѬ:??*<�]��LF�c��;&�7�~zr��;���O�\H��9��c<6��������(K>��/al��ض�y����1T�y�m'�#��*χn�"v�f���.t��N�����f~u�^e_����|I���e{}9�t�5�dg����赩��<�aK��0��j��     