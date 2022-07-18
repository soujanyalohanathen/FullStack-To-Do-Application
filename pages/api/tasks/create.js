import nc from 'next-connect'
import ToDo from '../../../models/ToDo';
import auth from '../middleware/auth';

const handler = nc()
    .use(auth)
    .post(async (req, res) => {
        try {
          
            const { task, notes,  user_id,color } = req.body;
            
            if (!task || !notes || !user_id) {
                res.send({
                    success: false,
                    message: 'Please fill the field'
                })
            } else {
     
                const tasks = new ToDo({ task, notes, user_id, color });
                const taskx = await tasks.save();
                
                if (taskx) {
                    res.send({
                        success: true,
                        message: 'Tasks Created Successfully',
                    })
                } else {
                    res.send({
                        success: false,
                        message: 'Server Problem',
                    })
                }
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
            })
        }
    });

export default handler;