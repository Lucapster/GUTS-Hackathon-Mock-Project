//Welcome to the database connection site. All aboard! 
//P.S. we are using pool here because we dont want to initiate a connection each time we make a query for separate classes.

import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'placeholder',
  database: 'SongFinder',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

/* DATABASE STRUCTURE:
MariaDB [SongFinder]> describe playlist;
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| playlist_id   | int(11)      | NO   | PRI | NULL    | auto_increment |
| playlist_name | varchar(255) | NO   |     | NULL    |                |
| user_id       | int(11)      | NO   | MUL | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+

MariaDB [SongFinder]> describe song;
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| song_id     | int(11)     | NO   | PRI | NULL    | auto_increment |
| title       | varchar(50) | NO   |     | NULL    |                |
| artists     | varchar(50) | NO   |     | NULL    |                |
| duration    | int(11)     | NO   |     | NULL    |                |
| popularity  | int(11)     | YES  |     | NULL    |                |
| album       | varchar(50) | YES  |     | NULL    |                |
| is_explicit | tinyint(1)  | NO   |     | NULL    |                |
+-------------+-------------+------+-----+---------+----------------+

MariaDB [SongFinder]> describe playlist_song;
+----------------+---------+------+-----+---------+-------+
| Field          | Type    | Null | Key | Default | Extra |
+----------------+---------+------+-----+---------+-------+
| playlist_id    | int(11) | NO   | PRI | NULL    |       |
| song_id        | int(11) | NO   | PRI | NULL    |       |
| playlist_index | int(11) | YES  |     | NULL    |       |
+----------------+---------+------+-----+---------+-------+

*/
