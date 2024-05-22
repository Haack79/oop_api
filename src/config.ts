import * as dotenv from 'dotenv'
dotenv.config()

class Config {
    public MONGO_ATLAS_PW: string | undefined
    public JWT_KEY: string | undefined

    private readonly 

    constructor() {
        this.MONGO_ATLAS_PW = process.env.MONGO_ATLAS_PW
        this.JWT_KEY = process.env.JWT_KEY
    }
    public validateConfigOptions(): void {
        if (!this.MONGO_ATLAS_PW) {
            throw new Error('No mongo password set in env')
        }
        if (!this.JWT_KEY) {
            throw new Error('No jwt key set in env')
        }
    }
}
export const config: Config = new Config()
