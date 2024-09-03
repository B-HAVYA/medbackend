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
        'INSERT INTO productdetails (categoryid, subcategoryid, brandid, productid, productsubname, weight, weighttype, type, packaging, quantity, price, offerprice, offertype, picture, description,concern) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            req.body.categoryid,
            
            req.body.subcategoryid,
            
            req.body.brandid,
            
            req.body.productid,
            
            req.body.productsubname,
            
            req.body.weight,

            req.body.weighttype,

            req.body.type,

            req.body.packaging,

            req.body.quantity,

            req.body.price,

            req.body.offerprice,

            req.body.offertype,

            files+"",

            req.body.description,

            req.body.concern
        ]
        ,
        function(error,result){
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


router.get('/display',function(req,res,next){
    try {
        pool.query('select P.*,(select C.categoryname from category C where C.categoryid=P.Categoryid) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid) as brandname,(select Pro.productname from products Pro where Pro.productid=P.productid) as productname from productdetails P',function(error,result){
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

  router.post('/delete',function(req,res,next){
    try {
      pool.query('delete from productdetails where productdetailid=?',[req.body.productdetailid],function(error,result){
          if(error){
              {res.status(200).json({status:false,msg:'server error : pls contact database administrator ...'})}
  
          }
          else{
              {res.status(200).json({status:true,msg:'product detail deleted successfully'})}
          }
      })
      
    } catch (e) {
      console.log(e)
      {res.status(200).json({status:false,msg:'server error : pls contact server administrator ...'})}
      
    }  
  });

  router.post('/edit_picture',upload.single('picture'),function(req,res,next){
    try {
      pool.query('update productdetails set picture =? where productdetailid=?',[req.file.filename,req.body.productdetailid],function(error,result){
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

  router.post('/edit_data', function(req, res, next) {
    try {
      pool.query(
        "UPDATE productdetails SET categoryid=?, subcategoryid=?, brandid=?, productid=?, productsubname=?, weight=?, weighttype=?, type=?, packaging=?, quantity=?, price=?, offerprice=?, offertype=?,description=?,concern=? WHERE productdetailid=?",
        [
          req.body.categoryid,
          req.body.subcategoryid,
          req.body.brandid,
          req.body.productid,
          req.body.productsubname,
          req.body.weight,
          req.body.weighttype,
          req.body.type,
          req.body.packaging,
          req.body.quantity,
          req.body.price,
          req.body.offerprice,
          req.body.offertype,
          req.body.description,
          req.body.concern,
          req.body.productdetailid
        ],
        function(error, result) {
          if (error) {
            console.log(error);
            res.status(200).json({ status: false, msg: 'Server error: Please contact the database administrator.' });
          } else {
            res.status(200).json({ status: true, msg: 'Product detail updated successfully' });
          }
        }
      );
    } catch (e) {
      console.log(e);
      res.status(200).json({ status: false, msg: 'Server error: Please contact the server administrator.' });
    }
  });
  








module.exports = router;