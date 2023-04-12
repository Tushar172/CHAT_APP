const mongoose = require('mongoose');

const url = 'mongodb+srv://chat_app_admin:admin321@cluster0.a9cm7sv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log("Error",err));