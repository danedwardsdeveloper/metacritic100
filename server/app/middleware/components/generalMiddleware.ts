import express, { Express } from 'express'
import cookieParser from 'cookie-parser'

export default function setupGeneralMiddleware(app: Express) {
	app.use(express.json())
	app.use(cookieParser())
}