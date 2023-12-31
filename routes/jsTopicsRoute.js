import express from "express";
import { jsTopicModel } from "../models/jsTopicsModel.js"; 
const router = express.Router();

//  const  arraySlice= new jsTopicModel({
//         "topicName":"Array",
//      "subTopicName":"Array slice(start,end)",
//     "syntax":"const arr = [1,2,3,4,5,6];\nlet slicedArr = arr.slice(2,5);\nconsole.log(\"array after slice ==> \"+slicedArr);\n//Output - array after slice ==> [3,4,5]",
//      "explanation":"arr.slice method slice an array with the starting position and a ending position.",
//      "IMPPoints":["index started from 0","ending postion is excluded from the operation i.e.,5"],
//      "videoTitle":"",
//      "videoLink":""}
//    );

//    arraySlice.save().then((message)=>{
//     console.log(message)
//   }).catch((err)=>{

//     console.log(err);
//   });

router.get('/:topicname', async (request,response)=>{
    try {
        const {topicname} = request.params;
    
    
        
        const subTopics = await jsTopicModel.find({"topicName":topicname});
        return response.status(200).json({
            
            data: subTopics
        });
    } catch (error) {
       console.log(`Error occured in the GET method 
       for getting all books from the database ${error.message}`);
       response.send({message:error.message}); 
    }


})

export default router;




