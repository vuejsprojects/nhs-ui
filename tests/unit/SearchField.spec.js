import { shallowMount, createLocalVue } from "@vue/test-utils";
import TestField from "@/components/TestFIeld.vue";
import Vuex from 'vuex'


const localVue = createLocalVue()
localVue.use(Vuex)


describe("TestField.vue", () => {
  let wrapper;
  let mutations;
  let optname;
  let state;

  beforeEach(() => {
    mutations = {
      setFieldValue: jest.fn()
    };
    state = {
      options: ["Name", "Price", "Category", "Code", "Period",
        "Quantity", "Unit"],
      optionsChecked: [],
      fieldValues:
      {
        "name": "",
        "price": "",
        "category": "",
        "code": "",
        "feriod": "",
        "quantity": "",
        "unit": ""
      },
      stuff: ""
    }

    const store = new Vuex.Store({
      state,
      mutations
    });

    const oid = "id1";
    optname = "option_1";
    wrapper = shallowMount(TestField, {
      propsData: { oid, optname },
      store, localVue
    })
  });
  // it("has a label and renders props.optname when passed", () => {
  //   expect(wrapper.html()).toContain('<label for="id1">option_1</label>')
  // });
  // it('has a text input', () => {
  //   expect(wrapper.contains('input')).toBe(true)
  // });
  // it is an alias for test
  // test("Entering text should trigger setFieldValue", () => {

  //   const input = wrapper.find('input');
  //   const val = 'Paraceamol'
  //   input.setValue(val);
  //   expect(mutations.setFieldValue).toHaveBeenCalledWith(state, optname, val);
  // });
  test("On entering text, the component method setFieldValue should be called", () => {
    const input = wrapper.find('input');
    const myMock = function(e) {
      const ev = e;
    }
    const setFieldValueMock = myMock; //jest.fn()
    wrapper.setMethods({
      setFieldValue: setFieldValueMock
    });
    const val = 'Paraceamol'
    input.setValue(val);
    expect(setFieldValueMock).toHaveBeenCalledWith('stuff');
  });
  // test("On clicking the label, the component method setFieldValue should be called", () => {
  //   const label = wrapper.find('label');
  //   const setFieldValueMock = jest.fn()
  //   wrapper.setMethods({
  //     setFieldValue: setFieldValueMock
  //   });
  //   label.trigger('click');
  //   expect(setFieldValueMock).toHaveBeenCalled();
  // });
});
