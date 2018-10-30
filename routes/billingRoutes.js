const keys = require('../config/keys');
const stripe = require('stripe')(
    keys.stripeSecretKey
);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        let ccInfo = req.body;
        
        let charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'Emaily Credits',
            source: ccInfo.id
        });

        //thanks to passport, user info is
        req.user.credits += 5;
        let updatedUser = await req.user.save();

        res.send(updatedUser);
    });
}