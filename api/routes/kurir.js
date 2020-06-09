const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/cekresi', (req, res, next) => {
    let all_url = "http://api.shipping.esoftplay.com/couriers";
    let all_options = { json: "true", method: "GET" };

    request(all_url,all_options,(error,result,body) => {
        if(error){
            console.log(error)
        };

        if(!error && result.statusCode == 200){
            data = result.body.result.couriers;
            var chat = {}
            chat['chats'] = [{
                text: "Silahkan pilih kurir yang tersedia dibawah",
            }];

            var buttonArr = [];

            console.log(chat);
            for(var index in data){
                val = data[index];
                var content = {};
                content["label"] = val.name;
                content["type"] = "path";
                content["path"] = "5edceaa520f8374bf65ac755";
                content["variable"] = {
                    kurir: val.slug
                };
                console.log(content);
                buttonArr.push(content);
            };
            chat['chats'] = [{
                text: "Silahkan pilih kurir yang tersedia dibawah",
                buttons: buttonArr,
                type: "button"
            }];
            console.log(chat);
            res.status(200).json(chat);
        };
    });
});

module.exports = router;