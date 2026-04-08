SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict syJjjaNmqt60h6q3FPwsiCh7avzy02HyjJC4y4OMQA5g91eUgbF6nLmdbDgV9da

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '08441dd9-00b3-4017-98d7-7327473801e5', '{"action":"user_signedup","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 16:55:19.280472+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be594e1f-b258-448d-bda0-4124fdca2110', '{"action":"login","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 16:55:19.30888+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d9a1d2e-a2b6-43c3-949f-6229db4ed774', '{"action":"user_repeated_signup","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-04-01 16:57:41.055357+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a6fba2d-3446-4743-a5a6-34acf682874a', '{"action":"user_signedup","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 16:57:46.998661+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ba0c0d9-ce42-4e8e-b970-a30b50afd663', '{"action":"login","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 16:57:47.01661+00', ''),
	('00000000-0000-0000-0000-000000000000', '766bd2b8-5db5-49f2-8cf9-5148d4f320a7', '{"action":"token_refreshed","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 17:55:48.897467+00', ''),
	('00000000-0000-0000-0000-000000000000', '1cc2d938-a349-4658-8c32-a10a3fb4bc54', '{"action":"token_revoked","actor_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","actor_username":"hadebgoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 17:55:48.901736+00', ''),
	('00000000-0000-0000-0000-000000000000', '62b8c5e9-f0ee-46c5-9dda-79777f103215', '{"action":"user_repeated_signup","actor_id":"80960245-d53d-4564-bfcf-a24750a80972","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-04-01 17:55:52.32779+00', ''),
	('00000000-0000-0000-0000-000000000000', '34abff78-f817-4a75-aa67-7836fc0c68a5', '{"action":"user_signedup","actor_id":"9f8634a3-87af-4e19-a09b-d5b0908ce01e","actor_username":"hadegffoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 17:55:56.969754+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9f10460-5bfe-4670-8423-da64c6efdd45', '{"action":"login","actor_id":"9f8634a3-87af-4e19-a09b-d5b0908ce01e","actor_username":"hadegffoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 17:55:56.981047+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c66e519-366d-438c-9d26-82ea45decec1', '{"action":"user_signedup","actor_id":"87fb0dd1-7568-45ea-9866-932d34bbe214","actor_username":"aaaaa@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:01:17.259757+00', ''),
	('00000000-0000-0000-0000-000000000000', '53539553-02a1-4c43-92b6-654df92065d3', '{"action":"login","actor_id":"87fb0dd1-7568-45ea-9866-932d34bbe214","actor_username":"aaaaa@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:01:17.283709+00', ''),
	('00000000-0000-0000-0000-000000000000', '751bc96b-3ef1-428d-9851-76a63e0d5a76', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadebgoldmedia@gmail.com","user_id":"90e9d0f8-fdd3-491b-a471-c98cf25d009d","user_phone":""}}', '2026-04-01 18:13:44.398745+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d76ca7a-bb98-4c2c-9eca-b7d890682b3e', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"aaaaa@gmail.com","user_id":"87fb0dd1-7568-45ea-9866-932d34bbe214","user_phone":""}}', '2026-04-01 18:13:44.405185+00', ''),
	('00000000-0000-0000-0000-000000000000', '60fb3435-f4f3-46da-a638-d372bcf0af86', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegffoldmedia@gmail.com","user_id":"9f8634a3-87af-4e19-a09b-d5b0908ce01e","user_phone":""}}', '2026-04-01 18:13:44.455927+00', ''),
	('00000000-0000-0000-0000-000000000000', '56c8f489-b8aa-4465-86bd-f09399580718', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegoldmedia@gmail.com","user_id":"80960245-d53d-4564-bfcf-a24750a80972","user_phone":""}}', '2026-04-01 18:13:44.459172+00', ''),
	('00000000-0000-0000-0000-000000000000', '01a2c299-0d20-4fe6-be51-e4aadbb16bce', '{"action":"user_signedup","actor_id":"061765b3-b42c-4e40-8244-2cc075f96065","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:14:40.582857+00', ''),
	('00000000-0000-0000-0000-000000000000', '6446dc8f-5d21-42a8-bf18-816a09a8b249', '{"action":"login","actor_id":"061765b3-b42c-4e40-8244-2cc075f96065","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:14:40.590514+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e26f601-e590-4996-a53c-c43f9de45a78', '{"action":"user_signedup","actor_id":"29cd8772-304a-4d10-86e2-82cecbf70ce3","actor_username":"aaa@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:28:23.761573+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f714c29e-5a31-4a81-bf87-f9952a2e89c8', '{"action":"login","actor_id":"29cd8772-304a-4d10-86e2-82cecbf70ce3","actor_username":"aaa@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:28:23.785749+00', ''),
	('00000000-0000-0000-0000-000000000000', '49519d02-291e-463b-b5ac-afa3e311b4ab', '{"action":"user_repeated_signup","actor_id":"061765b3-b42c-4e40-8244-2cc075f96065","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2026-04-01 18:39:30.115647+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9704d37-4f98-4f88-9e80-46346133f9d5', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegoldmedia@gmail.com","user_id":"061765b3-b42c-4e40-8244-2cc075f96065","user_phone":""}}', '2026-04-01 18:39:57.30974+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e26b22a-c890-4a85-8818-d8a87ed215f3', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"aaa@gmail.com","user_id":"29cd8772-304a-4d10-86e2-82cecbf70ce3","user_phone":""}}', '2026-04-01 18:39:57.314131+00', ''),
	('00000000-0000-0000-0000-000000000000', '4cd80226-bc23-452b-8e7f-60adc31152df', '{"action":"user_signedup","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-01 18:40:02.631414+00', ''),
	('00000000-0000-0000-0000-000000000000', '56565e66-5b7e-4b92-8550-a9f3467288da', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 18:40:02.638395+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad835d4f-fbf1-4184-9e66-70ef2391e36d', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:15:50.673796+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fc49a5b-1dab-463e-98b3-0ca6aaaa23e7', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:46:09.401267+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed785605-e93a-4e3d-be9b-e3d611bc044d', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:48:18.014008+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da4f69d4-2769-414d-b6b9-09d1cdbb7c64', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:51:34.760907+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7f77fc8-a234-4da9-b43d-0ac847c3ee19', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:51:59.078706+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a54720d6-283e-49cb-a8b5-6b95fb29400e', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:52:37.634154+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba3cc01e-3e8e-4429-86b9-2702dd969cf0', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:54:21.919752+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b698a1a6-ce69-44f3-bcb1-eeefc14686aa', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 19:55:22.743484+00', ''),
	('00000000-0000-0000-0000-000000000000', '94dd77c3-7af5-4f56-8440-eb4321359b6f', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:09:33.093533+00', ''),
	('00000000-0000-0000-0000-000000000000', '541c6a2d-ff77-4c63-a230-1bf382499ae6', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:10:30.445396+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8c6e698-15e3-4a47-931d-e92cdf2f3bec', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:10:39.045507+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b69c972-3a3a-4fd0-a953-a3dfd9ac5b61', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:12:17.889617+00', ''),
	('00000000-0000-0000-0000-000000000000', '5282061b-81fe-4334-888f-f24269716b97', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:25:43.940706+00', ''),
	('00000000-0000-0000-0000-000000000000', '984d97fc-9896-4255-8f6d-4f67beda5312', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:26:34.141138+00', ''),
	('00000000-0000-0000-0000-000000000000', '76ba8546-8da7-4fcc-aa2c-24134e5c7614', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:29:09.246799+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b23966df-04bd-412c-a7e5-75c3cd7286d7', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:29:15.499317+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ace1accf-aaca-4353-a992-dcd15ecbb832', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:38:46.716308+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce54a8ea-ec92-419d-b918-c6c7afacc634', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 20:39:18.919284+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c727ce9-a613-4a36-a1f8-b4f03c7791d1', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:32:31.047852+00', ''),
	('00000000-0000-0000-0000-000000000000', '80e1ff6f-0359-4234-b94e-49ea526b752e', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:32:31.054556+00', ''),
	('00000000-0000-0000-0000-000000000000', '5887997f-d572-43d7-9aac-8f09ec26e068', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:39:59.519422+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a05d1fd8-0754-43bc-b549-41de34d671c3', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-01 21:39:59.528398+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb4f19a7-b996-49ce-8d01-1d6cc8beebfe', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 21:40:01.004994+00', ''),
	('00000000-0000-0000-0000-000000000000', '2acc6d09-0683-4bc7-a65c-bad3e5b0d75d', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-01 21:41:14.626089+00', ''),
	('00000000-0000-0000-0000-000000000000', '71b8fe83-8022-489d-8009-67965000aa1c', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 00:49:58.948057+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ecd8a56-ee21-4b9d-8605-54951a29fa00', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 00:49:58.953196+00', ''),
	('00000000-0000-0000-0000-000000000000', '819b24c5-7132-495f-839e-0df53166df1a', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 02:39:40.700822+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a179b4e-0c31-4000-8071-7a38a6b3d35d', '{"action":"logout","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 02:46:05.967233+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa8f55db-44aa-45bc-a84a-191bb4475da4', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 02:46:19.081036+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e312627-d188-4ac7-be1d-70f9e46c95a7', '{"action":"logout","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 02:54:41.873566+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e54ca3d-d30c-44df-bf66-bd2b563ad31e', '{"action":"login","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 02:56:47.743955+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe31a6b3-656c-4846-8153-9b995e476b0c', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 07:02:34.926265+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e3f0f03-03b6-4e44-bc31-75ed7be84e6c', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 07:02:34.93599+00', ''),
	('00000000-0000-0000-0000-000000000000', '52e14364-3fe5-4446-9283-dba4de4c4d29', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 08:03:06.994758+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bcc38e1d-c51a-4d44-9a05-be49dfcbbda8', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 08:03:07.034626+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f7eb5a8-429e-445a-b17b-2d99a662088c', '{"action":"token_refreshed","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 09:32:25.649156+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dae3da82-266b-4564-990c-d95a879ec36e', '{"action":"token_revoked","actor_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 09:32:25.653374+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be3a0375-4f3e-4345-8667-ebb79457ae57', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hadegoldmedia@gmail.com","user_id":"0fb5bbca-281c-4a04-af4b-a65c20846cbf","user_phone":""}}', '2026-04-02 10:24:43.186818+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f78132e-5a67-4147-92bf-1f938c105d34', '{"action":"user_signedup","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-02 10:27:29.461332+00', ''),
	('00000000-0000-0000-0000-000000000000', '4389e802-fd3f-42bb-b92c-c1ead3c83e8d', '{"action":"login","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 10:27:29.478393+00', ''),
	('00000000-0000-0000-0000-000000000000', '16f0934c-fb6f-4590-aa68-773cda245716', '{"action":"logout","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 10:34:39.235883+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd52b149f-05a1-4b0c-88fc-db552e924a54', '{"action":"user_signedup","actor_id":"07b1ccd3-f6a3-4a07-bb92-990d5d117859","actor_username":"crownofgoldgold@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-02 10:36:54.88688+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f0756f5-4ff5-43be-807d-27090a5218fe', '{"action":"login","actor_id":"07b1ccd3-f6a3-4a07-bb92-990d5d117859","actor_username":"crownofgoldgold@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 10:36:54.925325+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd1a86b30-f629-4f5a-a938-ee5fdd666def', '{"action":"logout","actor_id":"07b1ccd3-f6a3-4a07-bb92-990d5d117859","actor_username":"crownofgoldgold@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-04-02 10:41:53.855541+00', ''),
	('00000000-0000-0000-0000-000000000000', '615620f9-8052-426f-a1f6-fe2bd82069fc', '{"action":"user_signedup","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-04-02 10:42:29.008252+00', ''),
	('00000000-0000-0000-0000-000000000000', '0af93029-7145-45c2-86f4-cbe58074e1e6', '{"action":"login","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 10:42:29.025892+00', ''),
	('00000000-0000-0000-0000-000000000000', '834a3d25-edc3-4d44-91bd-c3ce5656ad74', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 12:45:20.666358+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3030dec-cc38-4b83-82a6-6452a25c6c8f', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 12:45:20.67232+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc202d19-f9d0-4913-b401-8250a3e3c15d', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 13:44:03.708258+00', ''),
	('00000000-0000-0000-0000-000000000000', '7201b3ff-e373-419b-933f-e269d8711015', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 13:44:03.724204+00', ''),
	('00000000-0000-0000-0000-000000000000', '16f89bb8-a548-435e-83e0-5a43e184d90f', '{"action":"login","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-04-02 13:51:10.268747+00', ''),
	('00000000-0000-0000-0000-000000000000', '6998f1da-8cd3-4a07-8fde-05d2051803a1', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:46:43.497275+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c129318b-b511-432b-9401-3aa41d196ace', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:46:43.539894+00', ''),
	('00000000-0000-0000-0000-000000000000', '665bcc67-c76e-4453-ba77-6cbf072fdc5e', '{"action":"token_refreshed","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:51:06.943857+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0f32324-8004-4d44-bbd0-754e4a563f8e', '{"action":"token_revoked","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:51:06.997159+00', ''),
	('00000000-0000-0000-0000-000000000000', '17eacefa-825d-43bc-ad81-7e52b8e36e70', '{"action":"token_refreshed","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 14:57:15.703826+00', ''),
	('00000000-0000-0000-0000-000000000000', '3117b985-359f-43ef-b6c4-fe3bc7898175', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 15:46:06.145919+00', ''),
	('00000000-0000-0000-0000-000000000000', '05bd03ca-9e07-4e62-8a9a-a0e8afee599b', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 15:46:06.229694+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f1c2a15-8548-4330-b721-f862237d2c69', '{"action":"token_refreshed","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:11:38.98685+00', ''),
	('00000000-0000-0000-0000-000000000000', '53b28b2a-9080-4821-af82-099a20fcd64e', '{"action":"token_revoked","actor_id":"d7ed0783-834c-4266-8605-188854355f70","actor_username":"hadegoldmedia@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:11:39.00188+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bbd7278-00ee-4e66-b1d6-2f9b36dee281', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:49:35.461048+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e88ee2ee-fdb7-456d-ad81-4f3a75ac3c1b', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 16:49:35.678856+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd85fb61e-a9ee-4de4-a883-31896f11ace8', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 17:48:08.460626+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e83212f9-55e2-410f-9774-503f29a71c04', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 17:48:08.471373+00', ''),
	('00000000-0000-0000-0000-000000000000', '955682b0-6cdd-4644-8153-160054b2a0fc', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 18:54:43.639667+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3487796-5bb4-4d4f-97c0-1e3424be2431', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 18:54:43.653892+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da30a73a-b2f0-49bf-86cb-b4368c54ec0d', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 19:54:05.012266+00', ''),
	('00000000-0000-0000-0000-000000000000', 'beba0045-57fb-4fec-9fdf-cc19ad65cf69', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-02 19:54:05.016119+00', ''),
	('00000000-0000-0000-0000-000000000000', '32e2060f-325e-4171-8100-67afd6611a85', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 00:27:53.734759+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd7667b98-707e-4e4a-9643-4ee3b6e7edde', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 00:27:53.739975+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b097915c-35bc-4d8f-8c55-125a69917597', '{"action":"token_refreshed","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 01:36:53.048372+00', ''),
	('00000000-0000-0000-0000-000000000000', '021f5517-465f-49c4-8a5b-8e1c7ba57934', '{"action":"token_revoked","actor_id":"fb3851de-cc92-4f69-bac5-aa22ab18c98c","actor_username":"hhhhh@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-04-03 01:36:53.050662+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '07b1ccd3-f6a3-4a07-bb92-990d5d117859', 'authenticated', 'authenticated', 'crownofgoldgold@gmail.com', '$2a$10$vykgr723hWfxs.jufjfKs.GI5Fh8uUV6i3WszyXAT4RmFczOlV8TC', '2026-04-02 10:36:54.89063+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-04-02 10:36:54.934607+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "07b1ccd3-f6a3-4a07-bb92-990d5d117859", "email": "crownofgoldgold@gmail.com", "last_name": "Adegboyega", "first_name": "Aladewura", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 10:36:54.853763+00', '2026-04-02 10:36:54.974997+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd7ed0783-834c-4266-8605-188854355f70', 'authenticated', 'authenticated', 'hadegoldmedia@gmail.com', '$2a$10$ST/KQlnDi15Y4D8Gkasf2elGiL7yr.xboQXNwlbOYyBkJNQHxxaWW', '2026-04-02 10:27:29.463106+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-04-02 13:51:10.276169+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d7ed0783-834c-4266-8605-188854355f70", "email": "hadegoldmedia@gmail.com", "last_name": "gold", "first_name": "Ade", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 10:27:29.434947+00', '2026-04-02 16:11:39.042723+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'authenticated', 'authenticated', 'hhhhh@gmail.com', '$2a$10$dkTLotxSjYekEnFUCe6jVeVXr8zHq4FBERa4cR/dAAe8Rwfd7fYcu', '2026-04-02 10:42:29.009839+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-04-02 10:42:29.027273+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "fb3851de-cc92-4f69-bac5-aa22ab18c98c", "email": "hhhhh@gmail.com", "last_name": "de", "first_name": "ala", "email_verified": true, "phone_verified": false}', NULL, '2026-04-02 10:42:28.984431+00', '2026-04-03 01:36:53.057098+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('d7ed0783-834c-4266-8605-188854355f70', 'd7ed0783-834c-4266-8605-188854355f70', '{"sub": "d7ed0783-834c-4266-8605-188854355f70", "email": "hadegoldmedia@gmail.com", "last_name": "gold", "first_name": "Ade", "email_verified": false, "phone_verified": false}', 'email', '2026-04-02 10:27:29.456488+00', '2026-04-02 10:27:29.45653+00', '2026-04-02 10:27:29.45653+00', 'c170c9ba-197e-4aea-82ab-b36af92d69ea'),
	('07b1ccd3-f6a3-4a07-bb92-990d5d117859', '07b1ccd3-f6a3-4a07-bb92-990d5d117859', '{"sub": "07b1ccd3-f6a3-4a07-bb92-990d5d117859", "email": "crownofgoldgold@gmail.com", "last_name": "Adegboyega", "first_name": "Aladewura", "email_verified": false, "phone_verified": false}', 'email', '2026-04-02 10:36:54.87839+00', '2026-04-02 10:36:54.878427+00', '2026-04-02 10:36:54.878427+00', 'f233e538-7949-4b03-87fe-10808835a30f'),
	('fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', '{"sub": "fb3851de-cc92-4f69-bac5-aa22ab18c98c", "email": "hhhhh@gmail.com", "last_name": "de", "first_name": "ala", "email_verified": false, "phone_verified": false}', 'email', '2026-04-02 10:42:29.00124+00', '2026-04-02 10:42:29.00128+00', '2026-04-02 10:42:29.00128+00', 'b4c06faf-2c2d-4862-8be3-131d709d5c1e');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('bf1811cd-0205-4d04-b816-7659a84b14a4', 'd7ed0783-834c-4266-8605-188854355f70', '2026-04-02 13:51:10.276592+00', '2026-04-02 16:11:39.094356+00', NULL, 'aal1', NULL, '2026-04-02 16:11:39.093659', 'Next.js Middleware', '172.18.0.1', NULL, NULL, NULL, NULL, NULL),
	('f3515549-7016-4703-a96c-96698639a357', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', '2026-04-02 10:42:29.027579+00', '2026-04-03 01:36:53.060283+00', NULL, 'aal1', NULL, '2026-04-03 01:36:53.06022', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 OPR/129.0.0.0', '172.18.0.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('f3515549-7016-4703-a96c-96698639a357', '2026-04-02 10:42:29.036904+00', '2026-04-02 10:42:29.036904+00', 'password', '984d232e-857e-4efb-a12e-46620d78dc32'),
	('bf1811cd-0205-4d04-b816-7659a84b14a4', '2026-04-02 13:51:10.303259+00', '2026-04-02 13:51:10.303259+00', 'password', '8f84be89-1718-4fa7-9509-2e5e8ec9510a');


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

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 46, 'i6pbdsncbwws', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 15:46:06.269837+00', '2026-04-02 16:49:35.684692+00', 'ce56kad4e24m', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 48, 'dbqfd7ujqldc', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 16:49:35.883889+00', '2026-04-02 17:48:08.473637+00', 'i6pbdsncbwws', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 49, 'qfzot5gbyqcc', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 17:48:08.482348+00', '2026-04-02 18:54:43.655049+00', 'dbqfd7ujqldc', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 50, 'bkrwoc4qzyrx', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 18:54:43.660405+00', '2026-04-02 19:54:05.016664+00', 'qfzot5gbyqcc', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 51, 'vkaqs4piv2bd', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 19:54:05.020219+00', '2026-04-03 00:27:53.740968+00', 'bkrwoc4qzyrx', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 52, '52hehbgqoicq', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-03 00:27:53.746769+00', '2026-04-03 01:36:53.051399+00', 'vkaqs4piv2bd', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 53, 'iqhjo33ibf5e', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', false, '2026-04-03 01:36:53.054522+00', '2026-04-03 01:36:53.054522+00', '52hehbgqoicq', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 40, 'lgrk2bfmz2di', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 10:42:29.032811+00', '2026-04-02 12:45:20.673592+00', NULL, 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 41, 'wqxbev6sbfy3', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 12:45:20.680497+00', '2026-04-02 13:44:03.728037+00', 'lgrk2bfmz2di', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 42, 'kkpap6wewex2', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 13:44:03.748553+00', '2026-04-02 14:46:43.545185+00', 'wqxbev6sbfy3', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 43, 'swjyie5u4dzp', 'd7ed0783-834c-4266-8605-188854355f70', true, '2026-04-02 13:51:10.291344+00', '2026-04-02 14:51:06.998497+00', NULL, 'bf1811cd-0205-4d04-b816-7659a84b14a4'),
	('00000000-0000-0000-0000-000000000000', 44, 'ce56kad4e24m', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', true, '2026-04-02 14:46:43.587841+00', '2026-04-02 15:46:06.233741+00', 'kkpap6wewex2', 'f3515549-7016-4703-a96c-96698639a357'),
	('00000000-0000-0000-0000-000000000000', 45, '3tidirkjdmic', 'd7ed0783-834c-4266-8605-188854355f70', true, '2026-04-02 14:51:07.07521+00', '2026-04-02 16:11:39.00464+00', 'swjyie5u4dzp', 'bf1811cd-0205-4d04-b816-7659a84b14a4'),
	('00000000-0000-0000-0000-000000000000', 47, 'zzgolj2zkkov', 'd7ed0783-834c-4266-8605-188854355f70', false, '2026-04-02 16:11:39.014819+00', '2026-04-02 16:11:39.014819+00', '3tidirkjdmic', 'bf1811cd-0205-4d04-b816-7659a84b14a4');


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
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: coins; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."coins" ("symbol", "name", "icon", "color", "price", "networks") VALUES
	('BTC', 'Bitcoin', '₿', '#f7931a', 0, '{btc}'),
	('ETH', 'Ethereum', 'Ξ', '#627eea', 0, '{eth,usdterc20}'),
	('USDT', 'Tether', '$', '#26a17b', 0, '{usdttrc20,usdterc20,usdtbsc}'),
	('XRP', NULL, NULL, NULL, NULL, '{xrp}'),
	('BNB', NULL, NULL, NULL, NULL, '{bnbbsc}');


--
-- Data for Name: deposit_sessions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."notifications" ("id", "user_id", "text", "time", "read") VALUES
	('879adae1-9e39-4e58-bb5d-9ae618eb2b93', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Deposit of 500 PLUTO confirmed ✓', '2026-04-02 10:44:38.035905+00', true),
	('4c507fbd-54cb-4705-abcf-7fda18312e6c', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Staking reward credited: +12 PLUTO', '2026-04-02 10:44:38.035905+00', true),
	('2344619c-fa7c-40de-89bb-df06c07e6743', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Price alert: PLUTO up 3.2% today 📈', '2026-04-02 10:44:38.035905+00', true);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."profiles" ("id", "name", "email", "phone", "country", "created_at", "is_admin") VALUES
	('d7ed0783-834c-4266-8605-188854355f70', 'Ade gold', 'hadegoldmedia@gmail.com', '2348131198511', 'Nigeria', '2026-04-02 10:27:29.774359+00', false),
	('fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'ala de', 'hhhhh@gmail.com', '88777', 'uk', '2026-04-02 10:42:29.103075+00', false),
	('07b1ccd3-f6a3-4a07-bb92-990d5d117859', 'Aladewura Adegboyega', 'crownofgoldgold@gmail.com', '2348131198511', 'Nigeria', '2026-04-02 10:36:55.193547+00', true);


--
-- Data for Name: staking_plans; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."staking_plans" ("id", "name", "min_deposit", "max_deposit", "daily_profit", "apr", "duration_days", "referral_bonus", "notes", "created_at") VALUES
	('e62fa9c3-6f40-4161-b781-a4788feab97e', 'Premier Master', 500, 50000, 0.83, 25, 30, 0, '{}', '2026-04-02 14:26:13.09526+00'),
	('60c98ddb-a931-4f15-92e7-7b06a61ea9f6', 'Premier Token Trust', 50000, 150000, 1.0, 30, 30, 4, '{}', '2026-04-02 14:26:13.09526+00'),
	('d79692d8-3def-4dc6-82e4-d8ee61389104', 'Premier Cera', 150000, 300000, 1.2, 36, 30, 6, '{}', '2026-04-02 14:26:13.09526+00'),
	('f0a1e40b-7fa6-4a46-a972-42c9bb9a3921', 'Premier Defi', 300000, 500000, 1.5, 45, 30, 8, '{}', '2026-04-02 14:26:13.09526+00'),
	('1ac919ae-d9b3-4cf4-9017-383a4b1b1997', 'Premier Master Hall of Fame', 500000, NULL, 2.0, 720, 360, 10, '{}', '2026-04-02 14:26:13.09526+00'),
	('459f2142-c3a7-42b1-8f16-0ba7903fc962', 'Premier NFP', 100000, NULL, NULL, NULL, NULL, 0, '{"35% – 50% Single Day Trade","51% – 80% Twin Trade","Trade every last Friday of the month"}', '2026-04-02 14:26:13.09526+00'),
	('58429dec-69b5-4e31-a18b-b1e8fbaeb1d3', 'Business Cooperative', 200000, NULL, 1.3, 39, 30, 0, '{"0.3% daily bonus to private account","5% bonus on deposits above 50k","Partnership in Token Global"}', '2026-04-02 14:26:13.09526+00');


--
-- Data for Name: staking_positions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."staking_positions" ("id", "user_id", "amount", "earned", "apy", "lock_days", "days_left", "progress", "created_at", "plan_id", "status", "end_date") VALUES
	('c8efecd5-b5ba-47bb-999e-52948e2e636c', 'd7ed0783-834c-4266-8605-188854355f70', 10000, 10, 36, 30, 29, 1, '2026-04-02 14:56:28.212479+00', NULL, 'active', '2026-04-29 00:00:00+00'),
	('491e7951-8c00-42c6-9a51-fd8a508fe001', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 10000, 30, 36, 30, 30, 0, '2026-04-02 15:50:37.218251+00', NULL, 'active', NULL),
	('84fdc4e3-e303-471f-9165-760fafc54c31', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 10000, 10, 36, 30, 30, 0, '2026-04-02 14:54:13.723783+00', '1ac919ae-d9b3-4cf4-9017-383a4b1b1997', 'active', '2026-04-29 00:00:00+00'),
	('f8d52757-2aa2-4c8b-9957-34abe4dd6029', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 10000, 7, 36, 30, 30, 0, '2026-04-02 15:49:40.061296+00', '60c98ddb-a931-4f15-92e7-7b06a61ea9f6', 'active', '2026-05-10 22:59:59+00');


--
-- Data for Name: swap_rates; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."swap_rates" ("from_coin", "to_coin", "rate") VALUES
	('BTC', 'PLUTO', 10000),
	('BTC', 'ETH', 17.2),
	('BTC', 'USDT', 67500),
	('ETH', 'PLUTO', 582),
	('ETH', 'BTC', 0.058),
	('ETH', 'USDT', 3880),
	('PLUTO', 'BTC', 0.0001),
	('PLUTO', 'ETH', 0.00172),
	('PLUTO', 'USDT', 0.2),
	('USDT', 'PLUTO', 5),
	('USDT', 'BTC', 1.48e-05),
	('USDT', 'ETH', 0.000258);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."transactions" ("id", "user_id", "type", "coin", "amount", "usd", "from_addr", "hash", "status", "direction", "created_at", "metadata", "gateway", "session_id") VALUES
	('95411979-5617-4353-91de-a02ded924950', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Deposit', 'POLYC', 500, 100, '0xExternalWallet123', '0ab65e0d-ff1c-46a8-a6eb-40383fc72691', 'confirmed', 'in', '2026-04-02 13:10:18.911629+00', NULL, NULL, NULL),
	('fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Deposit', 'POLYC', 500, 100, '0xExternalWallet123', 'eca7689a-8532-4fc3-b852-70bf923902e7', 'confirmed', 'in', '2026-04-02 13:12:50.925014+00', NULL, NULL, NULL),
	('7302cc4d-2a71-4007-a367-89c764c3082e', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'Swap', 'POLYC', 100, 20, '0xUserPOLYCWallet', 'e8c6dc2e-2c36-4389-8e14-b36667de331b', 'confirmed', 'out', '2026-04-02 13:14:49.562386+00', NULL, NULL, NULL),
	('50470c0c-5201-4185-95b3-23ac267acedb', 'd7ed0783-834c-4266-8605-188854355f70', 'Swap', 'POLYC', 100, 20, '0xUserPOLYCWallet', 'ff575c18-284c-490d-b3ae-0658dfda0afb', 'confirmed', 'out', '2026-04-02 13:53:59.523862+00', NULL, NULL, NULL);


--
-- Data for Name: wallets; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."wallets" ("id", "user_id", "symbol", "amount", "usd_value", "price", "change_pct", "created_at", "address") VALUES
	('373f84eb-48b9-48ba-8d67-7d835343a818', 'd7ed0783-834c-4266-8605-188854355f70', 'POLYC', 0, 0, 0.2, 0, NULL, '0x1374009dac8c48091c6ce4615f585f44f56506f9'),
	('8ac34a52-ca64-423c-813b-84758e239b99', '07b1ccd3-f6a3-4a07-bb92-990d5d117859', 'POLYC', 700, 500, 0.2, 0, NULL, '0x1c2fe6a6cbd43eebf20785b3bfbb7a724ed7457c'),
	('89c152c9-30f1-49fb-88c6-14f39b97bcb4', 'fb3851de-cc92-4f69-bac5-aa22ab18c98c', 'POLYC', 500, 80, 0.2, 0, NULL, '0x2596d12f7f0e0e7dedb2609f8ae76ab5024dcfe1');


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
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 53, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict syJjjaNmqt60h6q3FPwsiCh7avzy02HyjJC4y4OMQA5g91eUgbF6nLmdbDgV9da

RESET ALL;
