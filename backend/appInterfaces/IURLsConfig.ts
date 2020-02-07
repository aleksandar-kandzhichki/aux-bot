export interface IURLConfig {
    name: string;
    urlKeyword: string;
    config: URLConf;
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