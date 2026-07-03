const res = {
    data: {
        users: [
            {name: "ALice", email: "alice@test.com"},
            {name: "Bob", email: "bob@test.com"},
            {name: "Charlie", email: "charlie@test.com"}
        ]
    }
};
//in name phan tu thu 3 trong mang users
console.log(res.data.users[2].name);
console.log(res.data.users[0].email);

//in tat ca user trong mang users

res.data.users.forEach(u => {
  console.log(u.name);
});

function getAllNames(res) {
    return res.data.users.map(u => u.name);
};
console.log(getAllNames(res));

function getAllUsers(res) {
    return res.data.users.map(u => u.email);
};
console.log(getAllUsers(res));

function getAllEmail(res) {
    return res.data.users.map(u => u.email);
}
console.log(getAllEmail(res));
