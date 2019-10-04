const express = require('express');
const Actions = require ('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => res.status(500).json({ 
        message: 'Failed to retrieve actions',
    }))
});

router.post('/', (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            if (!req.body.notes || !req.body.description) {
                res.status(400).json({
                    message: 'Need notes and description.'
                })
            } else {
                res.status(201).json(action)
            }
        })
        .catch(err => res.status(500).json({
            message: 'Failed to save new action.'
        }))
});

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: 'No such action' })
            }
        })
        .catch(err => res.status(500).json({
            message: 'Error retrieving the action'
        }))
});



module.exports = router;