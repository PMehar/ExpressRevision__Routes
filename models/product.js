const fs = require("fs");
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir,'data' , 'products.json');


const getProductsFromFs = (cb) =>{
    fs.readFile(p , (err, fileContent)=>{
     if(err){
        return cb([]);
     }
     else{
        cb(JSON.parse(fileContent));
     }    
    });
}
module.exports = class Products{
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }

    save(){
        this.id = Math.random().toString();
        getProductsFromFs(products =>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products), (err)=>{
               console.log(err);
            });
        });
    };

    static fetchAll(cb){
      getProductsFromFs(cb);
    };

    static findByPk(id, cb){
        getProductsFromFs(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};


