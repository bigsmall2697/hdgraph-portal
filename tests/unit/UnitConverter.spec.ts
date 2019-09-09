import { createLocalVue, mount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import UnitConverter from "../../src/components/UnitConverter.vue";

describe("UnitConverter.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(UnitConverter, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="unit-input">
              <div class="wrap">
                <div class="block-left">
                  <div class="select-block">
                    <div class="select" left="true">
                      <div class="select-value-container">
                        <div class="select-value">tinybar</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                        </svg>
                      </div>
                      <div class="select-menu">
                        <div class="select-option">
                          tinybar
                        </div>
                        <div class="select-option">
                          microbar
                        </div>
                        <div class="select-option">
                          millibar
                        </div>
                        <div class="select-option">
                          hbar
                        </div>
                        <div class="select-option">
                          kilobar
                        </div>
                        <div class="select-option">
                          megabar
                        </div>
                        <div class="select-option">
                          gigabar
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="input-block">
                    <div class="text-input is-compact is-white"><label class="label-container">
                        <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Amount" type="text" step="any" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                        <!----></span></label>
                      <!---->
                      <!---->
                    </div>
                  </div>
                </div>
                <div class="block-center">
                  <div class="convert-icon"><img src="../assets/swap.svg" alt=""></div>
                </div>
                <div class="block-right">
                  <div class="select-block">
                    <div class="select">
                      <div class="select-value-container">
                        <div class="select-value">hbar</div> <svg width="24" height="24" viewBox="0 0 24 24" class="icon">
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                        </svg>
                      </div>
                      <div class="select-menu">
                        <div class="select-option">
                          tinybar
                        </div>
                        <div class="select-option">
                          microbar
                        </div>
                        <div class="select-option">
                          millibar
                        </div>
                        <div class="select-option">
                          hbar
                        </div>
                        <div class="select-option">
                          kilobar
                        </div>
                        <div class="select-option">
                          megabar
                        </div>
                        <div class="select-option">
                          gigabar
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="input-block">
                    <div class="text-input is-compact is-white"><label class="label-container">
                        <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Amount" type="text" step="any" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                        <!----></span></label>
                      <!---->
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});
