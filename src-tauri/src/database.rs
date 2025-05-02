use rusqlite::{params, Connection, Result};

pub fn establish_connection() -> Result<Connection> {
    // O caminho do banco de dados pode ser qualquer caminho relativo ou absoluto
    let conn = Connection::open("my_database.db")?;
    Ok(conn)
}

pub fn create_tables(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS collections (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )",
        [],
    )?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY,
            word TEXT NOT NULL,
            definition TEXT NOT NULL,
            collection_id INTEGER NOT NULL,
            FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
        )",
        [],
    )?;
    Ok(())
}

pub fn insert_collection(conn: &Connection, name: &str) -> Result<(i64, String)> {
    conn.execute("INSERT INTO collections (name) VALUES (?1)", params![name])?;
    let id = conn.last_insert_rowid();
    Ok((id, name.to_string()))
}

pub fn delete_collection(conn: &Connection, collection_id: i32) -> Result<usize> {
    conn.execute(
        "DELETE FROM collections WHERE id = ?1",
        params![collection_id],
    )
}

pub fn get_collections(conn: &Connection) -> Result<Vec<(i32, String)>> {
    let mut stmt = conn.prepare("SELECT id, name FROM collections")?;
    let collection_iter = stmt.query_map([], |row| Ok((row.get(0)?, row.get(1)?)))?;

    let mut collections = Vec::new();
    for collection in collection_iter {
        let (id, name) = collection?;
        collections.push((id, name));
    }

    Ok(collections)
}

pub fn insert_word(
    conn: &Connection,
    word: &str,
    definition: &str,
    collection_id: i32,
) -> Result<usize> {
    conn.execute(
        "INSERT INTO words (word, definition, collection_id) VALUES (?1, ?2, ?3)",
        params![word, definition, collection_id],
    )
}

pub fn delete_word(conn: &Connection, word_id: i32) -> Result<usize> {
    conn.execute("DELETE FROM words WHERE id = ?1", params![word_id])
}

pub fn get_words(conn: &Connection, collection_id: i32) -> Result<Vec<(i32, String, String, i32)>> {
    let mut stmt = conn.prepare(
        "SELECT id, word, definition, collection_id FROM words WHERE collection_id = ?1",
    )?;
    let word_iter = stmt.query_map(params![collection_id], |row| {
        Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?))
    })?;

    let mut words = Vec::new();
    for word in word_iter {
        let (id, word, definition, colletion_id) = word?;
        words.push((id, word, definition, colletion_id));
    }

    Ok(words)
}
