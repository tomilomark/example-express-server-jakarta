const express = require('express');
const {staffController} = require('./ports/rest/staff.controllers.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/staff', staffController)

/**
 * The error handling should be implemented as specific class with strong logic.
 * Should be able to handle different types of errors (DB, validation, uncached errors, etc.)
 */
app.use((err, req, res, next) => {
    return res.status(500).json({
        error: {
            message: err.message
        }
    })
})

app.listen(process.env.HTTP_PORT, () => {
    console.log(`Service is running on the ${process.env.HTTP_PORT} port`);
});
