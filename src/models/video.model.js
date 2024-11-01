import mongoose, {mongo, Schema, trusted} from "mongoose"

const videoSchema = new Schema(
    {
       videoFile : {
        type: String, // cloudinary url
        required : true
       },
       thumbNail : {
        type: String,   // cloudinary url
        required : true
       },
       title : {
        type: String,   
        required : true
       },
       description:{
        type: String,
        required: true
       },
       duration : {
        type: Number,
        required : true
       },
       views:{
        type: Number,
        required: true
       },
       isPublished:{
        type: Boolean
       },
       owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
       }        
    },
    {timestamps:true}
)

export const Video = mongoose.model("Video", videoSchema)