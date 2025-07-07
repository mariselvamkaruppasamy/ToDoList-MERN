const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Todo = require('./Todo');
const User = require('./User');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'mariselvamk22601@gmail.com',
        pass: 'bqnv undv xazi ihsj'
    }
});

cron.schedule('* * * * *', async()=>{
    const now = new Date();
    const in30Min = new Date(now.getTime() + 30 * 60000);

    const todos = await Todo.find({
        reminderDate: now.toISOString().split('T')[0],
        reminderTime: {
            $in: [
                now.toTimeString().slice(0, 5),
                in30Min.toTimeString().slice(0, 5)
            ]
        }
    }).populate('user');

    todos.forEach(todo =>{
        const mailOptions = {
            from: 'mariselvamk22601@gmail.com',
            to: todo.user.email,
            subject: 'Todo Reminder',
            text: `Reminder: ${todo.task} at ${todo.reminderTime}`
        };

        transporter.sendMail(mailOptions, (err, info) =>{
            if(err) console.error('Email error:', err);
        });
    });
});