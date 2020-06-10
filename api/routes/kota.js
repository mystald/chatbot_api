const express = require('express');
const router = express.Router();
const request = require('request');

var postcode = [];

let all_url = "http://api.shipping.esoftplay.com/cities";
let all_options = { json: "true", method: "GET" };
request(all_url,all_options,(error,result,body) => {
    if(error){
        console.log(error)
    };

    if(!error && result.statusCode == 200){
        data = result.body;
        //console.log(chat);
        for(var idx1 in data[1]){
            if(data[1][idx1][4].includes('Indonesia') && data[1][idx1][5]!=""){
                postcode.push(data[1][idx1]);
            }
            //console.log(data[1][idx1]);
        };
    };
});

router.get('/test', (req,res,next)=>{
    res.status(200).json(postcode);
});

router.get('/ongkir_origin/:kab_origin', (req,res,next)=>{
    var idKab_origin = [];
    for(var idx in postcode){
        if(postcode[idx][3].toLowerCase().includes(req.params.kab_origin.toLowerCase())){
            idKab_origin.push(postcode[idx]);
        }
    };

    if(idKab_origin.length > 1){
        var chat = {};
        chat['chats'] = [];
        chat['chats'].push({
            text: "Pilih Kabupaten/Kota asal pengiriman"
        });

        var buttonArr = [];
        for(var idx in idKab_origin){
            val = idKab_origin[idx];
            var content = {};
            content['label'] = val[4];
            content['type'] = "path";
            content['path'] = "5ee120f820f837185ebedb8b";
            content["variable"] = {
                idKab_origin: val[0]
            };
            buttonArr.push(content);
        };
        chat['chats'] = [{
            text: "Pilih Kabupaten/Kota asal pengiriman",
            buttons: buttonArr,
            type: "button"
        }];

        res.status(200).json(chat);
    }
    else{
        res.status(200).json({
            chats: [
                {
                    variable: {
                        idKab_origin: idKab_origin[0][0]
                    },
                    type: "variable"
                },
                {
                    path: "5ee120f820f837185ebedb8b",
                    type: "path"
                }
            ]
        });
    }
    console.log("Cari origin kab/kota cekongkir"+req.params.kab_origin);
});

router.get('/ongkir_dest/:kab_dest', (req,res,next)=>{
    var idKab_dest = [];
    for(var idx in postcode){
        if(postcode[idx][3].toLowerCase().includes(req.params.kab_dest.toLowerCase())){
            idKab_dest.push(postcode[idx]);
        }
    };

    if(idKab_dest.length > 1){
        var chat = {};
        chat['chats'] = [];
        chat['chats'].push({
            text: "Pilih Kabupaten/Kota tujuan pengiriman"
        });

        var buttonArr = [];
        for(var idx in idKab_dest){
            val = idKab_dest[idx];
            var content = {};
            content['label'] = val[4];
            content['type'] = "path";
            content['path'] = "5edcd40b20f8374bf65ac6d5";
            content["variable"] = {
                idKab_dest: val[0]
            };
            buttonArr.push(content);
        };
        chat['chats'] = [{
            text: "Pilih Kabupaten/Kota tujuan pengiriman",
            buttons: buttonArr,
            type: "button"
        }];

        res.status(200).json(chat);
    }
    else{
        res.status(200).json({
            chats: [
                {
                    variable: {
                        idKab_dest: idKab_dest[0][0]
                    },
                    type: "variable"
                },
                {
                    path: "5edcd40b20f8374bf65ac6d5",
                    type: "path"
                }
            ]
        });
    }
    console.log("Cari dest kab/kota cekongkir"+req.params.kab_dest);
});


module.exports = router;