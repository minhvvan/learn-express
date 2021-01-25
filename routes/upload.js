const { Router } = require('express');
const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

try{
    fs.readdirSync('../uploads');
}catch(err){
    console.error(err);
    fs.mkdirSync('../uploads');
}

const upload = multer({
	storage: multer.diskStorage({
    	destination(req, file, done){
        	done(null, 'uploads/');
        },
        filename(req, file, done){
        	const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../multipart.html'));
});

router.post('/',
    upload.fields([{name: 'image1'}, {name: 'image2'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);

module.exports = router;