import { emptyInput, openPage } from "../utils.cy";

const addStack = (input: string, eq: number) => {
  it("Добавляем элемент", () => {
    cy.get("input").type(input);
    cy.get("button").contains("Добавить").should("not.be.disabled").click();
    // cy.get("button").contains("Добавить").click();
    cy.get("[class^=stack-page_circles__box]").as("circles");
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(eq)
      .find("[class^=circle_circle]")
      .as(`${eq}-circle`);
    cy.get(`@${eq}-circle`)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains(input);

    cy.wait(500);

    cy.get(`@${eq}-circle`)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains(input);
  });
};

describe("", () => {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  openPage("Стек", "stack", "Стек");

  emptyInput("Добавить");

  addStack("123", 0);

  addStack("345", 1);
  addStack("678", 2);
  addStack("90", 3);

  it("Удаление элемента", () => {
    cy.get("[class^=stack-page_circles__box]").as("circles");
    cy.get("@circles").find("[class^=circle_content]").last().contains("90");
    cy.get("button").contains("Удалить").should("not.be.disabled").click();
    cy.wait(500);
    cy.get("@circles").find("[class^=circle_content]").last().contains("678");
  });

  it("Удаление всех элементов", () => {
    cy.get("[class^=stack-page_circles__box]").as("circles");
    cy.get("@circles").children();
    cy.get("button").contains("Очистить").should("not.be.disabled").click();
    cy.get("@circles").children().should("have.length", 0);
  });
});
