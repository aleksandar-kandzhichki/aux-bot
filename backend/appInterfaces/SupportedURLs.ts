export enum SupportedURLs {
    Takeaway = "takeaway",
    FoodPanda = "foodpanda",
}

export type URLConf = {
    foodRegex: RegExp;
    priceRegex: RegExp;
    restaurantNameRegex: RegExp;
};

export type URLMealInfo = {
    meals: {
        mealName: string;
        mealPrice: string;
    }[];
    restaurantName: string;
};

export const URLsConfig: { [key in SupportedURLs]: URLConf } = {
    [SupportedURLs.Takeaway]: {
        foodRegex: /data-product-name="(.*?)"/g,
        priceRegex: /meal__price"[\S\s]*?>\s*(.*?)\s*</g,
        restaurantNameRegex:  /restaurant-name"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
    },
    [SupportedURLs.FoodPanda]: {
        foodRegex: /"dish-name fn p-name"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
        priceRegex: /price p-price"[\S\s]*?>\s*(.*?)\s*</g,
        restaurantNameRegex: /vendor-info-main-headline item"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
    },
}