import { loadDefaultExampleAsset } from './src/exampleAssetLoader.js'
import { showScreen } from './src/router.js'
import './src/download.js'

const showHelpButton = document.querySelector('#show-help')
showHelpButton.onclick = () => showScreen("help")
const closeHelpbutton = document.querySelector("#close-help")
closeHelpbutton.onclick = () => showScreen("main")

loadDefaultExampleAsset()