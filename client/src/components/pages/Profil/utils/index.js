import {faker} from "@faker-js/faker";

const generateFakerAvatar = () => faker.image.avatar();
const generateFakerAnimal = () => faker.image.animals();

const generateUnsplashImage = (query) =>
  `https://source.unsplash.com/random/200x200/?${query ?? "avatar"}`;

const generateDiceBearAvataaars = (seed) =>
  `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;

const generateDiceBearBottts = (seed) =>
  `https://avatars.dicebear.com/api/bottts/${seed}.svg`;

const generateDiceBearGridy = (seed) =>
  `https://avatars.dicebear.com/api/gridy/${seed}.svg`;

export {generateFakerAvatar, generateFakerAnimal, generateUnsplashImage, generateDiceBearAvataaars, generateDiceBearBottts, generateDiceBearGridy}
