let users = [
    {
        "nick": "Nikita",
        "password": "1111111aA.",
        "email": "nikitasidarenko@gmail.com",
        "telephone": "+375 (29) 234-97-23",
        "birth_date": "2004/10/1",
        "first_name": "Nikita",
        "last_name": "Sidarenko",
        "middle_name": ""
    },
    {
        "nick": "neff112",
        "password": "ny0_8CFx0ZEb79,5qK49",
        "email": "bulubak@gmail.com",
        "telephone": "+375 (29) 441-34-32",
        "birth_date": "2004/02/10",
        "first_name": "Алексей",
        "last_name": "Смиронов",
        "middle_name": "Васильевич"
    }
]

phone = String(users[0].telephone).replaceAll(" ", "").replaceAll("-", "").replace("(", "").replace(")", "");

console.log(phone);
