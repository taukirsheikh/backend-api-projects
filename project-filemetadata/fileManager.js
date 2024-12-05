const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Ensure the `uploads` directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${path.extname(file.originalname)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    },
});

const upload = multer({ storage: storage });

const fileManager = async (req, res) => {
    try {
        // Middleware to handle file upload
        upload.single('upfile')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // Check if file was uploaded
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Respond with file details
            res.json({
                name: req.file.originalname,
                type: req.file.mimetype,
                size: req.file.size,
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = fileManager;
