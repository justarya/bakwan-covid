module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_variables/colors.scss";
          @import "@/assets/scss/_variables/screen-size.scss";
        `,
      },
    },
  },
};
