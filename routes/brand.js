var express = require('express')
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')


router.post('/submit_brand',upload.single('picture'),function(req,res,next){
    try {
      pool.query('insert into brands (brandname,picture) values(?,?)',[req.body.brandname,req.file.filename],function(error,result){
          if(error){
              {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}
  
          }
          else{
              {res.status(200).json({status:true,msg:'brand submitted successfully'})}
          }
      })
      
    } catch (e) {
      console.log(e)
      {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
      
    }  
  });

  router.get('/display_all_brands',function(req,res,next){
    try {
        pool.query('select * from brands ',function(error,result){
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


router.post('/edit_brand_picture',upload.single('picture'),function(req,res,next){
  try {
    pool.query('update brands set picture =? where brandid=?',[req.file.filename,req.body.brandid],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'picture updated successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});

router.post('/edit_brand_data',function(req,res,next){
  try {
    pool.query('update brands set brandname =? where brandid=?',[req.body.brandname,req.body.brandid],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'brand updated successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});


router.post('/delete_brand',function(req,res,next){
  try {
    pool.query('delete from brands where brandid=?',[req.body.brandid],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'Brand deleted successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});



module.exports = router;