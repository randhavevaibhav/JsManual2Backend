const JsTopicList=["Array","Promises","String","Object"];


export const checkTopic = (Ptopic) => {
    if (JsTopicList.indexOf(Ptopic) < 0) {
     

      return false;
    } else {
      return true;
    }
  };