import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(`${__dirname}/.env.test`) })

jest.setTimeout(300_000)
