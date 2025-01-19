/** @type { ActionRun } */
export const run = async ({ params, logger, api, connections }) => {
  const { splat_id } = params;
  try {
    const splatObj = await api.splats.findOne(splat_id)
    
    return [splatObj];
  }
  catch {
    return null;
  }
};

// define custom params to pass values to your global action
export const params = {
  splat_id: { type: "number" },
};
/** @type { ActionOptions } */
export const options = { triggers: { api: true } };
