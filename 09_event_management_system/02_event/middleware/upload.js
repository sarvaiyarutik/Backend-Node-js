
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{

      let folderName = "uploads/"

      if(file.fieldname === "eventIMG"){
        folderName += "eventIMG";
      }
      else if(file.fieldname === "eventPoster"){
        folderName += "eventPoster";
      }
      else if(file.fieldname === "eventBanner"){
        folderName += "eventBanner"
      }
      else if(file.fieldname === "eventSpeaker"){
        folderName += "eventSpeaker";
      }
      else if(file.fieldname === "eventDocument"){
        folderName += "eventDocument"
      }
      else{
        folderName = "Other"
      }
      fs.symlinkSync(folderName,{recursive:true});
      return cb(null,folderName )
    },

    filename:(req,file,cb)=>{

        const uniqueName = `${file.fieldname}-${Date.now()}-${file.originalname }`;
        return cb(null,uniqueName   )

    }
})


const fileFilter =  (req,file,cb)=>{

    const 
}