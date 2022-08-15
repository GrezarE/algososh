export const emptyInput = (button: string) => {
  it("При пустом инпуте кнопка неактивна", () => {
    cy.get("input").should("be.empty");
    cy.contains(button).should("be.disabled");
  });
};

export const openPage = (page: string, href: string, string: string) => {
  it(`Открываем страницу ${page}`, function () {
    cy.get(`a[href*=${href}]`).click();
    cy.contains(string);
  });
};
