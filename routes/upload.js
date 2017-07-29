var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
        return cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname +'-'+ file.originalname);
    }
});

//multer settings store file
var upload = multer({
    storage: storage
}).single('file');

router.post('/upload', function(req, res) {
    upload(req, res, function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
        }
        var path = './uploads/'+req.file.fieldname + '-' +req.file.originalname;

        fs.readFile(path,{encoding:'utf8'},function(err, data) {

            if(err)
                throw err;
            var objparse = JSON.parse(data);
            res.json(objparse);
        })
    });
});

module.exports = router;