import React from "react";
import { render } from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Spotlight from "./Spotlight";

library.add(faSearch);

render(<Spotlight />, document.querySelector("#app"));
