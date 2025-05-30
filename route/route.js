
const router = express.Router();
const controller = require('../controller/controller.js');

router.post('/login', controller.login);
router.post('/register', controller.signup);

