describe("Роутинг", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("Открываем страницу Строки", function () {
    cy.get('a[href*="recursion"]').click();
    cy.contains("Строка");
  });

  it("При пустом инпуте кнопка неактивна", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Кнопка активируется при вводе в инпут", () => {
    cy.get("input").type("12345");
    cy.get("button").contains("Развернуть").should("not.be.disabled");
  });

  it("Запускаем алгоритм", () => {
    cy.get("button").contains("Развернуть").click();
  });
});
