var express = require('express')
var router = express.Router();
var pool=require('./pool')

var upload=require('./multer')

router.post('/submit',upload.any(),function(req,res,next){
    try {
      var files=req.files.map((item)=>{
  
        return item.filename          
        })
  
      pool.query(
          'INSERT INTO banners (bannertype, brandid, pictures) VALUES (?, ?, ?)',
          [
              req.body.bannertype,
  
              req.body.brandid ,
  
              files+"",
  
          ]
          ,
          function(error,result){
          if(error){
              {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}
  
          }
          else{
              {res.status(200).json({status:true,msg:'Banner submitted successfully'})}
          }
      })
      
    } catch (e) {
      console.log(e)
      {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
      
    }  
  });



  router.get('/display',function(req,res,next){
    try {
        pool.query('select * from banners ',function(error,result){
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





module.exports = router;