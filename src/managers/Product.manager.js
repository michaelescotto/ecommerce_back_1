import fs from "fs"
import generateId from "../utils/generateId.js"

const path = "./src/data/products.json"

class ProductsManager {
    constructor() {
        this.path = path
        this.products = this.read()
    }

    read() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8")
            return JSON.parse(data)
        }
        return []
    }

    readOne(id) {
        return this.products.find( product => product.id === id)
    }

    create(product) {
        product.id = generateId()
        this.products.push(product)
        this.save()
    }

    update (id, data) {
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) return null

        this.products[index] = {...this.products[index], ...data}
        this.save()
        return this.products[index]
    }

    delete(id) {
        const index = this.products.findIndex(product => product.id === id)
        if (index === -1) return null

        const [deletedProduct] = this.products.splice(index, 1)
        this.save()
        return deletedProduct
    }

    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf-8")
    }


}

export default new ProductsManager();