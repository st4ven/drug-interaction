const Buttons = ({handleAddDrug,loadExample, clearList}) => {
    return (
        <>
            <div className="buttons">
            <button className="list" onClick={handleAddDrug}>Add Drug</button>
            <button className="list" onClick={loadExample}>Load Example</button>
            <button className="list" onClick={clearList}>Clear List</button>
          </div>
        </>
    )
}

export default Buttons;