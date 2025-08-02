import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";

const globalStyles = createGlobalStyle`
    ${Reset};

    *{
        box-sizing: border-box;
    }

`

export default globalStyles