import "./App.css";
import JsonExplorer from "./components/JsonExplorer";
import type { jsonData } from "./types";

const data: jsonData = {
    date: "2021-10-27T07:49:14.896Z",
    hasError: false,
    fields: [
        {
            id: "4c212130",
            prop: "iban",
            value: "DE81200505501265402568",
            hasError: false,
        },
    ],
    text: {
        title: {
            value: "Test title",
            hasError: false,
        },
        description: "Test description",
        text2: {
            title: {
                value: "Test title",
                hasError: false,
            },
            description: "Test description",
        },
    },
    text2: {
        title: {
            value: "Test title",
            hasError: false,
        },
        description: "Test description",
    },
};

function App() {
    return (
        <>
            <JsonExplorer res={data} />
        </>
    );
}

export default App;
