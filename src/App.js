

import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
           
            const res = await axios.post("https://bajajbackend-3-7uq6.onrender.com/bfhl", parsedInput);
            setResponse(res.data);
        } catch (error) {
            alert("Invalid JSON or Error in API Call");
        }
    };

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions || []);
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {selectedOptions.some(option => option.value === "Alphabets") && (
                    <div>Alphabets: {response.alphabets.join(", ")}</div>
                )}
                {selectedOptions.some(option => option.value === "Numbers") && (
                    <div>Numbers: {response.numbers.join(", ")}</div>
                )}
                {selectedOptions.some(option => option.value === "Highest lowercase alphabet") && (
                    <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(", ")}</div>
                )}
            </div>
        );
    };

    const options = [
        { value: "Alphabets", label: "Alphabets" },
        { value: "Numbers", label: "Numbers" },
        { value: "Highest lowercase alphabet", label: "Highest lowercase alphabet" },
    ];

    return (
        <div className="App">
            <h1>{response?.roll_number}</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
                rows={10}
                cols={50}
            />
            <br />
            <button style={{background:'blue',width:'400px',height:'50px',color:'white'}} onClick={handleSubmit}>Submit</button>
            <br />
            <Select
                isMulti
                options={options}
                onChange={handleSelectChange}
                value={selectedOptions}
                placeholder="Select options..."
                styles={{ container: (provided) => ({ ...provided, width: '400px', marginTop: '20px' }) }}
            />
            <div>{renderResponse()}</div>
        </div>
    );
}

export default App;

