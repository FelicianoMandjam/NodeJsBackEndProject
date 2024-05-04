import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
    {
        firsname:{type : String , require : true},
        picture: {type : String , require : true},
        email: {type : String , require : true},
        password: {type : String , require : true}
    },
    {timestamps: {createdAt: true}}
)


userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('User' , userSchema)