const {v4:uuid} = require('uuid');
const { reviews } = require('./db');

exports.Mutation = {
    addCategory: (parent, {input}, {categories}) => {
        const {name} = input
        const newCategory = {
            id:uuid(),
            name,
        };
        categories.push(newCategory);
        return newCategory
    },
    addProduct:(parent,{input},{Products}) => {
        const {name,image,price,description,onSale,quantity,categoryId} = input
        const newProduct = {
            id:uuid(),name,image,price,description,onSale,quantity,categoryId
        }
        Products.push(newProduct);
        return newProduct
    },
    addReview:(parent,{input},{reviews}) => {
        const {date,title,comment,rating,productId} = input;
        const newReview = {
            id:uuid(),date,title,comment,rating,productId
        }
        reviews.push(newReview);
        return newReview
    },
    deleteCategory:(parent,{id},{categories,Products}) => {
       categories.filter(category => category.id !== id);
       Products = Products.map((product) => {
          if(product.categoryId === id)
            return {
                ...product,
                categoryId:null,
            }
          else return product
       });
       return true;
    },
    deleteProduct:(parent,{id},{Products,reviews})=>{
        Products = Products.filter(product => product.id !== id);
        reviews = reviews.filtet(review => review.productId !== id);
        return true
    },
    deleteReview:(parent,{id},{reviews}) => {
        reviews = reviews.filter(review => review.id !== id);
        return true
    },
    updateCategory:(parent,{id,input},{categories})=>{
        const index = categories.findIndex(category => category.id === id);
        if(index == -1)return null
        categories[index] = {
            ... categories[index],
            ... input,
        };
        return categories[index]
    },
    updateProduct:(parent,{id,input},{Products})=>{
        const index = Products.findIndex(product => product.id === id);
        if(index == -1)return null
        Products[index] = {
            ... Products[index],
            ... input,
        };
        return categories[index]
    },
    updateReview:(parent,{id,input},{reviews})=>{
        const index = reviews.findIndex(review => review.id === id);
        if(index == -1)return null
        reviews[index] = {
            ... reviews[index],
            ... input,
        };
        return reviews[index]
    },
}