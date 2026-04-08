--
-- PostgreSQL database dump
--

\restrict GKPxsZ5Y7RES7KBa30lGPXHAYqxMxefyScQA1j5aM8aso4CrB1G1LC408uFyeMr

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.tenants VALUES ('1e61ef93-3a7c-40f4-bf4c-4a65266289d6', 'realtime-dev', 'realtime-dev', 'iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==', 200, '2026-04-02 01:40:26', '2026-04-02 01:40:26', 100, 'postgres_cdc_rls', 100000, 100, 100, false, '{"keys": [{"x": "M5Sjqn5zwC9Kl1zVfUUGvv9boQjCGd45G8sdopBExB4", "y": "P6IXMvA2WYXSHSOMTBH2jsw_9rrzGy89FjPf6oOsIxQ", "alg": "ES256", "crv": "P-256", "ext": true, "kid": "b81269f1-21d8-4f2e-b719-c2240a840d90", "kty": "EC", "use": "sig", "key_ops": ["verify"]}, {"k": "c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw", "kty": "oct"}]}', false, false, 65, 'gen_rpc', 1000, 3000);


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.extensions VALUES ('400838e2-02ae-4b9f-8c3b-0a315c7fd20f', 'postgres_cdc_rls', '{"region": "us-east-1", "db_host": "cWuiodrNE+g1YXU/FeT6mB7hIWh8WrM6CBIfE5GuOY4=", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}', 'realtime-dev', '2026-04-02 01:40:26', '2026-04-02 01:40:26');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.schema_migrations VALUES (20210706140551, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20220329161857, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20220410212326, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20220506102948, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20220527210857, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20220815211129, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20220815215024, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20220818141501, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20221018173709, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20221102172703, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20221223010058, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20230110180046, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20230810220907, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20230810220924, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20231024094642, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20240306114423, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20240418082835, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20240625211759, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20240704172020, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20240902173232, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20241106103258, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20250424203323, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20250613072131, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20250711044927, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20250811121559, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20250926223044, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20251204170944, '2026-04-01 14:54:20');
INSERT INTO _realtime.schema_migrations VALUES (20251218000543, '2026-04-01 14:54:20');


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '08441dd9-00b3-4017-98d7-7327473801e5', '{"action":"user_signedup","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 16:55:19.280472+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'be594e1f-b258-448d-bda0-4124fdca2110', '{"action":"login","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 16:55:19.30888+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '9d9a1d2e-a2b6-43c3-949f-6229db4ed774', '{"action":"user_repeated_signup","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-04-01 16:57:41.055357+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5a6fba2d-3446-4743-a5a6-34acf682874a', '{"action":"user_signedup","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 16:57:46.998661+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4ba0c0d9-ce42-4e8e-b970-a30b50afd663', '{"action":"login","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 16:57:47.01661+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '766bd2b8-5db5-49f2-8cf9-5148d4f320a7', '{"action":"token_refreshed","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 17:55:48.897467+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1cc2d938-a349-4658-8c32-a10a3fb4bc54', '{"action":"token_revoked","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 17:55:48.901736+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '62b8c5e9-f0ee-46c5-9dda-79777f103215', '{"action":"user_repeated_signup","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-04-01 17:55:52.32779+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '34abff78-f817-4a75-aa67-7836fc0c68a5', '{"action":"user_signedup","actor_id":"9f8634a3-87af-4e19-a09b-d5b0908ce01e","actor_username":"hadegffoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 17:55:56.969754+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e9f10460-5bfe-4670-8423-da64c6efdd45', '{"action":"login","actor_id":"9f8634a3-87af-4e19-a09b-d5b0908ce01e","actor_username":"hadegffoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 17:55:56.981047+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1c66e519-366d-438c-9d26-82ea45decec1', '{"action":"user_signedup","actor_id":"87fb0dd1-7568-45ea-9866-932d34bbe214","actor_username":"aaaaa@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:01:17.259757+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '53539553-02a1-4c43-92b6-654df92065d3', '{"action":"login","actor_id":"87fb0dd1-7568-45ea-9866-932d34bbe214","actor_username":"aaaaa@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:01:17.283709+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '751bc96b-3ef1-428d-9851-76a63e0d5a76', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadebgoldmedia@gmail.com","user_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","user_phone":""}}', '2026-04-01 18:13:44.398745+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1d76ca7a-bb98-4c2c-9eca-b7d890682b3e', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"aaaaa@gmail.com","user_id":"87fb0dd1-7568-45ea-9866-932d34bbe214","user_phone":""}}', '2026-04-01 18:13:44.405185+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '60fb3435-f4f3-46da-a638-d372bcf0af86', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegffoldmedia@gmail.com","user_id":"9f8634a3-87af-4e19-a09b-d5b0908ce01e","user_phone":""}}', '2026-04-01 18:13:44.455927+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '56c8f489-b8aa-4465-86bd-f09399580718', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegoldmedia@gmail.com","user_id":"80960245-d53d-4564-bfcf-a24750a80972","user_phone":""}}', '2026-04-01 18:13:44.459172+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '01a2c299-0d20-4fe6-be51-e4aadbb16bce', '{"action":"user_signedup","actor_id":"061765b3-b42c-4e40-8244-2cc075f96065","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:14:40.582857+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6446dc8f-5d21-42a8-bf18-816a09a8b249', '{"action":"login","actor_id":"061765b3-b42c-4e40-8244-2cc075f96065","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:14:40.590514+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5e26f601-e590-4996-a53c-c43f9de45a78', '{"action":"user_signedup","actor_id":"29cd8772-304a-4d10-86e2-82cecbf70ce3","actor_username":"aaa@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:28:23.761573+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f714c29e-5a31-4a81-bf87-f9952a2e89c8', '{"action":"login","actor_id":"29cd8772-304a-4d10-86e2-82cecbf70ce3","actor_username":"aaa@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:28:23.785749+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '49519d02-291e-463b-b5ac-afa3e311b4ab', '{"action":"user_repeated_signup","actor_id":"061765b3-b42c-4e40-8244-2cc075f96065","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-04-01 18:39:30.115647+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b9704d37-4f98-4f88-9e80-46346133f9d5', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegoldmedia@gmail.com","user_id":"061765b3-b42c-4e40-8244-2cc075f96065","user_phone":""}}', '2026-04-01 18:39:57.30974+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '0e26b22a-c890-4a85-8818-d8a87ed215f3', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"aaa@gmail.com","user_id":"29cd8772-304a-4d10-86e2-82cecbf70ce3","user_phone":""}}', '2026-04-01 18:39:57.314131+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4cd80226-bc23-452b-8e7f-60adc31152df', '{"action":"user_signedup","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:40:02.631414+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '56565e66-5b7e-4b92-8550-a9f3467288da', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:40:02.638395+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ad835d4f-fbf1-4184-9e66-70ef2391e36d', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:15:50.673796+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '3fc49a5b-1dab-463e-98b3-0ca6aaaa23e7', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:46:09.401267+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ed785605-e93a-4e3d-be9b-e3d611bc044d', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:48:18.014008+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'da4f69d4-2769-414d-b6b9-09d1cdbb7c64', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:51:34.760907+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a7f77fc8-a234-4da9-b43d-0ac847c3ee19', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:51:59.078706+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a54720d6-283e-49cb-a8b5-6b95fb29400e', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:52:37.634154+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ba3cc01e-3e8e-4429-86b9-2702dd969cf0', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:54:21.919752+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b698a1a6-ce69-44f3-bcb1-eeefc14686aa', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:55:22.743484+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '94dd77c3-7af5-4f56-8440-eb4321359b6f', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:09:33.093533+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '541c6a2d-ff77-4c63-a230-1bf382499ae6', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:10:30.445396+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a8c6e698-15e3-4a47-931d-e92cdf2f3bec', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:10:39.045507+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6b69c972-3a3a-4fd0-a953-a3dfd9ac5b61', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:12:17.889617+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5282061b-81fe-4334-888f-f24269716b97', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:25:43.940706+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '984d97fc-9896-4255-8f6d-4f67beda5312', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:26:34.141138+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '76ba8546-8da7-4fcc-aa2c-24134e5c7614', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:29:09.246799+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b23966df-04bd-412c-a7e5-75c3cd7286d7', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:29:15.499317+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ace1accf-aaca-4353-a992-dcd15ecbb832', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:38:46.716308+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ce54a8ea-ec92-419d-b918-c6c7afacc634', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:39:18.919284+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '0c727ce9-a613-4a36-a1f8-b4f03c7791d1', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:32:31.047852+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '80e1ff6f-0359-4234-b94e-49ea526b752e', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:32:31.054556+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5887997f-d572-43d7-9aac-8f09ec26e068', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:39:59.519422+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a05d1fd8-0754-43bc-b549-41de34d671c3', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:39:59.528398+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'fb4f19a7-b996-49ce-8d01-1d6cc8beebfe', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 21:40:01.004994+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '2acc6d09-0683-4bc7-a65c-bad3e5b0d75d', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 21:41:14.626089+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '71b8fe83-8022-489d-8009-67965000aa1c', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 00:49:58.948057+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '7ecd8a56-ee21-4b9d-8605-54951a29fa00', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 00:49:58.953196+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '819b24c5-7132-495f-839e-0df53166df1a', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 02:39:40.700822+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4a179b4e-0c31-4000-8071-7a38a6b3d35d', '{"action":"logout","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 02:46:05.967233+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'fa8f55db-44aa-45bc-a84a-191bb4475da4', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 02:46:19.081036+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6e312627-d188-4ac7-be1d-70f9e46c95a7', '{"action":"logout","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 02:54:41.873566+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '7e54ca3d-d30c-44df-bf66-bd2b563ad31e', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 02:56:47.743955+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'fe31a6b3-656c-4846-8153-9b995e476b0c', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 07:02:34.926265+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6e3f0f03-03b6-4e44-bc31-75ed7be84e6c', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 07:02:34.93599+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '52e14364-3fe5-4446-9283-dba4de4c4d29', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 08:03:06.994758+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'bcc38e1d-c51a-4d44-9a05-be49dfcbbda8', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 08:03:07.034626+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4f7eb5a8-429e-445a-b17b-2d99a662088c', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 09:32:25.649156+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'dae3da82-266b-4564-990c-d95a879ec36e', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 09:32:25.653374+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'be3a0375-4f3e-4345-8667-ebb79457ae57', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegoldmedia@gmail.com","user_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","user_phone":""}}', '2026-04-02 10:24:43.186818+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '7f78132e-5a67-4147-92bf-1f938c105d34', '{"action":"user_signedup","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-02 10:27:29.461332+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4389e802-fd3f-42bb-b92c-c1ead3c83e8d', '{"action":"login","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 10:27:29.478393+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '16f0934c-fb6f-4590-aa68-773cda245716', '{"action":"logout","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 10:34:39.235883+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd52b149f-05a1-4b0c-88fc-db552e924a54', '{"action":"user_signedup","actor_id":"07b1ccd3-f6a3-4a07-bb92-990d5d117859","actor_username":"crownofgoldgold@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-02 10:36:54.88688+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8f0756f5-4ff5-43be-807d-27090a5218fe', '{"action":"login","actor_id":"07b1ccd3-f6a3-4a07-bb92-990d5d117859","actor_username":"crownofgoldgold@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 10:36:54.925325+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd1a86b30-f629-4f5a-a938-ee5fdd666def', '{"action":"logout","actor_id":"07b1ccd3-f6a3-4a07-bb92-990d5d117859","actor_username":"crownofgoldgold@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 10:41:53.855541+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '615620f9-8052-426f-a1f6-fe2bd82069fc', '{"action":"user_signedup","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-02 10:42:29.008252+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '0af93029-7145-45c2-86f4-cbe58074e1e6', '{"action":"login","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 10:42:29.025892+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '834a3d25-edc3-4d44-91bd-c3ce5656ad74', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 12:45:20.666358+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd3030dec-cc38-4b83-82a6-6452a25c6c8f', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 12:45:20.67232+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'dc202d19-f9d0-4913-b401-8250a3e3c15d', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 13:44:03.708258+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '7201b3ff-e373-419b-933f-e269d8711015', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 13:44:03.724204+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '16f89bb8-a548-435e-83e0-5a43e184d90f', '{"action":"login","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 13:51:10.268747+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6998f1da-8cd3-4a07-8fde-05d2051803a1', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:46:43.497275+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c129318b-b511-432b-9401-3aa41d196ace', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:46:43.539894+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '665bcc67-c76e-4453-ba77-6cbf072fdc5e', '{"action":"token_refreshed","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:51:06.943857+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd0f32324-8004-4d44-bbd0-754e4a563f8e', '{"action":"token_revoked","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:51:06.997159+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '17eacefa-825d-43bc-ad81-7e52b8e36e70', '{"action":"token_refreshed","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:57:15.703826+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '3117b985-359f-43ef-b6c4-fe3bc7898175', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 15:46:06.145919+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '05bd03ca-9e07-4e62-8a9a-a0e8afee599b', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 15:46:06.229694+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1f1c2a15-8548-4330-b721-f862237d2c69', '{"action":"token_refreshed","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:11:38.98685+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '53b28b2a-9080-4821-af82-099a20fcd64e', '{"action":"token_revoked","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:11:39.00188+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6bbd7278-00ee-4e66-b1d6-2f9b36dee281', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:49:35.461048+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e88ee2ee-fdb7-456d-ad81-4f3a75ac3c1b', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:49:35.678856+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd85fb61e-a9ee-4de4-a883-31896f11ace8', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 17:48:08.460626+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e83212f9-55e2-410f-9774-503f29a71c04', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 17:48:08.471373+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '955682b0-6cdd-4644-8153-160054b2a0fc', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 18:54:43.639667+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c3487796-5bb4-4d4f-97c0-1e3424be2431', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 18:54:43.653892+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'da30a73a-b2f0-49bf-86cb-b4368c54ec0d', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 19:54:05.012266+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'beba0045-57fb-4fec-9fdf-cc19ad65cf69', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 19:54:05.016119+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '32e2060f-325e-4171-8100-67afd6611a85', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 00:27:53.734759+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd7667b98-707e-4e4a-9643-4ee3b6e7edde', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 00:27:53.739975+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b097915c-35bc-4d8f-8c55-125a69917597', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 01:36:53.048372+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '021f5517-465f-49c4-8a5b-8e1c7ba57934', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 01:36:53.050662+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f61ac647-9c92-4d95-9760-68e2b8e6e118', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 03:54:52.441027+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8941fcc5-5376-4677-9367-87f2ab050c1f', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 03:54:52.444406+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8e9bb6c7-b5f0-4c82-b74a-c967daec8d2e', '{"action":"logout","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-03 04:07:46.895926+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '587989a3-befd-4b40-a51d-802f1936765b', '{"action":"login","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-03 04:07:50.159631+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4ad97197-074a-4652-b688-490476180b34', '{"action":"logout","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-03 04:07:56.13833+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8ed6c3f2-3a25-404e-a77c-0b2b2893ac59', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegoldmedia@gmail.com","user_id":"d7ed0783-834c-4266-8605-188854355f70","user_phone":""}}', '2026-04-03 04:08:53.193992+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '13d47aee-aeed-4b78-b7c2-ff5c26b5d380', '{"action":"user_signedup","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-03 04:10:09.432442+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e058b1ae-8706-4793-83a9-7746d9c02579', '{"action":"login","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-03 04:10:09.443735+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'dbcfddbc-5830-4002-8e59-fd60eb814394', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 07:03:28.028479+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '430fa8ec-f112-40de-a617-0dee70a5a632', '{"action":"token_revoked","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 07:03:28.037924+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ba9ce6ac-b2d7-43d2-8ac7-057cdf324854', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 07:03:30.059651+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '263327b4-0868-47b7-9944-a8577d4f9b17', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 07:03:32.177011+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '2823669e-55e0-4e93-a9fb-dce6b45335e6', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 13:47:54.726483+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1930f953-61e6-4cc5-b892-152af2f9d8c0', '{"action":"token_revoked","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 13:47:54.730355+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '86d24590-e2b7-4d5d-ab4b-be74aaaa3429', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 20:01:37.407244+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '885c5941-17b5-4bb5-9c64-acefcea3114b', '{"action":"token_revoked","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 20:01:37.410344+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5f9a6fee-ebc7-42ae-8e9e-54c8a364dd53', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-04 04:34:41.96386+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6908a281-f310-485d-8203-cf9c45fd4aa3', '{"action":"token_revoked","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-04 04:34:42.00063+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4dc07e2b-eb97-4890-a7d2-279c72b12ac4', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-04 05:33:54.272653+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '0b86dc08-234e-4c2a-bbca-247e81b305f2', '{"action":"token_revoked","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-04 05:33:54.282391+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '33dafc2d-7e87-48a5-9f5c-be707099a993', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-06 19:57:38.553097+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '3b27518d-daab-40a4-ac0e-da2fbf00702d', '{"action":"token_revoked","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-06 19:57:38.563244+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5a2ff2e9-45e0-4ed7-9cec-6cda0b34adb2', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-06 19:57:38.750352+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd2e6b036-32ad-4843-8ef5-157805f00184', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-06 19:57:43.343007+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '93ad336b-9ec4-495a-a329-0e6609544f6b', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-06 19:57:43.43922+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ee68cdf6-a2c9-4b96-ac61-7ce3f0c3898e', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-06 19:57:43.556636+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1b56c35a-458a-4e83-bf42-02eeab4d4379', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-07 04:16:01.191503+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '99939e5e-d961-4dd1-9312-58b4c299a299', '{"action":"token_revoked","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-07 04:16:01.198833+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ec69bb42-c2dd-49a4-9fe3-fc80351b2a84', '{"action":"token_refreshed","actor_id":"2e5d034c-56ce-4844-9d92-f9c8837b9382","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-07 04:16:01.354984+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'authenticated', 'authenticated', 'hadegoldmedia@gmail.com', '$2a$10$.RHUtX5JB5EhmMPcy17fZeK4Vt33uKxc.MF456OmOrobZ9b7HBN26', '2026-04-03 04:10:09.433488+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-04-03 04:10:09.446097+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "2e5d034c-56ce-4844-9d92-f9c8837b9382", "email": "hadegoldmedia@gmail.com", "last_name": "Adegboyega", "first_name": "Aladewura", "email_verified": true, "phone_verified": false}', NULL, '2026-04-03 04:10:09.420189+00', '2026-04-07 04:16:01.207032+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '07b1ccd3-f6a3-4a07-bb92-990d5d117859', 'authenticated', 'authenticated', 'crownofgoldgold@gmail.com', '$2a$10$vykgr723hWfxs.jufjfKs.GI5Fh8uUV6i3WszyXAT4RmFczOlV8TC', '2026-04-02 10:36:54.89063+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-04-02 10:36:54.934607+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "07b1ccd3-f6a3-4a07-bb92-990d5d117859", "email": "crownofgoldgold@gmail.com", "last_name": "Adegboyega", "first_name": "Aladewura", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 10:36:54.853763+00', '2026-04-02 10:36:54.974997+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'authenticated', 'authenticated', 'hhhhh@gmail.com', '$2a$10$dkTLotxSjYekEnFUCe6jVeVXr8zHq4FBERa4cR/dAAe8Rwfd7fYcu', '2026-04-02 10:42:29.009839+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-04-02 10:42:29.027273+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "fb3851de-cc92-4f69-bac5-aa22ab18c98c", "email": "hhhhh@gmail.com", "last_name": "de", "first_name": "ala", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 10:42:28.984431+00', '2026-04-03 03:54:52.452472+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.identities VALUES ('07b1ccd3-f6a3-4a07-bb92-990d5d117859', '07b1ccd3-f6a3-4a07-bb92-990d5d117859', '{"sub": "07b1ccd3-f6a3-4a07-bb92-990d5d117859", "email": "crownofgoldgold@gmail.com", "last_name": "Adegboyega", "first_name": "Aladewura", "email_verified": false, "phone_verified": false}', 'email', '2026-04-02 10:36:54.87839+00', '2026-04-02 10:36:54.878427+00', '2026-04-02 10:36:54.878427+00', DEFAULT, 'f233e538-7949-4b03-87fe-10808835a30f');
INSERT INTO auth.identities VALUES ('fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', '{"sub": "fb3851de-cc92-4f69-bac5-aa22ab18c98c", "email": "hhhhh@gmail.com", "last_name": "de", "first_name": "ala", "email_verified": false, "phone_verified": false}', 'email', '2026-04-02 10:42:29.00124+00', '2026-04-02 10:42:29.00128+00', '2026-04-02 10:42:29.00128+00', DEFAULT, 'b4c06faf-2c2d-4862-8be3-131d709d5c1e');
INSERT INTO auth.identities VALUES ('2e5d034c-56ce-4844-9d92-f9c8837b9382', '2e5d034c-56ce-4844-9d92-f9c8837b9382', '{"sub": "2e5d034c-56ce-4844-9d92-f9c8837b9382", "email": "hadegoldmedia@gmail.com", "last_name": "Adegboyega", "first_name": "Aladewura", "email_verified": false, "phone_verified": false}', 'email', '2026-04-03 04:10:09.428266+00', '2026-04-03 04:10:09.428385+00', '2026-04-03 04:10:09.428385+00', DEFAULT, '77e1fc98-fcc3-4774-870c-8decc98280df');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.sessions VALUES ('9eb92dde-b9c6-48d9-97a3-889976c7d7d4', '2e5d034c-56ce-4844-9d92-f9c8837b9382', '2026-04-03 04:10:09.446251+00', '2026-04-07 04:16:01.356019+00', NULL, 'aal1', NULL, '2026-04-07 04:16:01.355976', 'Next.js Middleware', '172.18.0.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.mfa_amr_claims VALUES ('9eb92dde-b9c6-48d9-97a3-889976c7d7d4', '2026-04-03 04:10:09.454778+00', '2026-04-03 04:10:09.454778+00', 'password', '2f3c11b6-f84e-44c8-977d-962c1614d5de');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 56, 'smietdmctlxr', '2e5d034c-56ce-4844-9d92-f9c8837b9382', true, '2026-04-03 04:10:09.452113+00', '2026-04-03 07:03:28.039152+00', NULL, '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 57, '4bsrns3o6ro3', '2e5d034c-56ce-4844-9d92-f9c8837b9382', true, '2026-04-03 07:03:28.051778+00', '2026-04-03 13:47:54.731142+00', 'smietdmctlxr', '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 58, 'zpwgm5z7vjzr', '2e5d034c-56ce-4844-9d92-f9c8837b9382', true, '2026-04-03 13:47:54.734393+00', '2026-04-03 20:01:37.411175+00', '4bsrns3o6ro3', '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 59, 'dkjvizoavc2w', '2e5d034c-56ce-4844-9d92-f9c8837b9382', true, '2026-04-03 20:01:37.414061+00', '2026-04-04 04:34:42.008416+00', 'zpwgm5z7vjzr', '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 60, 'rslvjpdqopw2', '2e5d034c-56ce-4844-9d92-f9c8837b9382', true, '2026-04-04 04:34:42.024399+00', '2026-04-04 05:33:54.283764+00', 'dkjvizoavc2w', '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 61, 'yag4u27x4ax6', '2e5d034c-56ce-4844-9d92-f9c8837b9382', true, '2026-04-04 05:33:54.290312+00', '2026-04-06 19:57:38.564191+00', 'rslvjpdqopw2', '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 62, 'sn52wja4ojin', '2e5d034c-56ce-4844-9d92-f9c8837b9382', true, '2026-04-06 19:57:38.569253+00', '2026-04-07 04:16:01.200667+00', 'yag4u27x4ax6', '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 63, 'ktp2mu7n27mm', '2e5d034c-56ce-4844-9d92-f9c8837b9382', false, '2026-04-07 04:16:01.204376+00', '2026-04-07 04:16:01.204376+00', 'sn52wja4ojin', '9eb92dde-b9c6-48d9-97a3-889976c7d7d4');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.schema_migrations VALUES ('20171026211738');
INSERT INTO auth.schema_migrations VALUES ('20171026211808');
INSERT INTO auth.schema_migrations VALUES ('20171026211834');
INSERT INTO auth.schema_migrations VALUES ('20180103212743');
INSERT INTO auth.schema_migrations VALUES ('20180108183307');
INSERT INTO auth.schema_migrations VALUES ('20180119214651');
INSERT INTO auth.schema_migrations VALUES ('20180125194653');
INSERT INTO auth.schema_migrations VALUES ('00');
INSERT INTO auth.schema_migrations VALUES ('20210710035447');
INSERT INTO auth.schema_migrations VALUES ('20210722035447');
INSERT INTO auth.schema_migrations VALUES ('20210730183235');
INSERT INTO auth.schema_migrations VALUES ('20210909172000');
INSERT INTO auth.schema_migrations VALUES ('20210927181326');
INSERT INTO auth.schema_migrations VALUES ('20211122151130');
INSERT INTO auth.schema_migrations VALUES ('20211124214934');
INSERT INTO auth.schema_migrations VALUES ('20211202183645');
INSERT INTO auth.schema_migrations VALUES ('20220114185221');
INSERT INTO auth.schema_migrations VALUES ('20220114185340');
INSERT INTO auth.schema_migrations VALUES ('20220224000811');
INSERT INTO auth.schema_migrations VALUES ('20220323170000');
INSERT INTO auth.schema_migrations VALUES ('20220429102000');
INSERT INTO auth.schema_migrations VALUES ('20220531120530');
INSERT INTO auth.schema_migrations VALUES ('20220614074223');
INSERT INTO auth.schema_migrations VALUES ('20220811173540');
INSERT INTO auth.schema_migrations VALUES ('20221003041349');
INSERT INTO auth.schema_migrations VALUES ('20221003041400');
INSERT INTO auth.schema_migrations VALUES ('20221011041400');
INSERT INTO auth.schema_migrations VALUES ('20221020193600');
INSERT INTO auth.schema_migrations VALUES ('20221021073300');
INSERT INTO auth.schema_migrations VALUES ('20221021082433');
INSERT INTO auth.schema_migrations VALUES ('20221027105023');
INSERT INTO auth.schema_migrations VALUES ('20221114143122');
INSERT INTO auth.schema_migrations VALUES ('20221114143410');
INSERT INTO auth.schema_migrations VALUES ('20221125140132');
INSERT INTO auth.schema_migrations VALUES ('20221208132122');
INSERT INTO auth.schema_migrations VALUES ('20221215195500');
INSERT INTO auth.schema_migrations VALUES ('20221215195800');
INSERT INTO auth.schema_migrations VALUES ('20221215195900');
INSERT INTO auth.schema_migrations VALUES ('20230116124310');
INSERT INTO auth.schema_migrations VALUES ('20230116124412');
INSERT INTO auth.schema_migrations VALUES ('20230131181311');
INSERT INTO auth.schema_migrations VALUES ('20230322519590');
INSERT INTO auth.schema_migrations VALUES ('20230402418590');
INSERT INTO auth.schema_migrations VALUES ('20230411005111');
INSERT INTO auth.schema_migrations VALUES ('20230508135423');
INSERT INTO auth.schema_migrations VALUES ('20230523124323');
INSERT INTO auth.schema_migrations VALUES ('20230818113222');
INSERT INTO auth.schema_migrations VALUES ('20230914180801');
INSERT INTO auth.schema_migrations VALUES ('20231027141322');
INSERT INTO auth.schema_migrations VALUES ('20231114161723');
INSERT INTO auth.schema_migrations VALUES ('20231117164230');
INSERT INTO auth.schema_migrations VALUES ('20240115144230');
INSERT INTO auth.schema_migrations VALUES ('20240214120130');
INSERT INTO auth.schema_migrations VALUES ('20240306115329');
INSERT INTO auth.schema_migrations VALUES ('20240314092811');
INSERT INTO auth.schema_migrations VALUES ('20240427152123');
INSERT INTO auth.schema_migrations VALUES ('20240612123726');
INSERT INTO auth.schema_migrations VALUES ('20240729123726');
INSERT INTO auth.schema_migrations VALUES ('20240802193726');
INSERT INTO auth.schema_migrations VALUES ('20240806073726');
INSERT INTO auth.schema_migrations VALUES ('20241009103726');
INSERT INTO auth.schema_migrations VALUES ('20250717082212');
INSERT INTO auth.schema_migrations VALUES ('20250731150234');
INSERT INTO auth.schema_migrations VALUES ('20250804100000');
INSERT INTO auth.schema_migrations VALUES ('20250901200500');
INSERT INTO auth.schema_migrations VALUES ('20250903112500');
INSERT INTO auth.schema_migrations VALUES ('20250904133000');
INSERT INTO auth.schema_migrations VALUES ('20250925093508');
INSERT INTO auth.schema_migrations VALUES ('20251007112900');
INSERT INTO auth.schema_migrations VALUES ('20251104100000');
INSERT INTO auth.schema_migrations VALUES ('20251111201300');
INSERT INTO auth.schema_migrations VALUES ('20251201000000');
INSERT INTO auth.schema_migrations VALUES ('20260115000000');
INSERT INTO auth.schema_migrations VALUES ('20260121000000');


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: coins; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.coins VALUES ('XRP', 'Ripple', 'xrp', NULL, 0, '{xrp}', 0);
INSERT INTO public.coins VALUES ('BNB', 'Binance Coin', '🟡', '#f3ba2f', 0, '{bsc}', 0);
INSERT INTO public.coins VALUES ('ETH', 'Ethereum', 'Ξ', '#627eea', 0, '{eth}', 0.012);
INSERT INTO public.coins VALUES ('BTC', 'Bitcoin', '₿', '#f7931a', 0, '{btc}', 0.0004);
INSERT INTO public.coins VALUES ('USDT', 'Tether', '$', '#26a17b', 0, '{trc20,erc20,bsc}', 1);


--
-- Data for Name: deposit_sessions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.notifications VALUES ('879adae1-9e39-4e58-bb5d-9ae618eb2b93', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Deposit of 500 PLUTO confirmed ✓', '2026-04-02 10:44:38.035905+00', true);
INSERT INTO public.notifications VALUES ('4c507fbd-54cb-4705-abcf-7fda18312e6c', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Staking reward credited: +12 PLUTO', '2026-04-02 10:44:38.035905+00', true);
INSERT INTO public.notifications VALUES ('2344619c-fa7c-40de-89bb-df06c07e6743', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Price alert: PLUTO up 3.2% today 📈', '2026-04-02 10:44:38.035905+00', true);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.profiles VALUES ('fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'ala de', 'hhhhh@gmail.com', '88777', 'uk', '2026-04-02 10:42:29.103075+00', false);
INSERT INTO public.profiles VALUES ('07b1ccd3-f6a3-4a07-bb92-990d5d117859', 'Aladewura Adegboyega', 'crownofgoldgold@gmail.com', '2348131198511', 'Nigeria', '2026-04-02 10:36:55.193547+00', true);
INSERT INTO public.profiles VALUES ('2e5d034c-56ce-4844-9d92-f9c8837b9382', 'Aladewura Adegboyega', 'hadegoldmedia@gmail.com', '2348131198511', 'Nigeria', '2026-04-03 04:10:09.518473+00', false);


--
-- Data for Name: staking_plans; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.staking_plans VALUES ('e62fa9c3-6f40-4161-b781-a4788feab97e', 'Premier Master', 500, 50000, 0.83, 25, 30, 0, '{}', '2026-04-02 14:26:13.09526+00');
INSERT INTO public.staking_plans VALUES ('60c98ddb-a931-4f15-92e7-7b06a61ea9f6', 'Premier Token Trust', 50000, 150000, 1.0, 30, 30, 4, '{}', '2026-04-02 14:26:13.09526+00');
INSERT INTO public.staking_plans VALUES ('d79692d8-3def-4dc6-82e4-d8ee61389104', 'Premier Cera', 150000, 300000, 1.2, 36, 30, 6, '{}', '2026-04-02 14:26:13.09526+00');
INSERT INTO public.staking_plans VALUES ('f0a1e40b-7fa6-4a46-a972-42c9bb9a3921', 'Premier Defi', 300000, 500000, 1.5, 45, 30, 8, '{}', '2026-04-02 14:26:13.09526+00');
INSERT INTO public.staking_plans VALUES ('1ac919ae-d9b3-4cf4-9017-383a4b1b1997', 'Premier Master Hall of Fame', 500000, NULL, 2.0, 720, 360, 10, '{}', '2026-04-02 14:26:13.09526+00');
INSERT INTO public.staking_plans VALUES ('459f2142-c3a7-42b1-8f16-0ba7903fc962', 'Premier NFP', 100000, NULL, NULL, NULL, NULL, 0, '{"35% – 50% Single Day Trade","51% – 80% Twin Trade","Trade every last Friday of the month"}', '2026-04-02 14:26:13.09526+00');
INSERT INTO public.staking_plans VALUES ('58429dec-69b5-4e31-a18b-b1e8fbaeb1d3', 'Business Cooperative', 200000, NULL, 1.3, 39, 30, 0, '{"0.3% daily bonus to private account","5% bonus on deposits above 50k","Partnership in Token Global"}', '2026-04-02 14:26:13.09526+00');


--
-- Data for Name: staking_positions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.staking_positions VALUES ('c8efecd5-b5ba-47bb-999e-52948e2e636c', 'd7ed0783-834c-4266-8605-188854355f70', 10000, 10, 36, 30, 29, 1, '2026-04-02 14:56:28.212479+00', NULL, 'active', '2026-04-29 00:00:00+00');
INSERT INTO public.staking_positions VALUES ('491e7951-8c00-42c6-9a51-fd8a508fe001', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 10000, 30, 36, 30, 30, 0, '2026-04-02 15:50:37.218251+00', NULL, 'active', NULL);
INSERT INTO public.staking_positions VALUES ('84fdc4e3-e303-471f-9165-760fafc54c31', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 10000, 10, 36, 30, 30, 0, '2026-04-02 14:54:13.723783+00', '1ac919ae-d9b3-4cf4-9017-383a4b1b1997', 'active', '2026-04-29 00:00:00+00');
INSERT INTO public.staking_positions VALUES ('f8d52757-2aa2-4c8b-9957-34abe4dd6029', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 10000, 7, 36, 30, 30, 0, '2026-04-02 15:49:40.061296+00', '60c98ddb-a931-4f15-92e7-7b06a61ea9f6', 'active', '2026-05-10 22:59:59+00');


--
-- Data for Name: swap_history; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: swap_rates; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.swap_rates VALUES ('BTC', 'ETH', 17.2);
INSERT INTO public.swap_rates VALUES ('BTC', 'USDT', 67500);
INSERT INTO public.swap_rates VALUES ('ETH', 'BTC', 0.058);
INSERT INTO public.swap_rates VALUES ('ETH', 'USDT', 3880);
INSERT INTO public.swap_rates VALUES ('USDT', 'BTC', 1.48e-05);
INSERT INTO public.swap_rates VALUES ('USDT', 'ETH', 0.000258);
INSERT INTO public.swap_rates VALUES ('POLYC', 'USDT', 0.2);
INSERT INTO public.swap_rates VALUES ('POLYC', 'ETH', 0.00172);
INSERT INTO public.swap_rates VALUES ('POLYC', 'BTC', 0.0001);
INSERT INTO public.swap_rates VALUES ('BTC', 'POLYC', 10000);
INSERT INTO public.swap_rates VALUES ('ETH', 'POLYC', 582);
INSERT INTO public.swap_rates VALUES ('USDT', 'POLYC', 5);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.transactions VALUES ('917cb2b7-cc41-4e33-9848-4a27102b0662', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'deposit', 'BTC', 10, NULL, NULL, NULL, 'confirmed', NULL, '2026-04-03 19:57:30.581879+00', NULL, NULL, 'session-1234');
INSERT INTO public.transactions VALUES ('793b6ae5-ba3a-4591-8fd6-40658d84e5b4', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'deposit', 'BTC', 109, NULL, NULL, NULL, 'confirmed', NULL, '2026-04-03 20:01:06.099012+00', NULL, NULL, 'session-1634');


--
-- Data for Name: wallets; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.wallets VALUES ('3278ac34-fbdc-40c7-ac08-43cf84c4be40', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'POLYC', 0, 0, 0.2, 0, NULL, '0x8c9ff6263496343369ea5cffd5c7b1d455885fea');
INSERT INTO public.wallets VALUES ('047d6c45-016d-4cd1-a468-7f84f48aa70e', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'USDT', 0, 0, 0.2, 0, NULL, '0xbd568dcec2ebed1923de216bd427d52dc0ec3ccc');
INSERT INTO public.wallets VALUES ('fef28934-9f65-4378-ab42-9177c2bce726', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'ETH', 0, 0, 0.2, 0, NULL, '0x149b422da44252b5585b4c304fe8a802bdcaed33');
INSERT INTO public.wallets VALUES ('58a816bf-34ad-437f-8d70-81e8adefe601', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'BNB', 0, 0, 0.2, 0, NULL, '0x1e5f2d03b228d90cde80192c7cb6a383489d8b43');
INSERT INTO public.wallets VALUES ('17362a53-9a48-480e-a471-ff060aba5079', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'ADA', 0, 0, 0.2, 0, NULL, '0xd03ca27ee6440bb3c30586154ab73a6b61724e6b');
INSERT INTO public.wallets VALUES ('ad15aa87-132e-4236-9e01-1b703eb09a00', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'SOL', 0, 0, 0.2, 0, NULL, '0x5a2ce014794b813868c9df83d78bc92beaf43715');
INSERT INTO public.wallets VALUES ('f69c6662-846e-4c9e-94e9-d55ca9730923', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'XRP', 0, 0, 0.2, 0, NULL, '0x7f540e9bb3d06c8301d40c5d9fe52176f075ad03');
INSERT INTO public.wallets VALUES ('291202ec-e09e-458d-8cf2-bbfa3386f0b7', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'DOT', 0, 0, 0.2, 0, NULL, '0x81b42fa75415f304750f20b9e985284a687d850e');
INSERT INTO public.wallets VALUES ('fa62ce05-74de-456c-9bfd-f6c239ab28b3', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'DOGE', 0, 0, 0.2, 0, NULL, '0x25bf06caa624914850dd7e0c9e0d426d71cace7f');
INSERT INTO public.wallets VALUES ('438ab1fd-28dd-4db3-b425-31c5deb5725d', '2e5d034c-56ce-4844-9d92-f9c8837b9382', 'BTC', 119, 600, 0.2, 800, NULL, '0x6d145ad070724b125c4696113b39e5e820740639');


--
-- Data for Name: withdraw_requests; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_03_31; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_04_01; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_04_02; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_04_03; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_04_04; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_04_05; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

INSERT INTO realtime.schema_migrations VALUES (20211116024918, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211116045059, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211116050929, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211116051442, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211116212300, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211116213355, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211116213934, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211116214523, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211122062447, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211124070109, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211202204204, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211202204605, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211210212804, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20211228014915, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220107221237, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220228202821, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220312004840, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220603231003, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220603232444, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220615214548, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220712093339, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220908172859, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20220916233421, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20230119133233, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20230128025114, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20230128025212, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20230227211149, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20230228184745, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20230308225145, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20230328144023, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20231018144023, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20231204144023, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20231204144024, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20231204144025, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240108234812, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240109165339, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240227174441, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240311171622, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240321100241, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240401105812, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240418121054, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240523004032, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240618124746, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240801235015, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240805133720, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240827160934, '2026-04-01 14:54:21');
INSERT INTO realtime.schema_migrations VALUES (20240919163303, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20240919163305, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241019105805, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241030150047, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241108114728, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241121104152, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241130184212, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241220035512, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241220123912, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20241224161212, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250107150512, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250110162412, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250123174212, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250128220012, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250506224012, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250523164012, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250714121412, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20250905041441, '2026-04-01 14:54:22');
INSERT INTO realtime.schema_migrations VALUES (20251103001201, '2026-04-01 14:54:22');


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.migrations VALUES (0, 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2026-04-01 14:56:02.73315');
INSERT INTO storage.migrations VALUES (1, 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2026-04-01 14:56:02.747641');
INSERT INTO storage.migrations VALUES (2, 'storage-schema', 'f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd', '2026-04-01 14:56:02.753779');
INSERT INTO storage.migrations VALUES (3, 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2026-04-01 14:56:02.771689');
INSERT INTO storage.migrations VALUES (4, 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2026-04-01 14:56:02.781885');
INSERT INTO storage.migrations VALUES (5, 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2026-04-01 14:56:02.783304');
INSERT INTO storage.migrations VALUES (6, 'change-column-name-in-get-size', 'ded78e2f1b5d7e616117897e6443a925965b30d2', '2026-04-01 14:56:02.785872');
INSERT INTO storage.migrations VALUES (7, 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2026-04-01 14:56:02.7876');
INSERT INTO storage.migrations VALUES (8, 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2026-04-01 14:56:02.78852');
INSERT INTO storage.migrations VALUES (9, 'fix-search-function', 'af597a1b590c70519b464a4ab3be54490712796b', '2026-04-01 14:56:02.789586');
INSERT INTO storage.migrations VALUES (10, 'search-files-search-function', 'b595f05e92f7e91211af1bbfe9c6a13bb3391e16', '2026-04-01 14:56:02.790973');
INSERT INTO storage.migrations VALUES (11, 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2026-04-01 14:56:02.792954');
INSERT INTO storage.migrations VALUES (12, 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2026-04-01 14:56:02.794911');
INSERT INTO storage.migrations VALUES (13, 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2026-04-01 14:56:02.796089');
INSERT INTO storage.migrations VALUES (14, 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2026-04-01 14:56:02.797289');
INSERT INTO storage.migrations VALUES (15, 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2026-04-01 14:56:02.809366');
INSERT INTO storage.migrations VALUES (16, 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2026-04-01 14:56:02.811504');
INSERT INTO storage.migrations VALUES (17, 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2026-04-01 14:56:02.813027');
INSERT INTO storage.migrations VALUES (18, 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2026-04-01 14:56:02.814245');
INSERT INTO storage.migrations VALUES (19, 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2026-04-01 14:56:02.816645');
INSERT INTO storage.migrations VALUES (20, 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2026-04-01 14:56:02.817966');
INSERT INTO storage.migrations VALUES (21, 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2026-04-01 14:56:02.820417');
INSERT INTO storage.migrations VALUES (22, 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2026-04-01 14:56:02.828965');
INSERT INTO storage.migrations VALUES (23, 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2026-04-01 14:56:02.836323');
INSERT INTO storage.migrations VALUES (24, 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2026-04-01 14:56:02.839406');
INSERT INTO storage.migrations VALUES (25, 'custom-metadata', 'd974c6057c3db1c1f847afa0e291e6165693b990', '2026-04-01 14:56:02.842467');
INSERT INTO storage.migrations VALUES (26, 'objects-prefixes', '215cabcb7f78121892a5a2037a09fedf9a1ae322', '2026-04-01 14:56:02.844002');
INSERT INTO storage.migrations VALUES (27, 'search-v2', '859ba38092ac96eb3964d83bf53ccc0b141663a6', '2026-04-01 14:56:02.845049');
INSERT INTO storage.migrations VALUES (28, 'object-bucket-name-sorting', 'c73a2b5b5d4041e39705814fd3a1b95502d38ce4', '2026-04-01 14:56:02.846197');
INSERT INTO storage.migrations VALUES (29, 'create-prefixes', 'ad2c1207f76703d11a9f9007f821620017a66c21', '2026-04-01 14:56:02.847664');
INSERT INTO storage.migrations VALUES (30, 'update-object-levels', '2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6', '2026-04-01 14:56:02.848814');
INSERT INTO storage.migrations VALUES (31, 'objects-level-index', 'b40367c14c3440ec75f19bbce2d71e914ddd3da0', '2026-04-01 14:56:02.849881');
INSERT INTO storage.migrations VALUES (32, 'backward-compatible-index-on-objects', 'e0c37182b0f7aee3efd823298fb3c76f1042c0f7', '2026-04-01 14:56:02.850905');
INSERT INTO storage.migrations VALUES (33, 'backward-compatible-index-on-prefixes', 'b480e99ed951e0900f033ec4eb34b5bdcb4e3d49', '2026-04-01 14:56:02.851814');
INSERT INTO storage.migrations VALUES (34, 'optimize-search-function-v1', 'ca80a3dc7bfef894df17108785ce29a7fc8ee456', '2026-04-01 14:56:02.853025');
INSERT INTO storage.migrations VALUES (35, 'add-insert-trigger-prefixes', '458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc', '2026-04-01 14:56:02.854197');
INSERT INTO storage.migrations VALUES (36, 'optimise-existing-functions', '6ae5fca6af5c55abe95369cd4f93985d1814ca8f', '2026-04-01 14:56:02.855089');
INSERT INTO storage.migrations VALUES (37, 'add-bucket-name-length-trigger', '3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1', '2026-04-01 14:56:02.856122');
INSERT INTO storage.migrations VALUES (38, 'iceberg-catalog-flag-on-buckets', '02716b81ceec9705aed84aa1501657095b32e5c5', '2026-04-01 14:56:02.858283');
INSERT INTO storage.migrations VALUES (39, 'add-search-v2-sort-support', '6706c5f2928846abee18461279799ad12b279b78', '2026-04-01 14:56:02.870488');
INSERT INTO storage.migrations VALUES (40, 'fix-prefix-race-conditions-optimized', '7ad69982ae2d372b21f48fc4829ae9752c518f6b', '2026-04-01 14:56:02.871876');
INSERT INTO storage.migrations VALUES (41, 'add-object-level-update-trigger', '07fcf1a22165849b7a029deed059ffcde08d1ae0', '2026-04-01 14:56:02.872679');
INSERT INTO storage.migrations VALUES (42, 'rollback-prefix-triggers', '771479077764adc09e2ea2043eb627503c034cd4', '2026-04-01 14:56:02.873431');
INSERT INTO storage.migrations VALUES (43, 'fix-object-level', '84b35d6caca9d937478ad8a797491f38b8c2979f', '2026-04-01 14:56:02.874158');
INSERT INTO storage.migrations VALUES (44, 'vector-bucket-type', '99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3', '2026-04-01 14:56:02.874845');
INSERT INTO storage.migrations VALUES (45, 'vector-buckets', '049e27196d77a7cb76497a85afae669d8b230953', '2026-04-01 14:56:02.876331');
INSERT INTO storage.migrations VALUES (46, 'buckets-objects-grants', 'fedeb96d60fefd8e02ab3ded9fbde05632f84aed', '2026-04-01 14:56:02.882386');
INSERT INTO storage.migrations VALUES (47, 'iceberg-table-metadata', '649df56855c24d8b36dd4cc1aeb8251aa9ad42c2', '2026-04-01 14:56:02.883897');
INSERT INTO storage.migrations VALUES (48, 'iceberg-catalog-ids', 'e0e8b460c609b9999ccd0df9ad14294613eed939', '2026-04-01 14:56:02.886146');
INSERT INTO storage.migrations VALUES (49, 'buckets-objects-grants-postgres', '072b1195d0d5a2f888af6b2302a1938dd94b8b3d', '2026-04-01 14:56:02.905163');
INSERT INTO storage.migrations VALUES (50, 'search-v2-optimised', '6323ac4f850aa14e7387eb32102869578b5bd478', '2026-04-01 14:56:02.906541');
INSERT INTO storage.migrations VALUES (51, 'index-backward-compatible-search', '2ee395d433f76e38bcd3856debaf6e0e5b674011', '2026-04-01 14:56:02.915534');
INSERT INTO storage.migrations VALUES (52, 'drop-not-used-indexes-and-functions', 'bb0cbc7f2206a5a41113363dd22556cc1afd6327', '2026-04-01 14:56:02.915868');
INSERT INTO storage.migrations VALUES (53, 'drop-index-lower-name', 'd0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854', '2026-04-01 14:56:02.919535');
INSERT INTO storage.migrations VALUES (54, 'drop-index-object-level', '6289e048b1472da17c31a7eba1ded625a6457e67', '2026-04-01 14:56:02.920163');
INSERT INTO storage.migrations VALUES (55, 'prevent-direct-deletes', '262a4798d5e0f2e7c8970232e03ce8be695d5819', '2026-04-01 14:56:02.920501');


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

INSERT INTO supabase_functions.migrations VALUES ('initial', '2026-04-01 14:53:13.346374+00');
INSERT INTO supabase_functions.migrations VALUES ('20210809183423_update_grants', '2026-04-01 14:53:13.346374+00');


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 63, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict GKPxsZ5Y7RES7KBa30lGPXHAYqxMxefyScQA1j5aM8aso4CrB1G1LC408uFyeMr

