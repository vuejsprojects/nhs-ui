export default {
    setFieldValue(state, payload) {
        console.log('payload: ' + payload);
        state.fieldValues[payload.key] = payload.value;
        for (let k in state.fieldValues) {
            console.log('field values:' + k + ": " +
                state.fieldValues[k])
        };
    }
};
