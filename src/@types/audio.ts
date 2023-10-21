import {categoriesTypes} from '@utils/audioCategories';

export interface AudiosData {
  id: string;
  title: string;
  about: string;
  category: categoriesTypes;
  file: string;
  poster?: string;
  owner: {
    name: string;
    id: string;
  };
}
