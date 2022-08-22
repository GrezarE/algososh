export const backButton = () => {
  it("Возвращаемся на главную страницу", () => {
    cy.wait(500);
    cy.get("button").contains("К оглавлению").click();
    cy.contains("МБОУ АЛГОСОШ");
    cy.wait(500);
  });
};

describe("Роутинг", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("Открываем страницу Строки", function () {
    cy.get('a[href*="recursion"]').click();
    cy.contains("Строка");
  });

  backButton();

  it("Открываем страницу Фибоначчи", function () {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  backButton();

  it("Открываем страницу Сортировки массива", function () {
    cy.get('a[href*="sorting"]').click();
    cy.contains("Сортировка массива");
  });

  backButton();

  it("Открываем страницу Стек", function () {
    cy.get('a[href*="stack"]').click();
    cy.contains("Стек");
  });

  backButton();

  it("Открываем страницу Очередь", function () {
    cy.get('a[href*="queue"]').click();
    cy.contains("Очередь");
  });

  backButton();

  it("Открываем страницу Связный список", function () {
    cy.get('a[href*="list"]').click();
    cy.contains("Связный список");
  });

  backButton();
});
