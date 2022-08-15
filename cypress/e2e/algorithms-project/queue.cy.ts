import { emptyInput, openPage } from "../utils.cy";

const addQueue = (input: string, eq: number) => {
  it("Добавляем элемент", () => {
    cy.get("input").type(input);
    cy.get("button").contains("Добавить").should("not.be.disabled").click();
    cy.get("[class^=queue-page_circles__box]").as("circles");
    cy.get("@circles")
      .find("[class^=circle_content]")
      .eq(eq)
      .as(`${eq}-circle`);

    cy.get(`@${eq}-circle`)
      .find("[class^=circle_circle]")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(500);

    cy.get(`@${eq}-circle`)
      .find("[class^=circle_circle]")

      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains(input);
    cy.get(`@${eq}-circle`).contains("tail");
    cy.get("@circles").find("[class^=circle_content]").first().contains("top");
  });
};

describe("Очередь", () => {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  openPage("Очередь", "queue", "Очередь");

  emptyInput("Добавить");

  addQueue("123", 0);
  addQueue("456", 1);
  addQueue("789", 2);
  addQueue("000", 3);

  it("Удаляем первый элемент", () => {
    cy.get("[class^=queue-page_circles__box]").as("circles");
    cy.get("@circles").find("[class^=circle_content]").first().contains("top");
    cy.get("button").contains("Удалить").should("not.be.disabled").click();
    cy.wait(500);
    cy.get("@circles").find("[class^=circle_content]").eq(1).contains("top");
  });

  it("Удаляем второй элемент", () => {
    cy.get("[class^=queue-page_circles__box]").as("circles");
    cy.get("@circles").find("[class^=circle_content]").eq(1).contains("top");
    cy.get("button").contains("Удалить").should("not.be.disabled").click();
    cy.wait(500);
    cy.get("@circles").find("[class^=circle_content]").eq(2).contains("top");
  });

  it("Удаление всех элементов", () => {
    cy.get("[class^=queue-page_circles__box]").as("circles");
    cy.get("button").contains("Очистить").should("not.be.disabled").click();
    cy.get("@circles")
      .children()
      .each(($el) => {
        expect($el.find("[class^=circle_circle]").text()).equal("");
      });
  });
});
