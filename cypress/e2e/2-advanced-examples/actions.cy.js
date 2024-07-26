it("user should be able to view the home page and change the current interval", () => {
	cy.visit("http://localhost:3000");

	cy.get(".username").contains("John Doe");
	cy.get(".sleep-score").contains("44");

	cy.get(".username").contains("Jane Doe");
	cy.get(".sleep-score").contains("77");

	cy.get(".username").contains("Jim Doe");
	cy.get(".sleep-score").contains("76");
	//
	cy.get("select").select("2017-03-08");
	cy.get(".username").contains("John Doe");
	cy.get(".sleep-score").contains("58");

	cy.get(".username").contains("Jane Doe");
	cy.get(".sleep-score").contains("91");

	cy.get(".username").contains("Jim Doe");
	cy.get(".sleep-score").contains("82");

	//
	cy.get("select").select("2017-03-07");
	cy.get(".username").contains("John Doe");
	cy.get(".sleep-score").contains("47");

	cy.get(".username").contains("Jane Doe");
	cy.get(".sleep-score").contains("95");

	cy.get(".username").contains("Jim Doe");
	cy.get(".sleep-score").contains("86");
});
