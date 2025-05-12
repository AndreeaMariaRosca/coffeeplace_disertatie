import React from 'react';
import { Text, VStack, HStack, Flex, Image, Tooltip } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { IoMail } from 'react-icons/io5';
import AvatarIcon from './AvatarIcon';
import badge1 from '../Profil/utils/badges/badge1.png';
import badge2 from '../Profil/utils/badges/badge2.png';
import badge3 from '../Profil/utils/badges/badge3.png';

function UserDetails({ user: { username, email } = {} }) {
  return (
    <Flex justify="center" width="100%">
    <VStack className="avatar" spacing={6}>
      <AvatarIcon />
      <Text fontSize="4xl" color="#7A7CC6">{username}</Text>
  
      <HStack className="contact">
        <Icon as={IoMail} w={6} h={6} color="#7A7CC6" />
        <Text fontSize="lg">{email}</Text>
      </HStack>
  
      <HStack spacing={4} mt={4}>
        <Tooltip label="You've created your first coffee recipe!" fontSize="md" hasArrow>
          <Image src={badge1} boxSize="80px" objectFit="cover" />
        </Tooltip>
        <Tooltip label="You've done something cool" fontSize="md" hasArrow>
          <Image src={badge2} boxSize="80px" objectFit="cover" />
        </Tooltip>
        <Tooltip label="I don't know yet what to write here" fontSize="md" hasArrow>
          <Image src={badge3} boxSize="80px" objectFit="cover" />
        </Tooltip>
      </HStack>
    </VStack>
  </Flex>
  
  );
}

export default UserDetails;
