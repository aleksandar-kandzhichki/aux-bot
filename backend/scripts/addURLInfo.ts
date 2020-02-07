import { mongoConnect } from "../dbConnection"
import defaultURLInfoStorage from "../storage/url-info.storage";

(async () => {
    await mongoConnect();
    let urlInfo = [
        {
            name: "Takeaway",
            urlKeyword: "takeaway",
            config: {
                foodRegex: /data-product-name="(.*?)"/g,
                priceRegex: /meal__price"[\S\s]*?>\s*(.*?)\s*</g,
                restaurantNameRegex: /restaurant-name"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
            }
        },
        {
            name: "Foodpanda",
            urlKeyword: "foodpanda",
            config: {
                foodRegex: /"dish-name fn p-name"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
                priceRegex: /price p-price"[\S\s]*?>\s*(.*?)\s*</g,
                restaurantNameRegex: /vendor-info-main-headline item"[\S\s]*?>[\S\s]*?>\s*(.*?)\s*</g,
            }
        }
    ]
    for (let conf of urlInfo) {
        await defaultURLInfoStorage.addNewURL(conf);
        console.log(`added config with name - ${conf.name}!`)
    }
    process.exit();
})();