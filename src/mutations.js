export default {
    updateStoredOption(state, val) {
        var pos = state.optionsChecked.indexOf(val)
        if (pos === -1) {
            state.optionsChecked.push(val)
        }
        else {
            state.optionsChecked.splice(pos, 1)
        }
    }
}