import express from "express";
import { jsTopicModel } from "../models/jsTopicsModel.js"; 
const router = express.Router();


router.get('/', async (request,response)=>{
    try {
        const topics = await jsTopicModel.find({});
        return response.status(200).json({
            // count: books.length,
            data: topics
        });
    } catch (error) {
       console.log(`Error occured in the GET method 
       for getting all books from the database ${error.message}`);
       response.send({message:error.message}); 
    }


})

export default router;




