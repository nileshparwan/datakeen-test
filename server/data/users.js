import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'admin',
        email: 'koshal.parwan@gmail.com',
        password: bcrypt.hashSync('Testing123', 10),
        isAdmin: true
    },
    {
        name: 'guest1',
        email: 'nileshparwan.utm.bse16b@gmail.com',
        password: bcrypt.hashSync('Testing123', 10),
        isAdmin: false
    }
]

export default users;