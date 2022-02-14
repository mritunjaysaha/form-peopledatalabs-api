import axios from "axios";
import { useState } from "react";
import { CSVDownload } from "react-csv";
import "./App.css";
import { Form, FormInput } from "./Components/Forms";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
    const initialValues = {
        first_name: "sean",
        last_name: "thorne",
        socials: "www.linkedin.com/in/seanthorne/",
    };

    const [csvData, setCsvData] = useState([]);

    async function handleSubmit(e, form) {
        e.preventDefault();

        console.log("Handle submit clicked", { form });

        const { socials, first_name, last_name } = form;

        await axios
            .get(
                `https://api.peopledatalabs.com/v5/person/enrich?api_key=${API_KEY}&pretty=True&profile=${socials}`
            )
            .then((res) => {
                const { data } = res;

                const { emails } = data.data;

                console.log({ emails });
                setCsvData([...emails]);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="App">
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div>
                    <div>
                        <FormInput name="first_name" label="First Name" />
                    </div>
                    <div>
                        <FormInput name="last_name" label="Last Name" />
                    </div>
                    <div>
                        <FormInput name="socials" label="Socials" />
                    </div>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </Form>
            {csvData.length > 0 ? (
                <CSVDownload data={csvData} target="_blank" />
            ) : (
                ""
            )}
        </div>
    );
}

export default App;
