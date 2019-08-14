import { shallowMount } from "@vue/test-utils";
import InterfaceForm from "@/components/InterfaceForm.vue";
import InterfaceFormTitle from "@/components/InterfaceFormTitle.vue";

describe("InterfaceForm.vue", (): void => {
    it("renders", (): void => {
        expect.assertions(1);
        const title = "ABC123";
        const wrapper = shallowMount(InterfaceForm, {
            propsData: {
                title
            }
        });

        expect(wrapper.find(InterfaceFormTitle).props().title).toBe(title);
    });
});
