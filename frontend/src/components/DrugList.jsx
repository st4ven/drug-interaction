const DrugList = ({drugList, handleDeleteDrug}) => {
    return (
        <>
            <div className="centered">
            {drugList.map((drug, index) => 
              <li key={index}>
                <strong>{drug}</strong>
                <button onClick={() => handleDeleteDrug(index)}>X</button>
              </li>
            )}
          </div>
        </>
    )
}

export default DrugList;