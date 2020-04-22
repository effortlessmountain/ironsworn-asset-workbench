import './index.css'
import { Editor } from './Editor/Editor'
import App from './App'
import { showScreen } from './router'
import { closeDownload, renderOnCanvas } from './download'
import './download'
import ReactDOM from 'react-dom'
import React from 'react'


// ReactDOM.render(<Editor
//     closeDownload={closeDownload}
//     renderOnCanvas={renderOnCanvas}></Editor>, document.querySelector('.editor-container'))

ReactDOM.render(<App></App>, document.querySelector('.app-container'), () => {
    const closeHelpbutton: HTMLButtonElement = document.querySelector("#close-help")
    closeHelpbutton.onclick = () => showScreen("main")

    const closeDownloadbutton: HTMLButtonElement = document.querySelector("#done-downloading")
    closeDownloadbutton.onclick = closeDownload
})