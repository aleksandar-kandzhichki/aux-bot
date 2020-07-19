import React, { useContext, useEffect } from "react";
import { CommandsContext } from "../context/CommandContext";
import Gallery from "./Gallery";
import Loader from "./Loader";

const Container = ({ searchTerm }) => {
  console.log(useContext(CommandsContext))
  const { availableCommands, searchWatchCommand, loading } = useContext(CommandsContext);
  useEffect(() => {
    searchWatchCommand(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <div className="photo-container">
      {loading ? <Loader /> : <Gallery data={availableCommands} />}
    </div>
  );
};

export default Container;
