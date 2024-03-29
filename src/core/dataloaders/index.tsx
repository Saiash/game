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
    getPerk: async (name: string) => {
      return callAPIEndpoint({
        endpoint: 'getPerk',
        data: { perkName: name },
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
    getScene: async (name: string) => {
      return callAPIEndpoint({
        endpoint: 'getScene',
        data: { sceneName: name },
      });
    },
    getNode: async (name: string) => {
      return callAPIEndpoint({
        endpoint: 'getNode',
        data: { nodeName: name },
      });
    },
  };
}
