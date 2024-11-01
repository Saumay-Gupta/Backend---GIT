import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        userName:{
            type : String,
            required : true,
            unique: true,
            lowercase: true
        },
        email:{
            type : String,
            required : true,
            unique: true,
            lowercase: true
        },
        fullName:{
            type : String,
            required : true,
        },
        avatar: {
            type: String, //cloudinary url
            required: true
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
        password:{
            type: String,
            required: true
        },
        refreshToken:{
            type: String
        }
    },
    {timestamps:true}
)

userSchema.pre("save", async function(){
        if(!this.isModified("password")) return next()
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
)

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)