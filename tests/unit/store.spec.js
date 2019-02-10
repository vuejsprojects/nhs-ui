import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/ui-store/store'
import { cloneDeep } from 'lodash'
import {free_search} from "@/ui-store/store_config"


// https://vue-test-utils.vuejs.org/guides/using-with-vuex.html

// testing a running store doesn't seem to work for mutations.
// let tests mutations separately.

describe("SearchOn.vue", () => {
    let the_store;

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)
        // https://github.com/euvl/vue-js-modal/issues/246
        // FOund the issue: cloneDeep doesn't work see issue above even with test-utils v1.0.0-beta.21
        // if the store is defined as exportt new Vuex.Store(some store object)
        // For it to work the store must be a simple onbject not a Vuex
        the_store = new Vuex.Store(cloneDeep(store))
    });

    test("Field names array doesn't conatinf free search", () => {
        expect(the_store.getters.fieldNames).not.toContain(free_search);
    })
    test("user entered 1234 in field price, price:1234 should be in fieldValues", () => {
        const fieldname = 'price';
        const fieldvalue = 1234;
        const payload = {
            key: fieldname,
            value: fieldvalue
        }
        the_store.commit('setFieldValue', payload)
        expect(the_store.state.fieldValues[fieldname]).toEqual(fieldvalue)
    })

    test('getters.freeSearchName = free_search', () => {
        expect(the_store.getters.freeSearchName).toEqual(free_search)
    })

    test('Tne number of field names shoule the same as the number of field valued', () => {
        expect(the_store.getters.fieldNames).toHaveLength(
            Object.keys(the_store.state.fieldValues).length - 1);
        expect(the_store.getters.fieldNames).toContain('price');
    })
})
