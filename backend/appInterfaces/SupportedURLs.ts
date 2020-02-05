export enum SupportedURLs {
    Takeaway = "takeaway",
    FoodPanda = "foodpanda",
}

export type URLConf = {
    regex: RegExp;
    extractGroup: (str: string) => string;
    priceRegex: RegExp;
    extractPrice: (str: string) => string;
};

export const URLsConfig: { [key in SupportedURLs]: URLConf } = {
    [SupportedURLs.Takeaway]: {
        regex: /data-product-name="(.*?)"/g,
        extractGroup: (str: string) => str.substring(str.indexOf('"') + 1, str.length - 1),
        priceRegex: /meal__price"[\S\s]*?>\s*(.*?)\s*</g,
        extractPrice: (str: string) => {
            str = str.replace(/\s*/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 2);
        }
    },
    [SupportedURLs.FoodPanda]: {
        regex: /"dish-name fn p-name"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
        extractGroup: (str: string) => {
            str = str.replace(/dish-name fn p-name"[\S\s]*?>/g, '').replace(/\s{2,}/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 1);
        },
        priceRegex: /price p-price"[\S\s]*?>\s*(.*?)\s*</g,
        extractPrice: (str: string) => {
            str = str.replace(/\s*/g, '');
            return str.substring(str.indexOf('>') + 1, str.length - 2);
        }
    },
}