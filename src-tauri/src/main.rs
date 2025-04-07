// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;

#[tauri::command]
fn create_tables() -> Result<(), String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::create_tables(&conn).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn create_collection(name: String) -> Result<(), String> {
    let conn = database::establish_connection().map_err(|e| e.to_string())?;
    database::insert_collection(&conn, &name).map_err(|e| e.to_string())?;
    Ok(())
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            create_tables,
            create_collection,
            list_collections,
            delete_collection
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
