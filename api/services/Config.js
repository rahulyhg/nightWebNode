/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    GlobalCallback: function(err, data, res) {
    if (err) {
        res.json({
            error: err,
            value: false
        });
    } else {
        res.json({
            data: data,
            value: true
        });
    }
    }
};