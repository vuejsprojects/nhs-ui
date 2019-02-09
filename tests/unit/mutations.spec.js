import mutations from '@/ui-store/mutations'
import {free_search} from '@/ui-store/store_config'

test('should be abale to set a field value', () => {
    const state = {
        fieldValues:
        {
            "name": "",
            "price": "",
            "category": "",
            "code": "",
            "period": "",
            "quantity": "",
            "unit": "",
            [free_search]: ""
        }
    }
    const fieldname = 'price';
    const fieldvalue = 1234;
    const payload = {
        key: fieldname,
        value: fieldvalue
    }
    mutations.setFieldValue(state, payload);
    expect(state.fieldValues[fieldname]).toEqual(fieldvalue)
})