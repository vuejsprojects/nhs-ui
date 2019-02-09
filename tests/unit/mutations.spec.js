import mutations from '@/ui-store/mutations'


test("optionsChecked is ['option1']", () => {
    const state = {
        options: ["Name", "Price", "Category", "Code", "Period",
            "Quantity", "Unit"],
        optionsChecked: []
    }
    const option_checked = 'option1'
    mutations.updateStoredOption(state, option_checked);
    expect(state.optionsChecked).toEqual([option_checked])
})

test('optionsChecked should be empty', () => {
    const state = {
        options: ["Name", "Price", "Category", "Code", "Period",
            "Quantity", "Unit"],
        optionsChecked: []
    }
    const option_checked = 'option1'
    mutations.updateStoredOption(state, option_checked);
    mutations.updateStoredOption(state, option_checked);
    expect(state.optionsChecked).toHaveLength(0)
})