import nc from 'next-connect';
import User from '../../../models/User';
import bcryptjs from 'bcryptjs'
import connectDb from '../../../connection/config';
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

connectDb()
const JWT_SECRET = 'ABC123'
const handler = nc()

    .post(async (req, res) => {
        try {

            const { email, password } = req.body;

            if (!email || !password) {
                res.send({
                    success: false,
                    message: 'Please fill thoughout the form'
                })
            } else {

                const user = await User.findOne({ email: email });

                if (user) {

                    const passwordCompare = await bcryptjs.compare(password, user.password);
                    if (passwordCompare) {

                        const user_id = { user_id: user._id }
                        const authToken = jwt.sign(user_id, JWT_SECRET);

                        const saveCookie = cookie.serialize('access_token', authToken, {
                            httpOnly: true,
                            secure: 'development',
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        })
                        res.setHeader('Set-Cookie', saveCookie)
                        res.send({
                            success: true,
                            authToken,
                            message: 'Login Successfully'
                        })
                    } else {
                        res.send({
                            success: false,
                            message: 'Invalid Email and Password'
                        })
                    }
                } else {
                    res.send({
                        success: false,
                        message: 'Invalid Email and Password'
                    })
                }
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
export default handler