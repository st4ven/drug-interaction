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

  /// This function adds a drug to the drug list
  const handleAddDrug = () => {
    if (drug != "" && drugList.length < 5) {
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
    e.preventDefault();
    const result = await getDrugInteractions(drugList);
    setResult(result);
  }

  return (
    <div className="page">
        <div className="box">
          <InputForm setDrug={setDrug} drug={drug}></InputForm>
          <Buttons handleAddDrug={handleAddDrug} loadExample={loadExample} clearList={clearList}></Buttons>
          <DrugList handleDeleteDrug={handleDeleteDrug} drugList={drugList}></DrugList>
        </div>

        <button className="different" onClick={handleInteractions}>Check Interactions</button>

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
                {result.map((interaction, index) => (
                    <tr key={index}>
                      <td><strong>{index + 1}</strong></td>
                      <td>{interaction.drug1}</td>
                      <td>{interaction.drug2}</td>
                      <td>{interaction.severity}</td>
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
