import mongoose from 'mongoose'
import chalk from 'chalk'

import { dbConnectionString } from '../../utils/environmentChecks.js'

export const connectDB = async () => {
    try {
        await mongoose.connect(dbConnectionString)
        console.log(chalk.green('MongoDB connected successfully'))
    } catch (error) {
        console.error(chalk.red('MongoDB connection error:'), error)
        process.exit(1)
    }
}