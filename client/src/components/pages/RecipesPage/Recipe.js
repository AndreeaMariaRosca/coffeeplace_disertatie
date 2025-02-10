import React from "react";
import {
    Box,
    Flex,
    Text,
    useColorModeValue
} from "@chakra-ui/react";

function Recipe(props) {

    const secondaryBg = useColorModeValue("gray.200", "whiteAlpha.100");
    const mainText = useColorModeValue("#1d1d1d", "whiteAlpha");
    // TODO: add the remaining properties and make this page prettier
    console.log(props)

    return (
        <Flex
            borderRadius="20px"
            bg={secondaryBg}
            h="150px"
            w={{ base: "315px", md: "100%" }}
            direction="column"
            fontFamily="Poppins"
        >
            <Box p="20px">
                <Text fontWeight="600" w="100%" fontSize="2xl" color={mainText}>
                    {props.name}
                </Text>
            </Box>
            <Flex w="100%" p="20px" height="100%">
                <Flex direction="column" flex="1" mr="10px">
                    <Text color={mainText}>{props.description}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Recipe;
