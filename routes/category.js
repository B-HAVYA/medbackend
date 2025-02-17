var express = require('express')
var router = express.Router();
var pool=require('./pool')

var upload=require('./multer')
router.post('/submit_category',upload.single('picture'),function(req,res,next){
  try {
    pool.query('insert into category (categoryname,picture) values(?,?)',[req.body.categoryname,req.file.filename],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'category submitted successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});




router.get('/display_all_category',function(req,res,next){
    try {
        pool.query('select * from category ',function(error,result){
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



router.post('/edit_category_data',function(req,res,next){
  try {
    pool.query('update category set categoryname =? where categoryid=?',[req.body.categoryname,req.body.categoryid],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'category updated successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});

router.post('/edit_category_picture',upload.single('picture'),function(req,res,next){
  try {
    pool.query('update category set picture =? where categoryid=?',[req.file.filename,req.body.categoryid],function(error,result){
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


router.post('/delete_category',function(req,res,next){
  try {
    pool.query('delete from category where categoryid=?',[req.body.categoryid],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'Category deleted successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});


module.exports = router;