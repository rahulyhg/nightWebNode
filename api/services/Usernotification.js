/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        index: true
    },
    starttime: Date,
    endtime: Date,
    creationtime: Date,
    modificationtime: Date,
    status: String,
});

module.exports = mongoose.model('Usernotification', schema);

var models = {
    //create
    create: function (data, callback) {
        var usernotification = this(data);
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data, callback);
        } else {
            usernotification.save(function (err, data2) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, data2);
                }
            });
        }
    },
    // viewall
    viewAll: function (data, callback) {
        this.find().exec(callback);
    },
    //    view one

    view: function (data, callback) {
        this.findOne({
            "_id": data._id
        }).exec(callback);
    },
    // delete

    delete: function (data, callback) {
        this.findOneAndRemove({
            _id: data._id
        }, function (err, data) {

            if (err) {
                callback(err, false);
            } else {
                callback(null, data);
            }
        });
    },

    // view by user

    viewByUser: function (data, callback) {
        this.findOne({
            "user": data.user
        }).populate('User').exec(callback);
    },
    findlimited: function (data, callback) {
        var newreturns = {};
        newreturns.data = [];
        var check = new RegExp(data.search, "i");
        var sort = {};
        data.sortnum = parseInt(data.sortnum);
        sort[data.sort] = data.sortnum; //sort in ascending
        data.pagenumber = parseInt(data.pagenumber);
        data.pagesize = parseInt(data.pagesize);
        async.parallel([
                function (callback) {
                    Usernotification.count({
                        status: {
                            '$regex': check
                        }
                    }).exec(function (err, number) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (number && number != "") {
                            newreturns.total = number;
                            newreturns.totalpages = Math.ceil(number / data.pagesize);
                            newreturns.pageno = data.pagenumber;
                            callback(null, newreturns);
                        } else {
                            callback(null, newreturns);
                        }
                    });
                },
                function (callback) {
                    Usernotification.find({
                        status: {
                            '$regex': check
                        }
                    }, { sort: sort }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function (err, data2) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (data2 && data2.length > 0) {
                            newreturns.data = data2;
                            callback(null, newreturns);
                        } else {
                            callback(null, newreturns);
                        }
                    });
                }
            ],
            function (err, data4) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (data4) {
                    callback(null, newreturns);
                } else {
                    callback(null, newreturns);
                }
            });
    },
};
module.exports = _.assign(module.exports, models);
