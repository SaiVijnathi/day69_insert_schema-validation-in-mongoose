const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]{1,50}$/.test(v);
      },
      message: props => `${props.value} is not a valid FirstName!`,
    },
    required: [true, 'User firstName required'],
    },

    lastName: {
        type: String,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]{1,50}$/.test(v);
      },
      message: props => `${props.value} is not a valid LastName!`,
    },
    required: [true, 'User lastName required'],
    },

    age: {
        type:Number,
        min:[13,"Too young to create an account"],
        max:[100,"Too late to create an account"],
        required:true
    },

    email: {
        type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
    required: [true, 'User email required'],
    },

    batchId: String,

    gender: {
        type:String,
        lowercase:true,
        enum:["male","female"]
    },

    maritalStatus: {
        type:String,
        lowercase:true,
        enum:["single","married"]
    },
});

let Student = new mongoose.model("students",studentSchema,"BRNStudents");

let insertStudentsIntoDB = async ()=>{
    try{
        let vijnathi = new Student({
            firstName: "SaiVijnathi",
            lastName: "Tatikonda",
            age: 22,
            email: "saivijnathitatikonda@gmail.com",
            batchId: "2409 MERN",
            gender: "female",
            maritalStatus: "Single"
        });

        let sai = new Student({
            firstName: "Tatikonda",
            lastName: "SaiVijnathi",
            age: 22,
            email: "saivijnathit@gmail.com",
            batchId: "2409_MERN",
            gender: "FemALe",
            maritalStatus: "Single"
        });

        let Julia = new Student({
            firstName: "julia",
            lastName: "Mars",
            age: 34,
            email: "juli345@gmail.com",
            batchId: "2409_MERN",
            gender: "Female",
            maritalStatus: "Married"
        });


        Student.insertMany([vijnathi,sai,Julia]);
        console.log("Successfully inserted data into database");
    }catch(err){
        console.log("Unable to insert data into database");
    }
    
};

let connectToMDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://saivijnathitatikonda:saivijnathi@day68-intro-to-mongodb.q4dsd.mongodb.net/BRNDB?retryWrites=true&w=majority&appName=day68-Intro-to-MongoDB");
        insertStudentsIntoDB();
        console.log("Successfully connected to MDB");
    }
    catch (err){
        console.log("Unable to connect to MDB");
    }
}

connectToMDB();