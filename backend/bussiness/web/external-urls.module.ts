import { get } from "request";
import { createWriteStream } from "fs-extra";

export interface IExternalURLsModule {
    getTemplateFromURL(url: string, pathToSaveAt: string): Promise<void>;
}

export class ExternalURLsModule implements IExternalURLsModule {

    getTemplateFromURL(url: string, pathToSaveAt: string) {
        return new Promise<void>((resolve, reject) => {
            get(url)
            .on('error', (error) => reject(error))
            .pipe(createWriteStream(pathToSaveAt))
            .on('finish', () => resolve())
            .on('error', (error) => reject(error))
        })
    }
}

const defaultExternalUrlModule =  new ExternalURLsModule();
export default defaultExternalUrlModule;