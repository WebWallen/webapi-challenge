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

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'No such project' })
            }
        })
        .catch(err => res.status(500).json({
            message: 'Error retrieving the project'
        }))
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (req.params.id) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({ 
                    message: 'Project not found.'
                })
            }
        })
        .catch(err => res.status(500).json({
            message: 'Failed to get actions.'
        }))
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id) 
        .then(project => {
            if (!project) {
                res.status(404).json({
                    message: 'No such project.'
                })
            } else {
                res.status(200).json({
                    message: 'Project removed.'
                })
            }
        })
        .catch(err => res.status(500).json({
            message: 'Failed to remove project.'
        }))
})

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: 'Provide a name and description.'
        })
    } else {
        Projects.update(req.params.id, req.body)
            .then(project => {
                if (project) {
                    res.status(200).json({
                        ...req.body.id,
                        id: req.params.id
                    })
                } else {
                    res.status(404).json({
                        message: 'No such project.'
                    })
                }
            })
            .catch(err => res.status(500).json({
                message: 'Failed to update project.'
            }))
    }
});

module.exports = router;