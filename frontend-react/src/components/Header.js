import React, { useContext, useEffect } from "react";
import ListCommands from "./Commands/ListCommands";
import ListActions from "./Commands/ListActions";
import Form from "./Form";
import { CommandsContext } from "../context/CommandContext";

const Header = ({ history, handleSubmit, commandName }) => {
  const { setCurrentCommand } = useContext(CommandsContext);
  useEffect(() => {
    setCurrentCommand(commandName);
  }, [commandName])

  return (
    <div>
      <h1>{(!!commandName && commandName === "all") ? "Commands" : ("Command" + commandName)}</h1>
      {/* <Form history={history} handleSubmit={handleSubmit} /> */}
      <ListCommands></ListCommands>
      {commandName != "all" ? <ListActions commandName={commandName}></ListActions> : ''}
      {/* <Navigation /> */}
    </div>
  );
};

export default Header;
