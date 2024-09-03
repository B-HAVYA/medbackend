var express = require('express')
var router = express.Router();
var pool=require('./pool')

router.get('/display_category',function(req,res,next){
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


router.post('/fetchsubcategory',function(req,res,next){
    try {
      pool.query('select * from subcategory where categoryid=?',[req.body.categoryid],function(error,result){
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
  });


  router.get('/display_all_brands',function(req,res,next){
    try {
        pool.query('select * from brands where brandid !=0 ',function(error,result){
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

router.post('/display_Banners',function(req,res,next){
  try {
      pool.query('select * from banners where bannertype=?',[req.body.bannertype],function(error,result){
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

router.post('/display_all_productdetail_by_offer',function(req,res,next){
  try
  {
      pool.query("select P.*,PR.*,P.picture as multi_picture, P.description as pd_description,(select C.categoryname from category C where C.categoryid=P.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid)as brandname,(select Con.concernname from concern Con where Con.concernid=P.concern)as concernname from productdetails P,products PR  where P.productid=PR.productid and P.offertype=?",[req.body.offertype],function(error,result){
          if (error)
          {  console.log(error)
              res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
          }
          else
      { console.log(result)
              res.status(200).json({status:true,message:'Success',data:result})
          }
      })
  }
  catch(e)
  {
      res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
  }

})



module.exports=router;
