import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import ModalReportError from "../../../src/components/ModalReportError.vue";

describe("ModalReportError.Vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    Object.defineProperty(navigator, "userAgent", {
        get() {
            return "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6";
        }
    });

    it("renders closed", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalReportError, {
            localVue,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <!---->
                <div class="main">
                  <div class="content-container">
                    <div class="modal-container">
                      <div class="header">Something went wrong.</div>
                      <div class="sub-header">
                        Do you want to inform MHW about this error?
                      </div>
                      <div class="stack-trace">

                      </div>
                      <div class="sub-header">
                        (Optional) What went wrong?
                      </div>
                      <div class="text-input user-details is-multiline"><label class="label-container">
                          <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area resize"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                          <!----></span></label>
                        <!---->
                        <!---->
                      </div>
                      <div class="button-group"><button type="submit" class="button-cancel outline compact"><span>Cancel</span>
                          <!----></button> <button type="submit" class="button-send compact"><span>Send</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });

    it("renders open", (): void => {
        expect.assertions(1);

        const onChange = jest.fn();
        const wrapper = mount(ModalReportError, {
            localVue,
            propsData: {
                isOpen: false
            },
            listeners: {
                change: onChange
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div role="dialog" aria-modal="true" class="modal-background">
              <div class="modal">
                <!---->
                <div class="main">
                  <div class="content-container">
                    <div class="modal-container">
                      <div class="header">Something went wrong.</div>
                      <div class="sub-header">
                        Do you want to inform MHW about this error?
                      </div>
                      <div class="stack-trace">

                      </div>
                      <div class="sub-header">
                        (Optional) What went wrong?
                      </div>
                      <div class="text-input user-details is-multiline"><label class="label-container">
                          <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea rows="8" class="text-area resize"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                          <!----></span></label>
                        <!---->
                        <!---->
                      </div>
                      <div class="button-group"><button type="submit" class="button-cancel outline compact"><span>Cancel</span>
                          <!----></button> <button type="submit" class="button-send compact"><span>Send</span>
                          <!----></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
