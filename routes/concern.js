var express = require('express')
var router = express.Router();
var pool=require('./pool')

var upload=require('./multer')
router.post('/submit',upload.single('icon'),function(req,res,next){
  try {
    pool.query('insert into concern (concernname,icon) values(?,?)',[req.body.concernname,req.file.filename],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'Concern submitted successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});


router.get('/display',function(req,res,next){
    try {
        pool.query('select * from concern ',function(error,result){
            if(error){
                {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}
    
            }
            else{
                {res.status(200).json({status:true,msg:'success',data:result})}
            }
        })
        
      } catch (e) {
        console.log(e)
        {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
        
      }  
})



module.exports=router