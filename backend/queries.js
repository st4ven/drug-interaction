import supabase from "./supabase.js";

/// This function gets the interaction between two drugs from the database
/// @param drug1: first drug
/// @param drug2: second drug
/// @return Interaction between the two drugs
async function getInteraction(drug1, drug2) {
  // command to query the database

  const { data: data1, error: error1 } = await supabase
  .from('interactions')
  .select('severity')
  .eq('drug_1', drug1)
  .eq('drug_2', drug2);

  const { data: data2, error: error2 } = await supabase
    .from('interactions')
    .select('severity')
    .eq('drug_1', drug2)
    .eq('drug_2', drug1);

  if (error1 || error2) {
    console.error('Error fetching interaction:', error1 || error2);
    return 'Error fetching interaction';
  }

  const combinedData = [...data1, ...data2];

  // return severity if interaction was found;
  return combinedData && combinedData.length > 0 ? combinedData[0].severity : 'No interaction found';
}



/// This function checks the interactions of all drugs in the drug list
/// @param drugList: list of drugs
/// @return List of interactions between drugs
export async function checkInteractions(drugList) {
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