import { emptyInput, openPage } from "../utils.cy";

describe("", () => {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  openPage("Список", "list", "Связный список");

  it("Проверяем пустые инпуты", () => {
    cy.get("input[placeholder='Введите значение']").should("be.empty");
    cy.get("input[placeholder='Введите индекс']").should("be.empty");
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
  });

  it("Проверяем отрисовку дефолтного списка", () => {
    cy.get("[class^=list-page_circles__box]").as("circles");
    cy.get("@circles").children().should("not.have.length", 0);
    cy.get("@circles").children().first().contains('head')
    cy.get("@circles").children().last().contains('tail')
  });
});
