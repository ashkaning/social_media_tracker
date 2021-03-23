const bcrypt = require('bcrypt');
const db = require('../models');
const dotenv = require('dotenv');
const stripe = require('stripe')(dotenv.STRIPE_CLI_KEY);
module.exports = {

    createSession: (req, res) => {
        const session = stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                { price: req.body.priceId, quantity: 1 },
            ],
        }).then(res=>{
            console.log(res)

        }).catch(err=>console.log(err))
    }
}