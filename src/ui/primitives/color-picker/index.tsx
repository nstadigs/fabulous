import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { borders, borderColor } from "styled-system";
import { StyleProps } from "../../types";
import { Flex } from "rebass";

const Preview = styled.div<StyleProps>`
  display: flex;
  height: 26px;
  border-radius: 3px;
  border: 1px solid gray;
  cursor: pointer;
  flex-grow: 1;
  ${borders}
  ${borderColor}
`;
const PopOver = styled.div`
  position: absolute;
`;

const Blanket = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface Props {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);
  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
    onChange(color.hex);
  };
  const handlePreviewClick = () => setIsOpen(!isOpen);

  return (
    <Flex flex="1">
      <Preview
        borderWidth="1px"
        borderStyle="solid"
        borderColor="textboxBorder"
        style={{ backgroundColor: selectedColor }}
        onClick={handlePreviewClick}
      />
      {isOpen && (
        <Fragment>
          <Blanket onClick={handlePreviewClick} />
          <PopOver>
            <SketchPicker
              color={selectedColor}
              onChangeComplete={handleColorChange}
            />
          </PopOver>
        </Fragment>
      )}
    </Flex>
  );
}