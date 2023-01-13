import React, { useState } from "react";
import { AutoComplete, Input } from "antd";

interface props {
  value?: string;
  setValue: Function;
  name?: string;
  displayOptions: ISearch;
  handleSelectedValue: Function;
}

export interface ISearch {
  searchTerm: string;
  searchedOptions: { value: string; label: string; coordinates: {lat: string, lon: string} }[];
}

const InputSearch = (props: props) => {
  const onSearch = (data: string): void => {
    if (props.setValue)
      props.setValue({
        value: data,
      });
  };

  const onSelect = (data: string, selectedOption: any) => {
    if (props.handleSelectedValue) props.handleSelectedValue(selectedOption);
  };

  return (
    <AutoComplete
      value={props.displayOptions.searchTerm}
      options={props.displayOptions.searchedOptions}
      style={{ width: 300 }}
      onSelect={onSelect}
      onSearch={onSearch}
    >
      <Input.Search placeholder="Search location" />
    </AutoComplete>
  );
};

export default InputSearch;
