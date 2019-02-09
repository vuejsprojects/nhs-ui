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
    setFieldValue (state, payload) {
        console.log('payload: ' + payload);
        state.fieldValues[payload.key] = payload.value;
        for(let k in state.fieldValues) {
            console.log('field values:' + k + ": " + 
            state.fieldValues[k])
        };
    }
}