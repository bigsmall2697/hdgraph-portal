import { shallowMount } from "@vue/test-utils";
import Warning from "../../src/components/Warning.vue";

describe("Warning.vue", (): void => {
    it("renders", (): void => {
        const title = "NOT RECOMMENDED";
        const wrapper = shallowMount(Warning, {
            propsData: { title }
        });

        expect(wrapper.isVisible()).toBe(true);
        expect(wrapper.text()).toMatch(title);
    });
});
