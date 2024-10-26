import Product from "../models/product.model.js";

class ProductMongoManager {

    async create(data) {
        try {
            const one = await Product.create(data)
        } catch (error) {
            throw error
        }
    }

    async read(pid){
        try {
            const one = await Product.findOne({_id: pid})
            return one
        } catch (error) {
            throw error
        }
    }

    async readAll(category){
        try {
            let all
            if (category) {
                all = await Product.find({category})
            } else {
                all = await Product.find()
            }

            return all
        } catch (error) {
            throw error
        }
    }

    async update(pid, data){
        try {
            const one = await Product.findOneAndUpdate({_id: pid}, data, { new: true})
            return one
        } catch (error) {
            throw error
        }
    }

    async destroy(pid){
        try {
            const one = await Product.findOneAndDelete({_id: pid})
            return one
        } catch (error) {
            throw error
        }
    }

}

const ProductsManager = new ProductMongoManager()
export default ProductsManager