export const removeDuplicateProductsId = (products) => {
    const uniqueIds = new Set();
    const uniqueProductIds = [];

    products.forEach(product => {
        if (!uniqueIds.has(product)) {
            uniqueIds.add(product);
            uniqueProductIds.push(product);
        }
    });

    return uniqueProductIds;
};