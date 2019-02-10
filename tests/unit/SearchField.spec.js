import { shallowMount, createLocalVue } from "@vue/test-utils";
import SearchField from "@/components/SearchField.vue";
import Vuex from 'vuex'


const localVue = createLocalVue()
localVue.use(Vuex)


describe("SearchField.vue", () => {
  let wrapper;
  let mutations;
  let optname;
  let oid;
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

    oid = "name";
    optname = "name";
    wrapper = shallowMount(SearchField, {
      propsData: { oid, optname },
      store, localVue
    })
  });
  it("has a label and renders props.optname when passed", () => {
    expect(wrapper.html()).toContain('<label for="' + oid + '"')
    expect(wrapper.html()).toContain(optname + '</label>')
  });
  it('has a text input', () => {
    expect(wrapper.contains('input')).toBe(true)
  });
  // it is an alias for test
  test("Entering a drug name for field name should trigger setFieldValue", () => {

    const input = wrapper.find('input');
    const val = 'Paraceamol'
    input.setValue(val);
    const payload = {
      key: optname,
      value: val
    }
    expect(mutations.setFieldValue).toHaveBeenCalledWith(state, payload);
  });
  test("On entering text, the component method setFieldValue should be called", () => {
    const input = wrapper.find('input');
    const myMock = function(e) {
      const ev = e;
    }
    const setFieldValueMock = jest.fn()
    wrapper.setMethods({
      setFieldValue: setFieldValueMock
    });
    const val = 'Paraceamol'
    input.setValue(val);
    expect(setFieldValueMock).toHaveBeenCalled();
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
