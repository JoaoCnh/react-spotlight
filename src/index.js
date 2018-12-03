import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Spotlight from "./Spotlight";

library.add(faSearch);

const Kbd = styled.kbd`
  border: 1px solid #666666;
  border-radius: 4px;
  padding: 3px 5px;
  margin: 2px;
  color: #444444;
  text-decoration: none;
`;

render(
  <div>
    To open press <Kbd>ctrl</Kbd>
    <Kbd>space</Kbd>
    <Spotlight />
  </div>,
  document.querySelector("#app")
);
