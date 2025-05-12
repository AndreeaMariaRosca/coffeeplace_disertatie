import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { cleanUserDetails } from '../../utils/storage'

const Header = () => {
    const history = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const logoutClickHandler = () => {
        menuToggleHandler();
        cleanUserDetails();
        history("/coffees");
    };

    const { colorMode, toggleColorMode } = useColorMode()


    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <Link to="/recipes" className={classes.header__content__logo}>
                    caffeology
                </Link>
                <nav
                    className={`${classes.header__content__nav} ${menuOpen && size.width < 768 ? classes.isMenu : ""}`}
                >
                    <ul>
                        <li>
                            <Link to="/profile" onClick={menuToggleHandler}>
                                PROFILE
                            </Link>
                        </li>
                        <li>
                            <Link to="/recipes" onClick={menuToggleHandler}>
                                RECIPES
                            </Link>
                        </li>
                        <li>
                            <Link to="/beverages" onClick={menuToggleHandler}>
                                BEVERAGES
                            </Link>
                        </li>
                        <li>
                            <Link to="/coffees" onClick={menuToggleHandler}>
                                COFFEES
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" onClick={menuToggleHandler}>
                                CART
                            </Link>
                        </li>
                    </ul>
                    <Link to="/">
                        <Button colorScheme='#9F9FED' onClick={logoutClickHandler}>Log out</Button>
                    </Link>
                    <ul></ul>
                    <ul>
                        <li>
                            <IconButton
                                icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                                isRound="true"
                                size="lg"
                                alignSelf="flex-end"
                                onClick={toggleColorMode}
                                color={'white'} _hover={{ bg: '#7A7CC6' }}
                            />
                        </li>

                    </ul>


                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;