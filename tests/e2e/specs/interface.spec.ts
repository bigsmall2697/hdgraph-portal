/* eslint-disable promise/no-nesting, promise/always-return, promise/catch-or-return */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

import { Ed25519PrivateKey } from "@hashgraph/sdk";

describe("Interface", () => {
    const menuButton = ".interface-form-title-container > button[type=submit]";
    const filesHeader = ":nth-child(2) > .nav-section-header > .nav-title";
    const filesTab = "nav.menu-open > div.nav-section:last-of-type";
    const cryptoTab = "nav.menu-open > div.nav-section:first-of-type";

    const { MNEMONIC_ACCOUNT_ID, CREATE_ACCOUNT_KEY, FILE_DL_ID } = Cypress.env();

    beforeEach(() => {
        cy.viewport("ipad-2");
        cy.visit("/").wait(1000).login().wait(100)
    });

    it("can navigate to create account through the menus, and use it", () => {
        cy.get(menuButton)
            .click().wait(1000)
            .get("a[href='/interface/create-account']")
            .click()
            .then(() => {
                cy.url().should("be", "/interface/create-account");
            });

        cy.get("div.form-main > div.text-input.has-suffix")
            .click()
            .type("1")
            .get("div.form-main > div.text-input:last-of-type")
            .click()
            .type(CREATE_ACCOUNT_KEY)
            .get(".form-footer > button")
            .click()
            .wait(100)
            .get("div.buttons > button:last-of-type")
            .click()
            .wait(2000)
            .get("div.button-container > button.copy-button")
            .click()
            .get("div.button-container > button.dismiss-button")
            .should("not.be.disabled")
            .click();
    });

    it("can navigate to upload file through the menus, and use it", () => {
        cy.get(menuButton)
            .click().wait(100)
            .get(filesTab)
            .click()
            .wait(100)
            .get("a[href='/interface/upload-file']")
            .click()
            .then(() => {
                cy.url().should("be", "/interface/upload-file");
            });

        cy.get("#file-upload").attachFile("testfile.txt").trigger("change", { force: true })
            .wait(2000)
            .get("div.buttons > button:last-of-type")
            .click()
            .wait(1000)
            .get("div.content-container > div.buttons > button:last-of-type")
            .click()
            .wait(3000)
            .get("div.button-container > button.copy-button")
            .click()
            .get("div.button-container > button.dismiss-button")
            .should("not.be.disabled")
            .click();
    });

    it("can navigate to download file through the menus, and use it", () => {
        cy.get(menuButton)
            .click()
            .get(filesHeader)
            .click()
            .get("a[href='/interface/download-file']")
            .click()
            .wait(100)
            .then(() => {
                cy.url().should("be", "/interface/download-file");
            });

        cy.get("input[placeholder='shard.realm.file']")
            .type(FILE_DL_ID)
            .get("div.download-container > button[type=submit]")
            .click()
            .get("div.buttons > button:last-of-type")
            .click()
            .get("div.button-container > button:first-of-type")
            .click();
        cy.get("a[download]").then((anchor) =>
            new Cypress.Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", anchor.prop("href"), true);
                xhr.responseType = "blob";

                xhr.addEventListener("load", () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                            resolve(reader.result);
                        });
                        reader.readAsText(blob);
                    }
                });
                xhr.send();
            })
        ).should("eq", "e2e test files")
            .get("div.button-container > button:last-of-type")
            .should("not.be.disabled")
            .click();
    });

    it("can navigate to transfer through the menus, and use it", () => {
        cy.get(menuButton)
            .click()
            .get(filesHeader)
            .click()
            .wait(100)
            .get(cryptoTab)
            .click()
            .get("a[href='/interface/send-transfer']")
            .click()
            .wait(100)
            .then(() => {
                cy.url().should("be", "/interface/send-transfer");
            });

        cy.get("div.form-main > div.has-suffix > label > .input-container").click().type("1")
            .get("input[placeholder='shard.realm.account or account']")
            .click()
            .type(MNEMONIC_ACCOUNT_ID)
            .get("span.thumb")
            .click()
            .get("div.memo-input")
            .click()
            .type("e2e test memo")
            .get("div.form-footer > button")
            .click()
            .get("div.buttons > button:last-of-type")
            .click()
            .wait(3000)
            .get("div.main.garlands > div.content-container > div.container > div.title")
            .contains(" Success ")
            .should("be.visible");
    });

    it("can export a Keystore", () => {
        const firstInput = ".password-with-confirm > :nth-child(1) > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";
        const secondInput = ".password-with-confirm > :nth-child(2) > .label-container > .input-container > .input-wrapper > .flex-container > .text-flex-item > input";
        const password = "horse are starting to take action...";

        cy
            .get(".export-keystore-icon")
            .click()
            .get(firstInput)
            .type(password)
            .get(secondInput)
            .type(password)
            .get(".btn-container > .btn")
            .click()
            .get(".download")
            .click();
        
        cy.get("a[download]").then((anchor) =>
            new Cypress.Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", anchor.prop("href"), true);
                xhr.responseType = "blob";

                xhr.addEventListener("load", () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                            resolve(reader.result);
                        });
                        reader.readAsArrayBuffer(blob);
                    }
                });
                xhr.send();
            })
        ).then(async(key) => {
            try {
                Ed25519PrivateKey.fromKeystore(
                    key as Uint8Array,
                    password
                );
                assert(true, "Successfully downloaded Keystore and checked Private key from Keystore");
            } catch {
                assert(false, "Unable to download Keystore and generate Private Key");
            }
        });
    });

    it("can log out", () => {
        cy
            .get(".bar-3")
            .click()
            .get(".logout-container > .logout")
            .click()
            .get(".button-logout")
            .click()
            .wait(100)
            .then(() => {
                cy.url().should("be", "/");
            });
    });
});
