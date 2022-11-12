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
    getLore: async (loreName: string) => {
      return callAPIEndpoint({
        endpoint: 'getLore',
        data: { loreName },
      });
    },
    getEvent: async (eventName: string) => {
      return callAPIEndpoint({
        endpoint: 'getEvent',
        data: { eventName },
      });
    },
    getObject: async (name: string) => {
      return callAPIEndpoint({
        endpoint: 'getObject',
        data: { objectName: name },
      });
    },
  };
}
