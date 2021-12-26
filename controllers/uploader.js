const fs = require('fs');
const {
    getValidExtension,
    randomFilename,
    saveImage
} = require('../middlewares/uploader');

exports.single = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(422).json({ message: `File tidak ditemukan.` });
        }

        const extension = await getValidExtension(req.file.originalname);
        if (!extension) {
            fs.unlinkSync(req.file.path);
            return res.status(422).json({ message: `Format file tidak valid.` });
        }

        const filename = await randomFilename(16);
        const pathFrom = req.file.path;
        const pathTo = `public/images/${filename}.${extension}`;
        saveImage(pathFrom, pathTo);

        const response = {
            message: 'Upload berhasil.',
            image_path: pathTo
        }

        return res.json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}