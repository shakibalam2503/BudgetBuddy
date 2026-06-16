const JWT_SECRET = process.env.JWT_SECRET || 'budgetbuddy_secret_key_change_me_in_prod';
const PORT = process.env.PORT || 5000;

module.exports = {
    JWT_SECRET,
    PORT
};
