const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors= require('cors');

//Connect to MongoDB
require('./db/connection');

//Import Files
const Users= require('./models/users');
const Conversations = require('./models/Conversations');
const Messages = require('./models/Messages');

//app use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;
//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/api/register', async (req, res, next) => {
    try{
        const {fullName, email,password}=req.body;

        if(!fullName|| !email || !password)
        {
            res.status(400).send('Please fill all the fields');
        }
        else{
            const isAlreadyExists= await Users.findOne({email});
            if(isAlreadyExists){
                res.status(400).send('User already exists');
            }
            else{
                const newUser= new Users({fullName,email});
                bcryptjs.hash(password,10, (err,hashedPassword)=>{
                    newUser.set('password',hashedPassword);
                    newUser.save();
                    next();
                })
                return res.status(200).send('User registered successfully');
            }
        }
    }
    catch(error){
        console.log(error,'error');
    }
});

app.post('/api/login', async (req, res, next) => {
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            res.status(400).send('Please fill all the fields');
        }
        else{
            const user= await Users.findOne({email});
            if(!user)
            {
                res.status(400).send('User email or password Incorrect!');
            }
            else{
                const validateUser= await bcryptjs.compare(password,user.password)
                if(!validateUser)
                {
                    res.status(400).send('User email or password Incorrect!');
                }else{

                    const payload={
                        userId:user._id,
                        email:user.email,
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

                    jwt.sign(payload,JWT_SECRET_KEY,{expiresIn: 86400}, async (err,token)=>{
                        await Users.updateOne({_id: user._id},{
                            $set:{token}
                        })
                        user.save();
                        return res.status(200).json({user:{id:user._id,email:user.email,fullName:user.fullName},token:token});

                    })

                }
            }
        }
    }
    catch(error){
        console.log(error,'error');
    }
});

app.post('/api/conversation', async (req, res, next) => {
    try{
        const {senderId ,receiverId}=req.body;
        const newConversation= new Conversations({members:[senderId,receiverId]});
        await newConversation.save();
        res.status(200).send('Conversation created successfully');
    }
    catch(error){
        console.log(error,'error');
    }
});

app.get('/api/conversations/:userId', async (req, res, next) => {
    try{
        const userId=req.params.userId;
        const conversations= await Conversations.find({members:{$in:[userId]}});
        const conversationUserData = Promise.all(conversations.map(async (conversation)=>{
            const receiverId=conversation.members.find(member=>member!==userId);
            const user =await Users.findById(receiverId);
            return { user:{email: user.email,fullName: user.fullName},conversationId:conversation._id}
        }));
        // console.log(userId,conversations,conversationUserData,'here')
        
        res.status(200).json(await conversationUserData);
    }
    catch{
        console.log(error,'error');
    }
});

app.post('/api/messages', async (req, res, next) => {
    try{
        const {conversationId,senderId,message,receiverId=''}=req.body;
        if(!senderId || !message) return res.status(400).send('Please fill all the fields');
        if(!conversationId && receiverId) {
            const newConversation= new Conversations({members:[senderId,receiverId]});
            await newConversation.save();
            const newMessage= new Messages({conversationId:newConversation._id,senderId,message});
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        }
        else if(!conversationId && !receiverId) return res.status(400).send('Please fill all the fields');

        const newMessage= new Messages({conversationId,senderId,message});
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    }
    catch(error){
        console.log(error,'error');
    }
});

app.get('/api/messages/:conversationId', async (req, res, next) => {
    try{
        const conversationId=req.params.conversationId;
        if(conversationId==='new') return res.status(200).json([]);
        const messages= await Messages.find({conversationId});
        const messageUserData = Promise.all(messages.map(async (message)=>{
            const user =await Users.findById(message.senderId);
            return { user:{email: user.email,fullName: user.fullName},message:message.message}
        }));


        res.status(200).json(await messageUserData);
    }
    catch(error){
        console.log(error,'error');
    }
});

app.get('/api/users', async (req, res, next) => {
    try{
        const users= await Users.find({});
        const usersData = Promise.all(users.map(async (user)=>{
            return { user:{email: user.email,fullName: user.fullName},userId:user._id}
        }));

        res.status(200).json(await usersData);
    }
    catch(error){
        console.log(error,'error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});