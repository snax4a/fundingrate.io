import React, { useEffect, useState } from "react";
import { Button, Input, Box } from "../primitives";
import copy from "clipboard-copy";
import Utils from "./Utils";
import Buttons from "./Buttons.js";

Input.Copy = ({ children, value, ...p }) => {
  const [state, setState] = useState(false);

  const CopyValue = p => {
    setState(true);
    copy(value);
    setTimeout(() => setState(false), 1000);
  };

  return (
    <Input {...p} disabled value={value}>
      {children && <Box mr={2}>{children}</Box> }
      <Button onClick={e => CopyValue(value)} type="success">
        {state ? "Copied!" : "Copy"}
      </Button>
    </Input>
  );
};

Input.Search = ({ onSearch = x => x, ...p }) => {
  const [search, setSearch] = useState("");

  const debouncedSearchTerm = Utils.useDebounce(search, 500);
  useEffect(() => {
    onSearch(search);
  }, [debouncedSearchTerm]);

  return (
    <Input
      {...p}
      placeholder="Search..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
};

Input.SetProviderName = ({ name = "", providerid, onChange, ...p }) => {
  const [state, setState] = useState(name);

  return (
    <Input
      {...p}
      value={state}
      label="Name:"
      placeholder="Please enter a name."
      onChange={e => setState(e.target.value)}
    >
      <Buttons.SetProviderName name={state} providerid={providerid} />
    </Input>
  );
};

Input.SetMakerFee = ({ fee='0.04', providerid, onChange, ...p }) => {
  const [state, setState] = useState(fee);

  return (
    <Input
      {...p}
      value={state}
      label="Maker Fee:"
      placeholder="Percentage fee taken by the maker."
      onChange={e => setState(e.target.value)}
    >
      <Buttons.SetMakerFee fee={state} providerid={providerid} />
    </Input>
  );
};

Input.SetMyUsername = ({ value = "", onChange, ...p }) => {
  const [state, setState] = useState(value);

  return (
    <Input
      {...p}
      value={state}
      label="Username:"
      placeholder="Please enter a username."
      onChange={e => setState(e.target.value)}
    >
      <Buttons.SetMyUsername username={state} />
    </Input>
  );
};

export default Input;
