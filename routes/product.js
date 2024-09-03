var express = require('express')
var router = express.Router();
var pool=require('./pool')

var upload=require('./multer')
router.post('/submit_product',upload.single('picture'),function(req,res,next){
  try {
    pool.query('insert into products (categoryid,subcategoryid,brandid,productname,description,picture) values(?,?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.file.filename],function(error,result){
        if(error){
            {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}

        }
        else{
            {res.status(200).json({status:true,msg:'Product submitted successfully'})}
        }
    })
    
  } catch (e) {
    console.log(e)
    {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
    
  }  
});

router.get('/displayallproducts',function(req,res,next){
  try {
      pool.query(
        'select P.*,(select C.categoryname from category C where C.categoryid=P.Categoryid) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid) as brandname from products P '
      ,function(error,result){
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

router.post('/delete_product',function(req,res,next){
  try {
    pool.query('delete from products where productid=?',[req.body.productid],function(error,result){
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

router.post('/edit_product_picture',upload.single('picture'),function(req,res,next){
  try {
    pool.query('update products set picture =? where productid=?',[req.file.filename,req.body.productid],function(error,result){
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


router.post('/edit_product_data',function(req,res,next){
  try {
    pool.query("UPDATE products SET categoryid=?, subcategoryid=?, brandid=?, productname=?, description=? WHERE productid=?",
    [
      req.body.categoryid,
      req.body.subcategoryid,
      req.body.brandid,
      req.body.productname,
      req.body.description,
      req.body.productid
    ],function(error,result){
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


router.post('/fetch',function(req,res,next){
  try {
      pool.query('select * from products where subcategoryid=? and brandid=? ',[req.body.subcategoryid,req.body.brandid],function(error,result){
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