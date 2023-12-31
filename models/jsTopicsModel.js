import mongoose from "mongoose";

const jsTopicSchema = mongoose.Schema(
    {
        topicName:{
            type: String,
            required: true,
        },
        syntax:{
            type: String,
            required: true,
        },
        explanation:{
            type: String,
            required: false,
        },
        IMPPoints:[
            
        ],
        videoTitle:{
            type: String,
            required: false,
        },
        videoLink:{
            type: String,
            required: false,
        },

           

    },
    {
        timestamps:true,
    }
);

export const jsTopicModel = mongoose.model('jsTopicModel',jsTopicSchema);