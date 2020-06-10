const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/:origin/:dest/:weight/:kurir', (req,res,next)=>{
    let url = "http://api.shipping.esoftplay.com/cost/"+req.params.origin+"/"+
    req.params.dest+"/"+req.params.weight+"/"+req.params.kurir;

    let options = { json: "true", method: "GET" };

    request(url,options,(error,result,body) => {
        if(error){
            console.log(error)
        };

        if(!error && result.statusCode == 200){
            data = result.body;
            cost = data.result[0].costs;
            var chat = {};
            chat['chats'] = [];
            for(var idx in cost){
                var content = {};
                content = {
                    text: cost[idx].service+"\n"+cost[idx].description+"\nOngkir : "+
                    cost[idx].cost[0].value+"\nEstimasi Hari : "+cost[idx].cost[0].etd,
                    type: "text"
                };
                chat['chats'].push(content);
            };
            res.status(200).json(chat);
        };
    });
});

module.exports = router;