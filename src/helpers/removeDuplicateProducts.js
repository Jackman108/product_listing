export const removeDuplicateProducts = (products) => {
    const uniqueIds = new Set();
  
    const uniqueProducts = products.filter(product => {
       
        if (uniqueIds.has(product)) {
            return false;
        }
       
        uniqueIds.add(product);
        return true;
    });
    return uniqueProducts;
};
