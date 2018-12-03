import React, { Component } from "react";
import { groupBy } from "lodash-es";

import Hits from "components/Hits";
import Overlay from "components/Overlay";
import SearchBar from "components/SearchBar";
import SpotlightContext from "components/SpotlightContext";

const DEFAULT_STATE = {
  hits: {},
  flatHits: [],
  isOpen: false,
  selectedResultIndex: 0
};

class Spotlight extends Component {
  state = {
    ...DEFAULT_STATE,
    toggle: () => {
      this.setState({ isOpen: !this.state.isOpen });
    },
    clearSearch: (close = false) => {
      this.setState({ ...DEFAULT_STATE, isOpen: !close });
    },
    selectHit: selectedResultIndex => {
      if (selectedResultIndex === this.state.selectedResultIndex) {
        return;
      }

      this.setState({ selectedResultIndex });
    },
    selectUp: () => {
      const { flatHits, selectedResultIndex } = this.state;

      if (selectedResultIndex > 0) {
        this.setState({ selectedResultIndex: selectedResultIndex - 1 });
        return;
      }

      this.setState({ selectedResultIndex: flatHits.length - 1 });
    },
    selectDown: () => {
      const { flatHits, selectedResultIndex } = this.state;

      if (selectedResultIndex < flatHits.length - 1) {
        this.setState({ selectedResultIndex: selectedResultIndex + 1 });
        return;
      }

      this.setState({ selectedResultIndex: 0 });
    },
    handleKeyUp: input => {
      const { clearSearch, performSearch } = this.state;

      if (!input) {
        return;
      }

      if (!input) {
        clearSearch();
      } else {
        performSearch(input);
      }
    },
    handleKeyDown: event => {
      const { selectUp, selectDown, clearSearch } = this.state;

      // verificamos a tecla ↑ ↓ tab shift+tab ctrl+j ctrl+k
      switch (event.key) {
        case "ArrowUp":
          selectUp();
          event.preventDefault();
          break;
        case "ArrowDown":
          selectDown();
          event.preventDefault();
          break;
        case "k":
          if (event.ctrlKey) {
            selectUp();
          }
          event.preventDefault();
          break;
        case "j":
          if (event.ctrlKey) {
            selectDown();
          }
          event.preventDefault();
          break;
        case "Tab":
          if (event.shiftKey) {
            selectUp();
          } else {
            selectDown();
          }
          event.preventDefault();
          break;
        case "Escape":
          clearSearch(true);
          event.preventDefault();
          break;
      }
    },
    performSearch: async term => {
      const res = await fetch(
        `https://api.magicthegathering.io/v1/cards?name=${term}`
      );
      const json = await res.json();

      // because magic api has no group feature
      // adding the flatIndex property will come in handy later
      const flatHits = json.cards.map((card, index) => {
        return {
          ...card,
          flatIndex: index
        };
      });

      this.setState({
        flatHits: flatHits,
        hits: groupBy(flatHits, "rarity")
      });
    }
  };

  _listenKey = event => {
    const isCtrlSpace = event.keyCode === 32 && event.ctrlKey;
    if (!isCtrlSpace) {
      return;
    }

    this.state.toggle();
  };

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this._listenKey);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this._listenKey);
  }

  render() {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <SpotlightContext.Provider value={this.state}>
        <Overlay>
          <SearchBar />
          <Hits />
        </Overlay>
      </SpotlightContext.Provider>
    );
  }
}

export default Spotlight;
