const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => res.status(500).json({ 
        message: 'Failed to retrieve projects',
    }))
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            if (!req.body.name || !req.body.description) {
                res.status(400).json({
                    message: 'Need name and description.'
                })
            } else {
                res.status(201).json(project)
            }
        })
        .catch(err => res.status(500).json({
            message: 'Failed to save new project.'
        }))
});

module.exports = router;