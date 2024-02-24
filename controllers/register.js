const connection = require('../config/databaseconnect')

const OnGetRegister = (req, res) => {
    const data = {
        FirstName: "",
        LastName: "",
        Email: "",
        UserName: "",
        DateOfBirth: "",
        Password: "",
        ConfirmPassword: "",
    }
    res.render('register', { layout: 'default', inputData:data });
}

const OnPostRegister = (req, res) => {
    const { FirstName, LastName, Email, DateOfBirth, UserName, Password, ConfirmPassword } = req.body;
    const data = {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        UserName: Email,
        DateOfBirth: DateOfBirth,
        Password: Password,
        ConfirmPassword: ConfirmPassword,
    }
    const SQL = "SELECT * FROM users WHERE Email=?;";
    connection.query(SQL, [Email], function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
            return res.render("register", {
                msg: "Email id already Taken",
                msg_type: "alert alert-danger",
                inputData:data
            });
        } else if (Password !== ConfirmPassword) {
            return res.render("register", {
                msg: "Password do not match",
                msg_type: "alert alert-danger",
                inputData:data
            });
        }

        const sqlInsertQuery = "INSERT INTO users (FirstName, LastName, Email, DateOfBirth, UserName, Password) VALUES (?, ?, ?, ?, ?, ?);";
        connection.query(sqlInsertQuery, [FirstName, LastName, Email, DateOfBirth, UserName, Password], function (usr_err, insert_result) {
            if (usr_err) {
                return res.render("register", {
                    msg: "Something went wrong:  " + usr_err,
                    msg_type: "alert alert-danger",
                    inputData:data
                });
            } else {
                return res.render("register", {
                    msg: "User Registration Success",
                    msg_type: "alert alert-success"
                });
            }
        })
    });
}

module.exports = { OnGetRegister, OnPostRegister };