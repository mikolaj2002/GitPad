Jak wlaczyc poradnik:
1. npm i
2. npm start
3. w przegladarce localhost:3000
4. jak nie dziala to "lipa"

Baza Danych:
1. mieć mysql
2. w pliku config/config.json ustawić swój "username" i "password" aby móc wejść do mysql (jeśli nie ma hasła, to hasło to null)

Metody z bazy danch są wyeksportowane, dodanych zostanie więcej. Metody są asynchroniczne, więc trzeba je umieszczać w asynchronicznych funkcjach i dodawać "await". Przykład: Chcemy wyświetlić wszystkich użytkowników:
#################
const { getAllUsers } = require('./controllers/databaseControllers/userController');
async function printAllUsers(){
    const users = await getAllUsers()
    console.log(users)
}
printAllUsers()
#################

Komendy aby stworzyć bazę, tabele i dane testowe:
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

Bazę można usunąć poleceniem:
npx sequelize-cli db:drop