export default {
    updateStoredOption(state, val) {
        var pos = state.optionsChecked.indexOf(val)
        if (pos === -1) {
            state.optionsChecked.push(val)
        }
        else {
            state.optionsChecked.splice(pos, 1)
        }
    },
    setFieldValue (state, e) {
        const key = e.target.id
        const val = e.target.value
        console.log('id=' + key +' vlaue: ' + val);
        state.fieldValues[key] = val;
        console.log(state.fieldValues)
    }
}