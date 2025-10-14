import React from "react";
import styled from "@emotion/styled";

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 100px);
  grid-template-columns: repeat(3, 120px);
  gap: 20px;
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.06);
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e7ff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.2rem;
  color: #3730a3;
`;

export const SimpleGrid: React.FC = () => {
  return (
    <GridContainer>
      <GridItem>Row 1, Col 1</GridItem>
      <GridItem>Row 1, Col 2</GridItem>
      <GridItem>Row 1, Col 3</GridItem>
      <GridItem>Row 2, Col 1</GridItem>
      <GridItem>Row 2, Col 2</GridItem>
      <GridItem>Row 2, Col 3</GridItem>
    </GridContainer>
  );
};