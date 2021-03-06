export default {
    setFieldValue(state, payload) {
        console.log('payload: ' + payload);
        state.fieldValues[payload.key] = payload.value;
        for (let k in state.fieldValues) {
            console.log('field values:' + k + ": " +
                state.fieldValues[k])
        };
    },
    resetFieldValue(state) {
        console.log('Reset all fileds');
        for (let k in state.fieldValues) {
                state.fieldValues[k] = ''
        };
    },
    setUserAuthorized(state, authorized) {
        console.log("setting setUserAuthorized: " + authorized)
        state.userAuthorized = authorized
    }
};
