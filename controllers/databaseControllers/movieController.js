
const config = require("../config/config.json");
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new Sequelize(dbConfig);

// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     storage: '../dev.mysql'
// });

const Movie = require('../models/movie')(sequelize, Sequelize);
exports.sequelize = sequelize
exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllMovies = async () => {
    return Movie.findAll();
};

exports.getMovieById = async (id) => {
    // const id = req.params.id;
    return Movie.findByPk(id);
    try {
        const movie = await Movie.findByPk(id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const [rowsUpdated, [updatedMovie]] = await Movie.update(req.body, {
            where: { id },
            returning: true,
        });
        if (rowsUpdated === 0) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.json(updatedMovie);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const rowsDeleted = await Movie.destroy({ where: { id } });
        if (rowsDeleted === 0) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.json({ message: 'Movie deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};