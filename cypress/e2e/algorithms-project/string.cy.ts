import { emptyInput, openPage } from "../utils.cy";

describe("Проверки страницы Строка", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  openPage("Строки", "recursion", "Строка");

  emptyInput("Развернуть");

  it("Кнопка активируется при вводе в инпут", () => {
    cy.get("input").type("12345");
    cy.get("button").contains("Развернуть").should("not.be.disabled");
  });

  it("Запускаем алгоритм", () => {
    cy.get("[class^=string_circles__box]").as("circles");
    cy.get("button").contains("Развернуть").click();
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(0)
      .find("[class^=circle_circle]")
      .as("first-circle");
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(1)
      .find("[class^=circle_circle]")
      .as("second-circle");
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(2)
      .find("[class^=circle_circle]")
      .as("third-circle");
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(3)
      .find("[class^=circle_circle]")
      .as("fourth-circle");
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(4)
      .find("[class^=circle_circle]")
      .as("fifth-circle");
    cy.get("@first-circle")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("1");
    cy.get("@fifth-circle")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("5");

    cy.wait(500);

    cy.get("@first-circle")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("5");
    cy.get("@second-circle")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("2");
    cy.get("@third-circle")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("3");
    cy.get("@fourth-circle")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("4");
    cy.get("@fifth-circle")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("1");

    cy.wait(500);

    cy.get("@second-circle")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("4");
    cy.get("@third-circle")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("3");
    cy.get("@fourth-circle")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("2");

    cy.wait(500);

    cy.get("@third-circle")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("3");
  });
});
