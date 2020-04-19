import './index.css'
import { loadDefaultExampleAsset } from './exampleAssetLoader'
import { showScreen } from './router'
import './download'

const showHelpButton: HTMLButtonElement = document.querySelector('#show-help')
showHelpButton.onclick = () => showScreen("help")
const closeHelpbutton: HTMLButtonElement = document.querySelector("#close-help")
closeHelpbutton.onclick = () => showScreen("main")

loadDefaultExampleAsset()