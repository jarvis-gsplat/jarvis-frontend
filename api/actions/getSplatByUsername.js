/** @type { ActionRun } */
export const run = async ({ params, logger, api, connections }) => {
  const { username } = params;
  const splatObjs = await api.splats.findMany({
    filter: {
      username: { equals: username}
    }
  });
  return splatObjs;
 
};

// define custom params to pass values to your global action
export const params = {
  username: { type: "string" },
};
/** @type { ActionOptions } */
export const options = { triggers: { api: true } };
