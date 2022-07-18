import nc from 'next-connect';
import User from '../../../models/User';
import bcryptjs from 'bcryptjs'
import connectDb from '../../../connection/config';

connectDb()
const handler = nc()

    .post(async (req, res) => {
        try {
    
            const { name, email, password } = req.body;
    
            if (!name || !email || !password) {
                res.status(400).send({ succes: false, message: 'Please fill the field' });
            } else {
 
                const is_email = await User.findOne({ email: email });

                if (is_email) {

                    res.send({
                        success: false,
                        message: 'Email already exist'
                    })
                } else {

                    const hashPassword = await bcryptjs.hash(password, 10);

                    const users = new User({ name, email, password: hashPassword });

                    const user = await users.save();

                    if (user) {

                        res.send({
                            success: true,
                            message: 'Success!'
                        });
                    } else {

                        res.send({
                            success: false,
                            message: 'Server Problem'
                        })
                    }
                }
            }
        } catch (error) {

            res.status(500).send(`error ${error.message}`);
        }
    })
export default handler