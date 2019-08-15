import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import TextInput from "../../src/components/TextInput.vue";
import { plugin as VueFunctionApi } from "vue-function-api";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

describe("TextInput.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueFunctionApi);

    it("renders", (): void => {
        expect.assertions(2);
        const value = "12345";
        const wrapper = shallowMount(TextInput, {
            localVue,
            propsData: { value }
        });

        const inputElement = wrapper.find("input").element as HTMLInputElement;

        expect(inputElement.getAttribute("type")).toBe("text");
        expect(inputElement.value).toBe(value);
    });

    it("renders a password securely (and allows to toggle visibility)", (): void => {
        expect.assertions(2);
        const value = "super-secure-password";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: { obscure: true, value }
        });

        let inputElement = wrapper.find("input").element as HTMLInputElement;
        expect(inputElement.getAttribute("type")).toBe("password");

        // Expose the password
        wrapper.find(".eye").trigger("click");

        inputElement = wrapper.find("input").element as HTMLInputElement;
        expect(inputElement.getAttribute("type")).toBe("text");
    });

    it("forwards input event from HTML input", (): void => {
        expect.assertions(1);
        let value = "";

        const wrapper = shallowMount(TextInput, {
            localVue,
            propsData: { obscure: true, value },
            listeners: {
                input(newValue: string): void {
                    value = newValue;
                }
            }
        });

        const newValue = "12345";

        // Trigger an INPUT event (user typing on keyboard)
        (wrapper.find("input").element as HTMLInputElement).value = newValue;
        wrapper.find("input").trigger("input");

        expect(value).toBe(newValue);
    });

    it("render textarea when multiline", (): void => {
        expect.assertions(2);
        const placeholder = "placeholder text";
        const value = "textarea text";
        const wrapper = shallowMount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                placeholder,
                value
            }
        });

        const textAreaElement = wrapper.find("textarea")
            .element as HTMLTextAreaElement;

        expect(textAreaElement.getAttribute("placeholder")).toBe(placeholder);
        expect(textAreaElement.value).toBe(value);
    });

    it("renders label when it's not null", (): void => {
        expect.assertions(2);
        const label = "label text";
        const wrapper = shallowMount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label
            }
        });

        expect(wrapper.contains(".label")).toBe(true);
        expect(wrapper.find(".label").text()).toBe(label);
    });

    it("renders validation indicator when showValidation is true", (): void => {
        expect.assertions(1);
        const showValidation = true;
        const valid = true;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                showValidation,
                valid
            }
        });

        expect(wrapper.contains(MaterialDesignIcon)).toBe(true);
    });

    it("renders copy action when canCopy is true", (): void => {
        expect.assertions(1);
        const copyText = "Copy";
        const canCopy = true;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label: "",
                canCopy
            }
        });

        expect(
            wrapper
                .findAll(".action")
                .filter((e): boolean => e.text() === copyText)
        ).toHaveLength(1);
    });

    it("renders clear action when canClear is true", (): void => {
        expect.assertions(1);
        const clearText = "Clear";
        const canClear = true;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label: "",
                canClear
            }
        });

        expect(
            wrapper
                .findAll(".action")
                .filter((e): boolean => e.text() === clearText)
        ).toHaveLength(1);
    });

    it("does not render validation indicator when showValidation is false", (): void => {
        expect.assertions(1);
        const showValidation = false;
        const valid = true;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                showValidation,
                valid
            }
        });

        expect(wrapper.contains(MaterialDesignIcon)).toBe(false);
    });

    it("does not render copy action when canCopy is false", (): void => {
        expect.assertions(1);
        const copyText = "Copy";
        const canCopy = false;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label: "",
                canCopy
            }
        });

        expect(
            wrapper
                .findAll(".action")
                .filter((e): boolean => e.text() === copyText)
        ).toHaveLength(0);
    });

    it("does not render clear action when canClear is false", (): void => {
        expect.assertions(1);
        const clearText = "Clear";
        const canClear = false;
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                label: "",
                canClear
            }
        });

        expect(
            wrapper
                .findAll(".action")
                .filter((e): boolean => e.text() === clearText)
        ).toHaveLength(0);
    });

    it("renders error message when it isn't null", (): void => {
        expect.assertions(1);
        const error = "ERROR: foo";
        const wrapper = mount(TextInput, {
            localVue,
            propsData: {
                multiline: true,
                error,
                valid: false,
                showValidation: true
            }
        });

        expect(wrapper.find(".error").text()).toBe(error);
    });
});
