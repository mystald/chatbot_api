const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'products get work'
    });
});

router.post('/', (req, res, next) => {
    const list = {
        list: req.body.list
    };
    console.log(list)
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'products post work',
        createdProduct: product
    });
});

router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'You are special',
            id: id
        });
    } else{
        res.status(200).json({
            message: 'Good ID'
        });
    }
});

router.patch('/:productId', (req,res,next)=>{
    res.status(200).json({
        message: 'Product Updated'
    });
});

router.delete('/:productId', (req,res,next)=>{
    res.status(200).json({
        message: 'Deleted'
    });
});

module.exports = router;