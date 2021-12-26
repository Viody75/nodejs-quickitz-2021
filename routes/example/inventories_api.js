const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'public/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const authUser = require('../../middlewares/auth_users');
const imgViewerController = require('../../controllers/img_viewer');
const invApiController = require('../../controllers/inv_api_controller');
const { route } = require('.');

router.get('/getinventories', invApiController.getInventories);

router.get('/getinputedinventories', authUser, invApiController.getInputedInv);

router.post('/addinventory', authUser, invApiController.addItemInv);

// const mwUploader = require('../../controllers/uploader');
// router.post('/addinvphoto', upload.single('image'), mwUploader.single);

router.post('/addinvphoto', authUser, upload.single('image'), invApiController.addItemInvPhoto);

router.get('view-img', imgViewerController.getImgToView);

router.post('/updateinventory', authUser, invApiController.updateItemInv);

module.exports = router