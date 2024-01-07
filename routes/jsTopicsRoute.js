import express from "express";
import { jsTopicModel } from "../models/jsTopicsModel.js"; 
const router = express.Router();
let validationResult = true;
const validateYouTubeUrl = (urlToParse) => {
    if (urlToParse) {
      let regExp =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (urlToParse.match(regExp)) {
        return true;
      }
    }
    return false;
  };

  //modify accordingly
  const JsTopicList=["Array","Promises","String","Object"];


  const checkTopic = (Ptopic) => {
    if (JsTopicList.indexOf(Ptopic) < 0) {
     

      return false;
    } else {
      return true;
    }
  };
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


// New Route for POST to create  new topic in the database
router.post('/newtopic', async (request, response)=>{
    try {
        let newTopic = {
            topicName: "",
            subTopicName:"",
            syntax: "",
            explanation:"",
            videoLink:"",
            videoTitle:""

    
    
        }
    // check if all the reuired fields present in the request
    if( !request.body.topicName ||
        !request.body.subTopicName ||
        !request.body.syntax ||
        !request.body.explanation
        )
    {
        console.log("first check =====> ")
        validationResult = false;
        // if not then return 
        return response.status(400).send(
            {
                message:`Send all the reuired fields: topic name, sub topic name, syntax, explanation`
            }
        );
    
    }

    else if(!checkTopic(request.body.topicName))
    {
        console.log("JS topic check =====> ")
        validationResult = false;
        return response.status(400).send(
            {
                message:`topic name is not present in the JsTopic list please add it and the proceed with req.`
            }
        );

    }

    else if(request.body.IMPPoints.length >0 && request.body.IMPPoints.length!==undefined)
    {
        let tempArray = [];

        request.body.IMPPoints.forEach((val)=>{
            
                if(val!=null&&val!=""&&val!=undefined)
                {
                    tempArray.push(val);

                }
        })

       
            console.log("IMPPoints array ===> "+tempArray);
            newTopic.IMPPoints = tempArray;
    }
    else if(validateYouTubeUrl(request.body.videoLink))
    {
        console.log("second check up =====> ")
        newTopic.videoLink=request.body.videoLink;
        if((request.body.videoTitle===""||request.body.videoTitle===undefined))
        {
            console.log("second check low =====> ")
            validationResult = false;
            
            return response.status(400).send(
                {
                    message:`Please provide valid youtube title`
                }
            );
            

            }  
       
    }
    else if((request.body.videoTitle===""||request.body.videoTitle===undefined))
    {
        console.log("third check up =====> ")
        if(!validateYouTubeUrl(request.body.videoLink) && !(request.body.videoLink===""||request.body.videoLink===undefined))
        {
            console.log("third check low =====> ")
            validationResult = false;
            console.log("request.body.videoLink value =====> "+request.body.videoLink)
            return response.status(400).send(
                {
                    message:`Please provide valid youtube Link`
                }
            );

        }
       

    }
    else if(!(request.body.videoTitle===""||request.body.videoTitle===undefined))
    {
        console.log("fourth check up =====> ")
        validationResult = false;
        newTopic.videoTitle=request.body.videoTitle;
        if(!validateYouTubeUrl(request.body.videoLink))
        {
            console.log("fourth check low =====> ")
            return response.status(400).send(
                {
                    message:`Please provide valid youtube Link`
                }
            );

        }
        
    }
    //else create a new topic in the database
    if(validationResult){
        console.log("validation passed =====> ")
        newTopic.topicName=request.body.topicName;
        newTopic.subTopicName=request.body.subTopicName;
        newTopic.syntax=request.body.syntax;
        newTopic.explanation=request.body.explanation;

        const Topic = await jsTopicModel.create(newTopic);
        return response.status(201).send(Topic);
    }
   
        
    } catch (error) {
    
        console.log("Error in the POST method to create new topic "+error.message);
        response.status(500).send({message:error.message});
        
    }
    
    });

export default router;




