import React, { useState } from "react";
import { AutoComplete } from "antd";

interface props {
  value?: string;
  setValue?: Function;
  name?: string;
}
const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});
const InputSearch = (props: props) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const handleInput = (data: string): void => {
    if (props.setValue)
      props.setValue({
        name: props.name,
        value: data,
      });
  };

  const onSearch = (searchText: string) => {
    console.log("SEARCH THIS LOCATION: ", searchText);
  };

  const onSelect = (data: string) => {
    //send this value
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    console.log("ON change", data);
    setOptions(
      !data ? [] : [mockVal(data), mockVal(data, 2), mockVal(data, 3)]
    );
    setValue(data);
  };

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder="Search location"
    />
  );
};

export default InputSearch;
