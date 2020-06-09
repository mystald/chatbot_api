const express = require('express');
const router = express.Router();
const request =  require('request');

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
    console.log("Cek resi "+req.params.noresi+" "+req.params.kurir);
});

module.exports = router;