export const showScreen = (screen) => {
    if (screen === "download") {
        document.body.className = "download-screen"
    } else if (screen === "main") {
        document.body.className = "main-screen"
    } else if (screen === "render") {
        document.body.className = "render"
    } else if (screen === "help") {
        document.body.className = "help-screen"
    }
}