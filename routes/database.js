const express = require('express');
const router = express.Router();
const { getNovelsWithTitleContaining, getNovelById, getChaptersOfNovel, getChapterContent, publishNovel, getNovelStats, getUserUID } = require('../controllers/databaseControllers/novelController');
const { getUserStats } = require('../controllers/databaseControllers/userController');

// poniżej zapytania o bazę danych do serwera
router.post('/novelsByTitle',getNovelsWithTitleContaining)
router.post('/chaptersOfNovel',getChaptersOfNovel)
router.post('/novelById',getNovelById)
router.post('/getChapterContent',getChapterContent)
router.post('/publishNovel',publishNovel)
router.post('/userStats',getUserStats)
router.post('/novelStats',getNovelStats)
router.post('/getUserUID',getUserUID)


module.exports = {
    router,
}