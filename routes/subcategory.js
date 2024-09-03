var express = require('express')
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')



router.post('/submit_subcategory',upload.single('picture'),function(req,res,next){
  try {
    pool.query('insert into subcategory (categoryid,subcategoryname,picture) values(?,?,?)',[req.body.categoryid,req.body.subcategoryname,req.file.filename],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'subcategory submitted successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});

router.get('/display_subcategories',function(req,res,next){
    try {
        pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S ',function(error,result){
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

router.post('/delete_subcategory',function(req,res,next){
  try {
    pool.query('delete from subcategory where categoryid=? and subcategoryid=?',[req.body.categoryid,req.body.subcategoryid],function(error,result){
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


router.post('/edit_subcategory_picture',upload.single('picture'),function(req,res,next){
  try {
    pool.query('update subcategory set picture =? where categoryid=? and subcategoryid=?',[req.file.filename,req.body.categoryid,req.body.subcategoryid],function(error,result){
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




router.post('/edit_subcategory_data',function(req,res,next){
  try {
    pool.query("update subcategory  set categoryid=? ,subcategoryname=? where subcategoryid=? ",[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
        if(error){
          console.log(error)
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'Subcategory updated successfully'})}
        }
    })

  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});

router.post('/fetchsubcategory',function(req,res,next){
  try {
      pool.query('select * from subcategory where categoryid=? ',[req.body.categoryid],function(error,result){
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