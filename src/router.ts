export const showScreen = (screen) => {
    if (screen === "preview-download") {
        document.body.className = "preview-download-screen"
    } else if (screen === "main") {
        document.body.className = "main-screen"
    } else if (screen === "render") {
        document.body.className = "render"
    } else if (screen === "help") {
        document.body.className = "help-screen"
    }
}