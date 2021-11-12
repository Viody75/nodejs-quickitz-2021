var localDbConn = require('../lib/localhost_db');
var apiControls = require('../lib/api_controls');

exports.getbooks = function (req, res) {
    console.log('Hit local API from controller : /books2');

    localDbConn.query('SELECT * FROM books ORDER BY id desc', function (err, rows) {

        if (err) {
            // req.flash('error', err);
            console.log(err);
        } else {
            apiControls.success(rows, res)
        }
    });
}

exports.addbook = function (req, res) {

    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            name: name,
            author: author
        }

        // insert query
        localDbConn.query('INSERT INTO books SET ?', form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                // req.flash('error', err)
                apiControls.failed(err, res);

            } else {
                apiControls.createSuccess(result, res, form_data);
            }
        });
    }
};

exports.updatebook = function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    // if no error
    if (!errors) {

        var form_data = {
            name: name,
            author: author
        }
        // update query
        localDbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function (err, result) {
            //if(err) throw err
            if (err) {
                apiControls.failed(err, res);
            } else {
                apiControls.updateSuccess(result, res, form_data);
            }
        });
    }
}

exports.deletebook = function (req, res) {
    let id = req.body.id;

    localDbConn.query('DELETE FROM books WHERE id = ' + id, function (err, result) {
        //if(err) throw err
        if (err) {
            apiControls.failed(err, res);
        } else {
            apiControls.deleteSuccess(result, res);
        }
    });
}