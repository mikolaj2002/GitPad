// funkcja pozwala zapytać serwer o informację z bazy danych
// odpowiednie zapytania w pliku routes/database.js

/**
 * 
 * @param {string} postName nazwa zapytana, w pliku routes/database.js (np '/novelsByTitle')
 * @param {JSON} data dane w formacie JSON, zależne od zapytania (pisać do mnie w razie pytań)
 * @param {Function} onResponse funkcja jednoelementowa, co zrobić gdy dostaniemy informację zwrotną 
 */ 

export function send(postName, data, onResponse){
    let payload = JSON.stringify(data);
    let xhr = new XMLHttpRequest();
    xhr.open('POST',postName);
    xhr.setRequestHeader('Content-Type','application/json   ');
    xhr.onreadystatechange = () => { if(xhr.readyState == XMLHttpRequest.DONE){
        console.log(JSON.parse(xhr.responseText));
        onResponse(JSON.parse(xhr.responseText));
    }}
    xhr.send(payload);
}