const express = require('express');
const router = express.Router();
const request =  require('request');


router.get('/', (req, res, next) => {
    let url = "http://api.shipping.esoftplay.com/waybill/CGK2H03789568816/jne"

    let options = { json: "true", method: "GET" };

    request(url,options,(error,res,body) => {
        if(error){
            console.log(error)
        };

        if(!error && res.statusCode == 200){
            console.log(res.body);
            data = res.body;
        };
    })
    res.status(200).json({
        chats: [
            {
                text: data.result.summary.courier_name+"\n"+data.result.summary.waybill_number+
                "\nShipper : "+data.result.summary.shipper_name+"\nReceiver : "+data.result.summary.receiver_name+
                "\nOrigin : "+data.result.summary.origin+"\nDestination : "+data.result.summary.destination+
                "\nStatus : "+data.result.summary.status,
                type: "text"
            }
        ]
    });
});

router.get('/:noresi/:kurir', (req, res, next) => {
    let url = "http://api.shipping.esoftplay.com/waybill/"+req.params.noresi+"/"+req.params.kurir

    let options = { json: "true", method: "GET" };

    request(url,options,(error,result,body) => {
        if(error){
            console.log(error)
        };

        if(!error && result.statusCode == 200){
            //console.log(result.body);
            data = result.body;
            res.status(200).json({
                chats: [
                    {
                        text: data.result.summary.courier_name+"\n"+data.result.summary.waybill_number+
                        "\nShipper : "+data.result.summary.shipper_name+"\nReceiver : "+data.result.summary.receiver_name+
                        "\nOrigin : "+data.result.summary.origin+"\nDestination : "+data.result.summary.destination+
                        "\nStatus : "+data.result.summary.status,
                        type: "text"
                    }
                ]
            });
        };
    })
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