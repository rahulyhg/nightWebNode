/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
    register: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
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
        };
        if (req.body) {
            req.body.status = 1;
            User.register(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    ///////////////////////////////
    login: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                req.session.save();
                res.json({
                    data: data,
                    value: true
                });
            }
        };
        Passport.authenticate('local', {
            failureRedirect: '/login'
        }, callback)(req, res);
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                res.json({
                    value: false,
                    error: err
                });
            } else {
                res.json({
                    value: true
                });
            }
        });
    },
    profile: function(req, res) {
        var user = req.session.user;
        if (user) {
            res.json(user);
        } else {
            res.json({
                value: false
            });
        }
    },
    loginFacebook: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: data,
                            value: true
                        });
                    }
                });
            }
        };
        Passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email']
        }, callback)(req, res);
    },
    loginTwitter: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: data,
                            value: true
                        });
                    }
                });
            }
        };
        Passport.authenticate('twitter', {}, callback)(req, res);
    },
    loginGoogle: function(req, res) {
        Passport.authenticate('google', {
            scope: ['openid', 'profile', 'email']
        })(req, res);
    },
    loginGoogleCallback: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: data,
                            value: true
                        });
                    }
                });
            }
        };
        Passport.authenticate('google', {
            failureRedirect: '/login'
        }, callback)(req, res);
    },
    loginGithub: function(req, res) {
        Passport.authenticate('github', {
            scope: 'public_repo'
        })(req, res);
    },
    loginGithubCallback: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            data: data,
                            value: true
                        });
                    }
                });
            }
        };
        Passport.authenticate('github', {
            failureRedirect: '/login'
        }, callback)(req, res);
    },
    create: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            User.create(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    delete: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                User.delete(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    viewAll: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            User.viewAll(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    view: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                User.view(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    findlimited: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body.pagesize && re.body.pagesize != "" && req.body.pagesize && re.body.pagesize != "") {
                User.findlimited(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    forgotPassword: function(req, res) {
        if (req.body) {
            if (req.body.email && req.body.email != "") {
                User.forgotPassword(req.body, res.callback);
            } else {
                res.json({
                    value: false,
                    data: "Please provide email-id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    }
};
