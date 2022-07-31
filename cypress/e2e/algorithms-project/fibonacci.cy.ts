import { emptyInput, openPage } from "../utils.cy";

describe("", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  openPage("Фибоначчи", "fibonacci", "Последовательность Фибоначчи");

  emptyInput();

  it("Кнопка активируется при вводе в инпут", () => {
    cy.get("input").type("5");
    cy.get("button").contains("Развернуть").should("not.be.disabled");
  });

  it("Запускаем алгоритм", () => {
    cy.get(`[class^=fibonacci-page_circles__box]`).as("circles");
    cy.get("button").contains("Развернуть").click();
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(0)
      .find("[class^=circle_circle]")
      .contains("1");

    cy.wait(500);

    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(1)
      .find("[class^=circle_circle]")
      .contains("1");

    cy.wait(500);

    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(2)
      .find("[class^=circle_circle]")
      .contains("2");

    cy.wait(500);

    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(3)
      .find("[class^=circle_circle]")
      .contains("3");

    cy.wait(500);

    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(4)
      .find("[class^=circle_circle]")
      .contains("5");

    cy.wait(500);

    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(5)
      .find("[class^=circle_circle]")
      .contains("8");
  });
});
