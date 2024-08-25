

import React, { useState } from "react";
import axios from "axios";

function App() {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post("https://bajajbackend-g2c5.onrender.com/bfhl", parsedInput);
            setResponse(res.data);
        } catch (error) {
            alert("Invalid JSON or Error in API Call");
        }
    };

    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {selectedOptions.includes("Alphabets") && <div>Alphabets: {response.alphabets.join(", ")}</div>}
                {selectedOptions.includes("Numbers") && <div>Numbers: {response.numbers.join(", ")}</div>}
                {selectedOptions.includes("Highest lowercase alphabet") && <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(", ")}</div>}
            </div>
        );
    };

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
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <div>
                <input type="checkbox" value="Alphabets" onChange={handleChange} /> Alphabets
                <input type="checkbox" value="Numbers" onChange={handleChange} /> Numbers
                <input type="checkbox" value="Highest lowercase alphabet" onChange={handleChange} /> Highest lowercase alphabet
            </div>
            <div>{renderResponse()}</div>
        </div>
    );
}

export default App;
