import { callAPIEndpoint } from '../../utils';

export function getDataloaders() {
  return {
    getItem: async (name: string) => {
      return callAPIEndpoint({ endpoint: 'getItem', data: { itemName: name } });
    },
    getSkill: async (name: string) => {
      return callAPIEndpoint({
        endpoint: 'getSkill',
        data: { skillName: name },
      });
    },
  };
}
