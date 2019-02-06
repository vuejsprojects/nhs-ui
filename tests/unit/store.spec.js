import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store'
import { cloneDeep } from 'lodash'


// https://vue-test-utils.vuejs.org/guides/using-with-vuex.html

// testing a running store doesn't seem to work for mutations.
// let tests mutations separately.

test("optionsChecked is ['option1']", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    // https://github.com/euvl/vue-js-modal/issues/246
    // FOund the issue: cloneDeep doesn't work see issue above even with test-utils v1.0.0-beta.21
    // if the store is defined as exportt new Vuex.Store(some store object)
    // For it to work the store must be a simple onbject not a Vuex
    const the_store = new Vuex.Store(cloneDeep(store))
    const option_checked = 'option1'
    the_store.commit('updateStoredOption', option_checked)
    expect(the_store.state.optionsChecked).toEqual([option_checked])
})

test('optionsChecked should be empty', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const the_store = new Vuex.Store(store)
    expect(the_store.state.optionsChecked).toHaveLength(0)
})

