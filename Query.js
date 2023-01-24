
exports.Query = {
    hello:(parent, args, context) => {
        return ["World","jupiter"]
    },
    products:(parent,{filter},{Products,reviews}) => {
        let filteredProducts = Products
        if(filter){
            const {onSale, avgRating} = filter
            if(onSale){
                filteredProducts = filteredProducts.filter((product) => product.onSale);
            }
            if([1,2,3,4,5].includes(avgRating)){
                filteredProducts = filteredProducts.filter((product) => {
                    let sumRating = 0;
                    let numberOfReviews = 0
                    reviews.forEach(review => {
                        if(review.productId === product.id) {
                            sumRating += review.rating;
                            numberOfReviews++
                        }
                    });
                    const avgProductRating = sumRating / numberOfReviews;
                    return avgProductRating >= avgRating
                })
            }
        }
        return filteredProducts
    },
    product:(parent,{id},{Products}) => {
        return Products.find(product => product.id === id);
    },
    categories:(parent,args,{categories}) => {
        return categories
    },
    category:(parent, {id}, {categories}) => {
        return categories.find((category) => category.id === id)
    },
}