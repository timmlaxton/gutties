import bcrypt from 'bcryptjs'


const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Tim Laxton',
    email: 'tim@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Stella Laxton',
    email: 'stella@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users