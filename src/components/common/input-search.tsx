import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import styled from "styled-components";
import { GREY_CULTURED, GREY_SPANISH } from "../../styles/colors";

interface props {
  value?: string;
  setValue: Function;
  name?: string;
  displayOptions: ISearch;
  handleSelectedValue: Function;
}

export interface ISearch {
  searchTerm: string;
  searchedOptions: {
    value: string;
    label: string;
    coordinates: { lat: string; lon: string };
  }[];
}

const InputContainer = styled(Input)`
  background-color: ${GREY_CULTURED};
  cursor: pointer;
  line-height: 42px;
`;

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
      <InputContainer
        placeholder="Search location"
        bordered={false}
        prefix={<RiSearch2Line style={{ color: `${GREY_SPANISH}` }} />}
      />
    </AutoComplete>
  );
};

export default InputSearch;
