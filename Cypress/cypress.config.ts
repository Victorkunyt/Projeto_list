// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
// 	retries: {
// 		runMode: 1,
// 		openMode: 0,
// 	},
// 	projectId: "b9yege",
// 	pageLoadTimeout: 80000,
// 	requestTimeout: 30000,
// 	viewportWidth: 1280,
// 	viewportHeight: 1000,
// 	experimentalWebKitSupport: true,
// 	chromeWebSecurity: false,
// 	theme: "dark",
// 	darkMediaQuery: true,
// 	screenshotOnRunFailure: true,
// 	screenshotsFolder: "cypress/report/screenshots",
// 	video: true,
// 	videosFolder: "cypress/report/videos",
// 	reporter: "cypress-mochawesome-reporter",
// 	reporterOptions: {
// 		reportDir: "cypress/report",
// 		overwrite: true,
// 		html: true,
// 		json: false,
// 		reportTitle: "Relatório de Testes local host",
// 		charts: true,
// 		timestamps: true,
// 		enableCode: true,
// 		quiet: true,
// 		inlineAssets: true,
// 	},
// 	env: {
// 		HOMOLOG: {

// 		}

// 	},

// 	e2e: {
// 		setupNodeEvents(on, config) {
// 			require("cypress-mochawesome-reporter/plugin")(on);

// const getConnection = (connection) => new defineConfig.ConnectionPool(connection)
// on("task", {
// execQueryDb({connection, query}) {

// return new Promise((resolve) => {

// getConnection(connection).connect().then((pool) => {

// return pool.query([query]).then((result) => {
// 	resolve(result)
// }).catch((err) => {
// 	console.log(`erro na conexão com o banco ${err}`)
// })

// })

// })


// }





// }


// )},
// 	},
// });