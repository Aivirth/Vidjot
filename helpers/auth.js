module.exports = {
    ensureAuthenticated : function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('err_msg', 'Not authorized');
            res.redirect('/users/login');
        }
    }
}