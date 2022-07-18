import nc from 'next-connect'
import ToDo from '../../../models/ToDo';
import auth from '../middleware/auth';
const JWT_SECRET = 'ABC123'
const handler = nc()

    .use(auth)
    .get(async (req, res) => {
        try {

            const tasks = await ToDo.find({ user_id: req.user }).populate();
            if (tasks) {
                res.send({
                    success: true,
                    tasks: tasks
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
export default handler;