import nc from 'next-connect';
import User from '../../../models/User';
import auth from '../middleware/auth';
const JWT_SECRET = 'ABC123'

const handler = nc()

    .use(auth)
    .get(async (req, res) => {
        try {
            const users = await User.findById({ _id: req.user }).select('-password')
            if (users) {
                res.send({
                    success: true,
                    users: users
                })
            }
        }
        catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    });

export default handler;