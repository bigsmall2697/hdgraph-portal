import { mount, createLocalVue } from "@vue/test-utils";
import ModalFeeSummaryItems from "../../src/components/ModalFeeSummaryItems.vue";
import VueCompositionApi from "@vue/composition-api";
import BigNumber from "bignumber.js";

describe("ModalFeeSummaryItems.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    const items = [
        { description: "description", value: new BigNumber(1.23) },
        { description: "description", value: "public key" },
        { description: "description", value: new BigNumber(3.45) }
    ];

    it("renders with mixed item values", (): void => {
        expect.assertions(1);

        const wrapper = mount(ModalFeeSummaryItems, {
            localVue,
            propsData: {
                items
            }
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <div class="modal-fee-summary-items">
              <div class="row">
                <div class="description">
                  description
                </div>
                <div class="int text">
                  1
                </div>
                <div class="period text">
                  .
                </div>
                <div class="fraction text">
                  23
                </div>
                <div class="symbol text">
                  ℏ
                </div>
              </div>
              <div class="row">
                <div class="description">
                  description
                </div>
                <div class="text">
                  public key
                </div>
              </div>
              <div class="row">
                <div class="description">
                  description
                </div>
                <div class="int text">
                  3
                </div>
                <div class="period text">
                  .
                </div>
                <div class="fraction text">
                  45
                </div>
                <div class="symbol text">
                  ℏ
                </div>
              </div>
              <div class="row total">
                <div class="description">
                  Total
                </div>
                <div class="int text">
                  4
                </div>
                <div class="period text">
                  .
                </div>
                <div class="fraction text">
                  68
                </div>
                <div class="symbol text">
                  ℏ
                </div>
              </div>
            </div>
        `);
    });
});
