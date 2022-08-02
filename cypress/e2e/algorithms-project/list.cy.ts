import { openPage } from "../utils.cy";

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
    cy.get("@circles").children().first().contains("head");
    cy.get("@circles").children().last().contains("tail");
  });

  it("Добавляем в head", () => {
    cy.get("input[placeholder='Введите значение']").type("head");
    cy.contains("Добавить в head").should("not.be.disabled").click();
    cy.wait(1000);
    cy.get("[class^=list-page_circles__box]")
      .children()
      .first()
      .as("first")
      .contains("head");
    cy.get("@first").find("[class^=circle_circle]").contains("head");
    cy.wait(1000);
  });

  it("Добавляем в tail", () => {
    cy.get("input[placeholder='Введите значение']").type("tail");
    cy.contains("Добавить в tail").should("not.be.disabled").click();
    cy.wait(1000);
    cy.get("[class^=list-page_circles__box]")
      .children()
      .last()
      .as("first")
      .contains("tail");
    cy.get("@first").find("[class^=circle_circle]").contains("tail");
    cy.get("@first")
      .find("[class^=circle_circle]")
      .should("not.include.text", "hello");
    cy.wait(1000);
  });

  it("Удаляем из head", () => {
    cy.contains("Удалить из head").should("not.be.disabled").click();
    cy.wait(1000);
    cy.get("[class^=list-page_circles__box]")
      .children()
      .first()
      .find("[class^=circle_circle]")
      .should("not.include.text", "head");
  });

  it("Удаляем из tail", () => {
    cy.contains("Удалить из tail").should("not.be.disabled").click();
    cy.wait(1000);
    cy.get("[class^=list-page_circles__box]")
      .children()
      .last()
      .find("[class^=circle_circle]")
      .should("not.include.text", "tail");
  });

  it("Добавляем по индексу", () => {
    cy.get("input[placeholder='Введите значение']").as("value").type("idx1");
    cy.get("input[placeholder='Введите индекс']").as("index").type("0");
    cy.contains("Добавить по индексу")
      .should("not.be.disabled")
      .as("button")
      .click();

    cy.wait(1000);

    cy.get("[class^=list-page_circles__box]")
      .children()
      .eq(1)
      .find("[class^=circle_circle]")
      .as("element")
      .contains("idx1");

    cy.get("@value").type("idx2");
    cy.get("@index").type("0");
    cy.get("@button").click();

    cy.wait(1000);

    cy.get("@element").contains("idx2");
  });

  it("Удаляем по индексу", () => {
    cy.get("input[placeholder='Введите индекс']").as("index").type("1");
    cy.contains("Удалить по индексу")
      .should("not.be.disabled")
      .as("button")
      .click();

    cy.wait(3000);

    cy.get("[class^=list-page_circles__box]")
      .children()
      .eq(1)
      .find("[class^=circle_circle]")
      .as("element")
      .should("not.include.text", "idx2");

    cy.get("@index").type("1");
    cy.get("@button").click();

    cy.wait(3000);

    cy.get("@element").should("not.include.text", "idx1");
  });
});
