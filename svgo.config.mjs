const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupIds: false,
          removeHiddenElems: false,
          removeUnknownsAndDefaults: {
            keepRoleAttr: true,
          },
          removeUselessDefs: false,
        },
      },
    },
  ],
};

export default svgoConfig;
