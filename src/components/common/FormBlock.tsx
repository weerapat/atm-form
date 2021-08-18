import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

interface IFormBlock {
  heading: string,
}

const FormBlock: React.FC<IFormBlock> = ({
  heading,
  children,
}) => (
  <Flex width="full" justifyContent="center">
    <Box p={8} width="full" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Box mb={4} textAlign="center">
        <Heading>{heading}</Heading>
      </Box>
      {children}
    </Box>
  </Flex>
);

export default FormBlock;
