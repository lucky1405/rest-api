const Product = require('../models/product');

const getAllProducts = async (req,res) => {
    const {company, name, featured, sort, select } = req.query;
    const querObject = {};
    if(company) {
        querObject.company = company;
    }
    if(featured) {
        querObject.featured = featured;
    }
    if(name) {
        querObject.name = { $regex: name, $options: "i"}
    }
    let apiData = Product.find(querObject);
    if(sort) {
        let sortFix = sort.replace(","," ");
        apiData = apiData.sort(sortFix);
    }
    if(select) {
        // let selectFix = select.replace(","," ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);
    
    const myData = await apiData;
    res.status(200).json({myData})
};

const getAllProductsTesting = async (req,res) => {
    const myData = await Product.find(req.query);
    console.log(req.query)
    res.status(200).json({ myData })
};

module.exports = { getAllProducts, getAllProductsTesting };
