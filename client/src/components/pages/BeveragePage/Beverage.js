import React from "react";
import {
    Box,
    Flex,
    Button,
    Text,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Image,
    HStack,
} from "@chakra-ui/react";
import badge1 from '../Profil/utils/badges/badge1.png';
import { addToCart } from "../../../utils/drinksApi";


function Beverage(props) {
    const secondaryBg = useColorModeValue("gray.200", "whiteAlpha.100");
    const mainText = useColorModeValue("#1d1d1d", "whiteAlpha");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAddToCart = async (beverageId) => {
        try {
            // TODO: to add multiple beverages
            await addToCart(beverageId, 'Beverage', 1);
            onClose();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <>
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
                        <Text color={mainText}>{props.price}</Text>
                    </Flex>
                    <div>
                        <Button
                            background='#53589F'
                            color={'white'}
                            _hover={{ bg: '#7A7CC6' }}
                            mr="10px"
                            onClick={onOpen}
                        >
                            Add to cart
                        </Button>
                    </div>
                </Flex>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.name}</ModalHeader>
                    <HStack>

                        <Image
                            src={badge1}
                            boxSize="120px"
                            objectFit="cover"
                        />
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>{props.price}</Text>
                        </ModalBody>
                    </HStack>
                    <ModalBody>
                        <Flex mt="4" justify="space-between">
                            <Button onClick={onClose}>
                                Close
                            </Button>
                            <Button onClick={() => handleAddToCart(props._id)}>
                                Add to cart
                            </Button>
                        </Flex>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
}

export default Beverage;
