const express = require('express');
const router = express.Router();
const request = require('request');

let newurl = "http://api.shipping.esoftplay.com/courier_waybill";
let newoptions = { json: "true", method: "GET" };
request(newurl,newoptions,(error,result,body) => {
    if(error){
        console.log(error)
    };

    if(!error && result.statusCode == 200){
        list_idKurir = result.body.result;
    };
});



router.get('/cekresi', (req, res, next) => {
    let url = "http://api.shipping.esoftplay.com/couriers";
    let options = { json: "true", method: "GET" };

    request(url,options,(error,result,body) => {
        if(error){
            console.log(error)
        };

        if(!error && result.statusCode == 200){
            data = result.body.result.couriers;
            var chat = {}
            var buttonArr = [];

            //console.log(chat);
            for(var index in data){
                val = data[index];
                var content = {};
                content["label"] = val.name;
                content["type"] = "path";
                content["path"] = "5edceaa520f8374bf65ac755";

                idKurir = list_idKurir.filter(function(item) {
                    return val.slug.includes(item);
                });

                if(idKurir[0] == null){
                    idKurir[0] = "";
                }

                content["variable"] = {
                    kurir: idKurir[0]
                };
                //console.log(content);
                if(idKurir != "" && !buttonArr.some(item => item.variable.kurir.includes(idKurir[0]))){
                    buttonArr.push(content);
                }
            };
            chat['chats'] = [{
                text: "Silahkan pilih kurir yang tersedia dibawah",
                buttons: buttonArr,
                type: "button"
            }];
            //console.log(chat);
            res.status(200).json(chat);
        };
    });
});


router.get('/cekongkir', (req, res, next) => {
    let url = "http://api.shipping.esoftplay.com/couriers";
    let options = { json: "true", method: "GET" };

    request(url,options,(error,result,body) => {
        if(error){
            console.log(error)
        };

        if(!error && result.statusCode == 200){
            data = result.body.result.couriers;
            var chat = {}
            chat['chats'] = [{
                text: "Silahkan pilih kurir yang tersedia dibawah"
            }];

            var buttonArr = [];

            //console.log(chat);
            for(var index in data){
                val = data[index];
                var content = {};
                content["label"] = val.name;
                content["type"] = "path";
                content["path"] = "5ee13d6620f837185ebedc06";

                idKurir = list_idKurir.filter(function(item) {
                    return val.slug.includes(item);
                });

                if(idKurir[0] == null){
                    idKurir[0] = "";
                }

                content["variable"] = {
                    kurir: idKurir[0],
                    kurir_det: val.name
                };
                //console.log(content);
                if(idKurir != "" && !buttonArr.some(item => item.variable.kurir.includes(idKurir[0]))){
                    buttonArr.push(content);
                }
            };
            chat['chats'] = [{
                text: "Silahkan pilih kurir yang tersedia dibawah",
                buttons: buttonArr,
                type: "button"
            }];
            //console.log(chat);
            res.status(200).json(chat);
        };
    });
});

module.exports = router;