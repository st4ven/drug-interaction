const {pool} = require("./pool");

/// This function gets the interaction between two drugs from the database
/// @param drug1: first drug
/// @param drug2: second drug
/// @return Interaction between the two drugs
async function getInteraction(drug1, drug2) {
    // command to query the database
    const query = `
      SELECT "severity"
      FROM "interactions"
      WHERE ("drug_1" = $1 AND "drug_2" = $2)
      OR ("drug_1" = $2 AND "drug_2" = $1)
    `;

    // get the drug names
    const values = [drug1, drug2];

    // query the database to find the interaction
    const result = await pool.query(query, values);

    // if found, return the interaction, if not, return no interaction found
    return result.rows[0] ? result.rows[0].severity : "No interaction found";
}

/// This function checks the interactions of all drugs in the drug list
/// @param drugList: list of drugs
/// @return List of interactions between drugs
async function checkInteractions(drugList) {
  // list of interactions
  const interactions = [];

  // run loop to go through the drug list
  // iterate through every possible pair of drugs
  for (let i = 0; i < drugList.length; i++) {
    for (let j = i + 1; j < drugList.length; j++) {
      const drug1 = drugList[i];
      const drug2 = drugList[j];

      // get the interaction
      const severity = await getInteraction(drug1, drug2);

      // store in interactions list if found interaction
      if (severity != "No interaction found") {
        interactions.push({drug1, drug2, severity});
      }
    }
  }

  // return the interactions list
  return interactions;
}
module.exports = {
  checkInteractions
};