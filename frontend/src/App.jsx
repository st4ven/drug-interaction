import { useState } from 'react';
import {getDrugInteractions} from './components/DrugService';
import Buttons from './components/Buttons';
import InputForm from './components/InputForm';
import DrugList from './components/DrugList';

function App() {
  // variable consts
  const [result, setResult] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [drug, setDrug] = useState("");
  const [loading, setLoading] = useState(false);

  /// This function adds a drug to the drug list
  const handleAddDrug = () => {
    if (drug != "" && drugList.length < 6) {
      setDrugList([...drugList, drug]);
      setDrug("");
    }
  }

  /// This function deletes a drug from the drug list
  const handleDeleteDrug = (i) => {
    const deleteDrugs = [...drugList];
    deleteDrugs.splice(i, 1);
    setDrugList(deleteDrugs);
  }

  /// This function clears the list and results table
  const clearList = () => {
    setDrugList([]);
    setResult([]);
  }

  /// This function loads an example list into the drug list
  const loadExample = () => {
    setDrugList(["Omeprazole", "Fosphenytoin", "Fludrocortisone", "Citalopram", "Vandetanib", "Clotrimazole"]);
  }

  /// This function handles getting the drug interactions from the API
  const handleInteractions = async (e) => {
    setLoading(true);
    e.preventDefault();
    const result = await getDrugInteractions(drugList);
    setLoading(false);
    setResult(result);
  }

  const severityOrder = { Major: 1, Moderate: 2, Minor: 3, Unknown: 4 };

  const sortedResult = [...result].sort((a, b) => {
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
  return (
    <div className="page">
        <div className="box">
          <InputForm setDrug={setDrug} drug={drug}></InputForm>
          <Buttons handleAddDrug={handleAddDrug} loadExample={loadExample} clearList={clearList}></Buttons>
          <DrugList handleDeleteDrug={handleDeleteDrug} drugList={drugList}></DrugList>
        </div>

        <button className="different" onClick={handleInteractions}>
          {loading ? 'Loading...' : 'Check Interactions'}
        </button>

        <div className="table">
          {result.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Drug 1</th>
                  <th>Drug 2</th>
                  <th>Level</th>
                  </tr>
              </thead>

              <tbody>
                {sortedResult.map((interaction, index) => (
                    <tr key={index} className={interaction.severity === 'Major' ? 'major' : interaction.severity === 'Moderate' ? 'moderate' : interaction.severity === 'Minor' ? 'minor' : interaction.severity === 'Unknown' ? 'unknown' : ''}>
                      <td><strong>{index + 1}</strong></td>
                      <td className="part">{interaction.drug1}</td>
                      <td className="part">{interaction.drug2}</td>
                      <td className="part">{interaction.severity}</td>
                    </tr>
                ))}
              </tbody>
            </table>
        )}
          </div>
    </div>
  )
}

export default App;
