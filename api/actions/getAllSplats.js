/** @type { ActionRun } */
export const run = async ({ params, logger, api, connections }) => {
  const splatObjs = await api.splats.findMany({
  });
  return splatObjs;
 
};

// define custom params to pass values to your global action
export const params = {
};
/** @type { ActionOptions } */
export const options = { triggers: { api: true } };
