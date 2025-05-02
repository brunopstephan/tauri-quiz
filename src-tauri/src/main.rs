// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;

#[tauri::command]
fn create_tables() -> Result<(), String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::create_tables(&conn).map_err(|e| e.to_string())?;
    Ok(())
}

/* #[tauri::command]
fn create_collection(name: String) -> Result<(), String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::insert_collection(&conn, &name).map_err(|e| e.to_string())?;
    Ok(())
} */

#[tauri::command]
fn create_collection(name: String) -> Result<(i64, String), String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    /* let collection_id =  *//* database::insert_collection(&conn, &name).map_err(|e| e.to_string())?; */
    database::insert_collection(&conn, &name).map_err(|e| e.to_string())
    /* Ok(collection_id) */
}

#[tauri::command]
fn delete_collection(id: i32) -> Result<(), String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::delete_collection(&conn, id).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn list_collections() -> Result<Vec<(i32, String)>, String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::get_collections(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
fn insert_word(word: String, definition: String, collection_id: i32) -> Result<i32, String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::insert_word(&conn, &word, &definition, collection_id)
        .map(|id| id as i32)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_word(word_id: i32) -> Result<(), String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::delete_word(&conn, word_id).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_words(collection_id: i32) -> Result<Vec<(i32, String, String, i32)>, String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::get_words(&conn, collection_id).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            create_tables,
            create_collection,
            list_collections,
            delete_collection,
            insert_word,
            delete_word,
            get_words
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
