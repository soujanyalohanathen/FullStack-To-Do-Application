import ToDo from '../../../models/ToDo';
import nc from 'next-connect'
import auth from '../middleware/auth';
const handler = nc()
    .use(auth)
    .post(async (req, res) => {
        try {
    
            const id = req.query.id;

            const tasks = await ToDo.findById({ _id: id });
            const toObject = tasks.toObject();
            delete toObject._id;
            const newtasks = new ToDo(toObject);
            const newTask = await newtasks.save();
            if (newTask) {
                res.send({
                    success: true,
                    message: 'Tasks clone successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
   
    .delete(async (req, res) => {
        try {
            const id = req.query.id;
            const tasks = await ToDo.findByIdAndDelete({ _id: id });
            if (tasks) {
                res.send({
                    success: true,
                    message: 'Tasks Delete successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server Problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.messeage
            })
        }

    })

    .put(async (req, res) => {
        try {
            const id = req.query.id;
            const tasks = await ToDo.findById({ _id: id });
            if (tasks) {
                res.send({
                    success: true,
                    notes: notes,
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server Problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.messeage
            })
        }
    })

    .patch(async (req, res) => {
        try {
            const id = req.query.id;

            const { task, notes, color } = req.body;

            const tasks = await ToDo.findByIdAndUpdate({ _id: id }, {
                task, notes, color,
            });
            if (tasks) {
                res.send({
                    success: true,
                    message: 'Tasks Updated successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server Problem'
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.messeage
            })
        }
    })
export default handler;