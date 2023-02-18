var express = require('express');
const NewsController = require('../app/controllers/NewsController');
var router = express.Router();

router.post ('/listnews/handle-form-action', NewsController.handleFormAction)

router.post('/listnews', NewsController.restoreTrashAll)

router.delete('/trash', NewsController.deleteTrashAll)

// router.post('/listnews/:id', NewsController.restoreTrash) dùng post hay patch đều được
router.patch('/listnews/:id', NewsController.restoreTrash)

router.delete('/trash/:id', NewsController.deleteTrash)

router.delete('/:id', NewsController.deleteList)

router.put('/:id', NewsController.update)

router.get('/:id/edit', NewsController.edit)

router.get('/trash', NewsController.trash)

router.get('/create', NewsController.create);

router.get('/listnews', NewsController.listnews);

router.post('/store', NewsController.store);

router.get('/:slug' ,NewsController.show);

module.exports = router;
