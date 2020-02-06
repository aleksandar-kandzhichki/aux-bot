export enum SupportedURLs {
    Takeaway = "takeaway",
    FoodPanda = "foodpanda",
}

export type URLConf = {
    foodRegex: RegExp;
    extractFoodGroup: (str: string) => string;
    priceRegex: RegExp;
    extractPrice: (str: string) => string;
    extractRestaurantName: (str: string) => string;
};


export const URLsConfig: { [key in SupportedURLs]: URLConf } = {
    [SupportedURLs.Takeaway]: {
        foodRegex: /data-product-name="(.*?)"/g,
        extractFoodGroup: (str: string) => str.substring(str.indexOf('"') + 1, str.length - 1),
        priceRegex: /meal__price"[\S\s]*?>\s*(.*?)\s*</g,
        extractPrice: (str: string) => {
            str = str.replace(/\s*/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 2);
        },
        extractRestaurantName: (str: string) => {
            const nameRegex = /restaurant-name"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g;
            let match = str.match(nameRegex);
            if (!match || match?.length == 0) throw new Error("No restaurant name!");
            str = match[0].replace(/restaurant-name"[\S\s]*?>/g, '').replace(/\s{2,}/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 1);
        },
    },
    [SupportedURLs.FoodPanda]: {
        foodRegex: /"dish-name fn p-name"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
        extractFoodGroup: (str: string) => {
            str = str.replace(/dish-name fn p-name"[\S\s]*?>/g, '').replace(/\s{2,}/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 1);
        },
        priceRegex: /price p-price"[\S\s]*?>\s*(.*?)\s*</g,
        extractPrice: (str: string) => {
            str = str.replace(/\s*/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 2);
        },
        extractRestaurantName: (str: string) => {
            const nameRegex = /vendor-info-main-headline item"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g;
            let match = str.match(nameRegex);
            if (!match || match?.length == 0) throw new Error("No restaurant name!");
            str = match[0].replace(/vendor-info-main-headline item"[\S\s]*?>/g, '').replace(/\s{2,}/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 1);
        },
    },
}