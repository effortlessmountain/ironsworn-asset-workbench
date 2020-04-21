import { showAssetIn } from './Asset/Asset'
import { showScreen } from './router'
import html2canvas from 'html2canvas'

export function renderOnCanvas(asset, scale, callback) {
    console.log('Scale', scale)
    const downloadContainer = document.querySelector(".image-container")
    const render = document.querySelector('.render')
    showScreen('render')
    showAssetIn(render, asset, scale, () => {
        window.scrollTo(0, 0)
        html2canvas(render.firstChild as HTMLElement,
            {
                allowTaint: true
            }).then(canvas => {
                downloadContainer.appendChild(canvas)
                callback(canvas)
            })
    })
    console.log('childrens', render)
}

export function closeDownload() {
    const downloadContainer = document.querySelector(".image-container")
    downloadContainer.innerHTML = ""
    showScreen('main')
}



