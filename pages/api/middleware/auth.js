import jwt from 'jsonwebtoken';
const JWT_SECRET = 'ABC123'

const auth = (req, res, next) => {

    const { cookies } = req;

    const token = cookies.access_token;

    if (!token) {
        res.send({
            message: 'Unauthorized ? Please use the valid token'
        });
    } else {
        try {
            const { user_id } = jwt.verify(token, JWT_SECRET);
            req.user = user_id;
        } catch (error) {
            res.send({
                message: 'Unauthorized ? Please use the valid token'
            });
        }
    }
    next();
}

export default auth;