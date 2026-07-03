const res = {
    status: 400,
    data: {
        user: {
            name: "LilyA",
            email: "lilya@test.com"
        }
    }
};
//console.log(res);
console.log(res.status);
//console.log(res.data);
//console.log(res.data.user);
console.log(res.data.user.name);
console.log(res.data.user.email);

function getStatus(res) {
    return res.status;
}
console.log(getStatus(res));

function getUser(res) {
    return res.data.user;
}
console.log(getUser(res));

function getEmail(res) {
    return res.data.user.email;
}
console.log(getEmail(res));

function getName(res) {
    return res.data.user.name;
}
console.log(getName(res));