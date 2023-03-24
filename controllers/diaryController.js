const Diary = require("../models/Diary.js");

async function index(req, res) {
    try {
        const snacks = await Diary.getAll();
        res.status(200).json(snacks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const diary = await Diary.getOneById(id);
        res.status(200).json(diary);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function getMostRecent(req, res) {
    try {
        const id = parseInt(req.params.id);
        const snack = await Diary.getTopSnack(id);
        res.status(200).json(snack);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const diary = await Diary.create(data);
        res.json(diary);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        console.log(req.body);
        const id = parseInt(req.params.id);
        const diary = await Diary.getOneById(id);
        const data = req.body;
        const result = await diary.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const snack = await Diary.getOneById(id);
        const result = await snack.destroy();
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = {
    index,
    show,
    getMostRecent,
    create,
    destroy,
    update,
};
