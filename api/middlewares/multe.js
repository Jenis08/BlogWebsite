import multer from "multer";
const uploadMiddleware = multer({ dest: 'uploads/' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname ,'uploads')));
