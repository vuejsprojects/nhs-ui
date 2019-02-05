import { shallowMount, createLocalVue } from "@vue/test-utils";
import SearchOn from "@/components/SearchOn.vue";
import Vuex from 'vuex'


const localVue = createLocalVue()
localVue.use(Vuex)


describe("SearchOn.vue", () => {
  let wrapper;
  let mutations;
  let optname;
  let state;

  beforeEach(() => {
    mutations = {
      updateStoredOption: jest.fn()
    };
    state = {}

    const store = new Vuex.Store({
      state,
      mutations
    });

    const oid = "id1";
    optname ="option_1";
    wrapper = shallowMount(SearchOn, {
      propsData: { oid, optname },
      store, localVue
    })
  });
  it("has a label and renders props.optname when passed", () => {
      expect(wrapper.html()).toContain('<label for="id1">option_1</label>')
  });
  it('has a checkbox', () => {
    expect(wrapper.contains('input')).toBe(true)
  });
  // it is an alias for test
  test("CLicking the lable should trigger updateStoreOtion", () => {

    const input = wrapper.find('input');
    input.trigger('click');
    expect(mutations.updateStoredOption).toHaveBeenCalledWith(state,  "option_1");
  });
  test("On clicking the checkbox, the component method updateStoredOption should be called", () => {
    const input = wrapper.find('input');
    const updateStoredOptionMock = jest.fn()
    wrapper.setMethods( {
      updateStoredOption: updateStoredOptionMock
    });
    input.trigger('click');
    expect(updateStoredOptionMock).toHaveBeenCalled();
  });
  test("On clicking the label, the component method updateStoredOption should be called", () => {
    const label = wrapper.find('label');
    const updateStoredOptionMock = jest.fn()
    wrapper.setMethods( {
      updateStoredOption: updateStoredOptionMock
    });
    label.trigger('click');
    expect(updateStoredOptionMock).toHaveBeenCalled();
  });
});
