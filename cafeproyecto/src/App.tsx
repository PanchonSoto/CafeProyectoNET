import { BrowserRouter } from "react-router-dom";
import { Theme } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';

import './App.css';
import { Layout } from "./routes/RouteLayout";

function App() {
    return (
        <Theme appearance="light">
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </Theme>
    );
}

export default App;
