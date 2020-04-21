export let scaleRatio = {
    "full": 1,
    "two-thirds": 2 / 3,
    "one-half": 0.5,
    "one-third": 1 / 3,
}

export function calculateScale() {
    if (window.innerHeight > 1070) {
        return "full"
    } else if (window.innerHeight > 750) {
        return "two-thirds"
    } else {
        return "one-half"
    }
}


