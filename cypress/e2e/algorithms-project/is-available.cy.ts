import { openPage } from "../utils.cy";

it("Приложение поднялось на localhost:3000", function () {
  cy.visit("http://localhost:3000");
  cy.contains("МБОУ АЛГОСОШ");
});
