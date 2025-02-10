import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Select,
    HStack,
    Spacer,
    Text
} from '@chakra-ui/react';
import { getUserId } from "../../../../utils/storage";
import axios from 'axios'

export const FillForm = (props) => {
    const [formValues, setFormValues] = React.useState({
        sign: { text: '', value: 0 },
        type: { text: '', value: 0 },
        season: { text: '', value: 0 },
        genre: { text: '', value: 0 },
        color: { text: '', value: 0 },
        sex: { text: '', value: 0 }
    });
    
    const apiURL = 'http://localhost:8080/api';
    const getPersonalityCoffeeFromScore = async(score) => {
        try {
            let response = await axios.get(`${apiURL}/personalityCoffee/${score}`)
            return response;
          } catch (err) {
            console.warn(err)
          }
    };

    const onAdd = async (e) => {
        console.log('in onadd');
        e.preventDefault();

        const score = calculateTotalScore();

        const form = {
            ...Object.fromEntries(
                Object.entries(formValues).map(([key, val]) => [key, val.textValue])
            ),
            id: getUserId(),
            score: score
        };
        console.log(`form=${JSON.stringify(form)}`);
        const personalityCoffee = await getPersonalityCoffeeFromScore(score);
        const userRecipe = {
            userID: getUserId(),
            personalityCoffeeID: personalityCoffee.data._id
        }
        console.log(`personalityCoffee = ${JSON.stringify(personalityCoffee)}`);

        await props.onAdd(form, userRecipe, personalityCoffee);
        props.onClose();
    };

    const handleChange = (e, fieldName) => {
        const selectedOption = e.target.selectedOptions[0];
        const selectedValue = selectedOption.value;
        const numericValue = parseInt(selectedOption.dataset.value, 10) || 0;

        setFormValues((prev) => ({
            ...prev,
            [fieldName]: {
                textValue: selectedValue,
                numericValue: numericValue,
            },
        }));
    };

    const calculateTotalScore = () => {
        return Object.values(formValues).reduce((sum, field) => sum + field.numericValue, 0);
    };

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={props.isOpen}
            onClose={props.onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="modal-form" fontSize="3xl">
                    Share your personality
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mt={4} isRequired>
                        {/* Zodiac Sign */}
                        <FormLabel>Zodiac sign:</FormLabel>
                        <Select
                            size="md"
                            value={formValues.sign.text}
                            onChange={(e) => handleChange(e, 'sign')}
                        >
                            <option value="" data-value="0">-</option>
                            <option value="aries" data-value="5">Aries</option>
                            <option value="taurus" data-value="4">Taurus</option>
                            <option value="gemini" data-value="3">Gemini</option>
                            <option value="cancer" data-value="20">Cancer</option>
                            <option value="leo" data-value="1">Leo</option>
                            <option value="virgo" data-value="6">Virgo</option>
                            <option value="libra" data-value="7">Libra</option>
                            <option value="scorpio" data-value="8">Scorpio</option>
                            <option value="sagittarius" data-value="30">Sagittarius</option>
                            <option value="capricornus" data-value="10">Capricornus</option>
                            <option value="aquarius" data-value="11">Aquarius</option>
                            <option value="pisces" data-value="35">Pisces</option>
                        </Select>

                        {/* Morning or Night */}
                        <FormLabel>Morning or night person?</FormLabel>
                        <Select
                            size="md"
                            value={formValues.type.text}
                            onChange={(e) => handleChange(e, 'type')}
                        >
                            <option value="" data-value="0">-</option>
                            <option value="morning" data-value="10">Morning</option>
                            <option value="night" data-value="5">Night</option>
                        </Select>

                        {/* Season */}
                        <FormLabel>Favourite season:</FormLabel>
                        <Select
                            size="md"
                            value={formValues.season.text}
                            onChange={(e) => handleChange(e, 'season')}
                        >
                            <option value="" data-value="0">-</option>
                            <option value="spring" data-value="10">Spring</option>
                            <option value="summer" data-value="20">Summer</option>
                            <option value="autumn" data-value="10">Autumn</option>
                            <option value="winter" data-value="15">Winter</option>
                        </Select>

                        {/* Movie Genre and Color */}
                        <HStack spacing="24px">
                            <FormLabel>Go-to movie genre:</FormLabel>
                            <FormLabel>Favourite color:</FormLabel>
                        </HStack>
                        <HStack spacing="24px">
                            <Select
                                size="md"
                                value={formValues.genre.text}
                                onChange={(e) => handleChange(e, 'genre')}
                            >
                                <option value="" data-value="0">-</option>
                                <option value="action" data-value="10">Action</option>
                                <option value="comedy" data-value="20">Comedy</option>
                                <option value="romance" data-value="10">Romance</option>
                                <option value="drama" data-value="40">Drama</option>
                                <option value="horror" data-value="5">Horror</option>
                            </Select>

                            <Select
                                size="md"
                                value={formValues.color.text}
                                onChange={(e) => handleChange(e, 'color')}
                            >
                                <option value="" data-value="0">-</option>
                                <option value="red" data-value="5">Red</option>
                                <option value="blue" data-value="5">Blue</option>
                                <option value="green" data-value="5">Green</option>
                                <option value="yellow" data-value="15">Yellow</option>
                                <option value="black" data-value="10">Black</option>
                            </Select>
                        </HStack>

                        {/* Gender */}
                        <FormLabel>Your gender:</FormLabel>
                        <Select
                            size="md"
                            value={formValues.sex.text}
                            onChange={(e) => handleChange(e, 'sex')}
                        >
                            <option value="" data-value="0">-</option>
                            <option value="woman" data-value="10">Woman</option>
                            <option value="man" data-value="10">Man</option>
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Spacer />
                    <Button
                        background="#555AA1"
                        color="white"
                        _hover={{ bg: '#7A7CC6' }}
                        mr={3}
                        onClick={onAdd}
                    >
                        Save
                    </Button>
                    <Button onClick={props.onClose}>Exit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
