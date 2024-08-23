const InputForm = ({drug, setDrug}) => {
    return (
        <>
        <h1>Drug Interactions</h1>

        <div className="together">
            <label htmlFor="drug">Check for potential risks of drug co-administrations:</label>
            <input type="text" id="drug" placeholder="Enter a drug name" value={drug} onChange={(e) => setDrug(e.target.value)}></input>
        </div>
        </>
    )
}

export default InputForm;