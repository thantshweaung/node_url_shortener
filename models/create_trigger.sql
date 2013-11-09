/* テベールを作成クエリ　*/
CREATE TABLE urls
(
  id serial NOT NULL,
  short_url text NOT NULL,
  long_url text NOT NULL,
  create_date date,
  CONSTRAINT url_primary_id PRIMARY KEY (id)
)
WITH (OIDS=FALSE);
ALTER TABLE urls OWNER TO root;

/* 今時間を入って機能　*/
create function add_date_trigger_func()
returns trigger as '
BEGIN 
	UPDATE urls SET create_date = CURRENT_DATE WHERE id = (SELECT MAX(id) FROM urls);
	RETURN null;
END' LANGUAGE 'plpgsql'

/* 今時間を入って機能を削除クエリ */
drop function add_date_trigger_func() cascade;

/* TRIGGERを作成方法　*/
CREATE TRIGGER add_date_trig 
AFTER INSERT ON urls
FOR EACH ROW EXECUTE PROCEDURE add_date_trigger_func();
