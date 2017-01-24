import React from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';

const SearchWrap = styled.label`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  cursor: text;
  & svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
  & label input {
    text-indent: 30px;
  }
`;

const Search = (props) => {
  return (
    <SearchWrap>
      <TextInput
        placeholder="Поиск"
        onChange={ props.search }
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13">
        <path fill="#8F8E94"
              d="M8.003 8.998C7.167 9.628 6.127 10 5 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.127-.373 2.168-1.003 3.004.08.037.155.088.22.153l3.433 3.432c.295.293.298.77.004 1.063-.293.292-.773.288-1.065-.004L8.155 9.217c-.066-.066-.117-.14-.154-.22zM5 9c2.21 0 4-1.79 4-4S7.21 1 5 1 1 2.79 1 5s1.79 4 4 4z"/>
      </svg>
    </SearchWrap>
  )
};

export default Search;