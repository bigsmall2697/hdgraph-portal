import { mount, createLocalVue } from "@vue/test-utils";
import ModalFeeSummaryItem from "../../src/components/ModalFeeSummaryItem.vue";
import VueCompositionApi from "@vue/composition-api";
import BigNumber from "bignumber.js";

describe("ModalFeeSummaryItem.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const description = "DESCRIPTION";
    const valueBigNumber = new BigNumber(123454.2390734);
    const valueString = "VALUE";

    it("renders with BigNumber value", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryItem, {
            localVue,
            propsData: {
                description,
                value: valueBigNumber
            }
        });

        expect(wrapper).toMatchInlineSnapshot();
    });

    it("renders with String value", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryItem, {
            localVue,
            propsData: {
                description,
                value: valueString
            }
        });

        expect(wrapper).toMatchInlineSnapshot();
    });
});
