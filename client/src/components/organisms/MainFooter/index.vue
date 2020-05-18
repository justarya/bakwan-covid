<template>
  <div class="o-main-footer">
    <div class="o-main-footer__section --copyright">
      <p class="a-text text-base">
        <span>
          &copy; {{ year }}
        </span>
        <span>
          Bakwan Covid
        </span>
      </p>
    </div>
    <div class="o-main-footer__section --link">
      <span class="text-base">
        <a target="_blank" href="http://github.com/justarya/bakwan-covid">
          Github
        </a>
      </span>
      <span> | </span>
      <span class="text-base">
        <a href="mailto:report.bakwancovid@gmail.com?subject=[REPORT] (subject masalah)">
          Lapor bug?
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainFooter',
  computed: {
    year() {
      const today = new Date();
      return today.getFullYear();
    },
  },
};
</script>

<style lang="scss">
.o-main-footer {
  margin: 30px 25px;
  color: $gray;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__section {
    &.--link {
      text-align: right;
      margin-bottom: 10px;
    }
    .a-text {
      display: flex;
      flex-direction: column;
    }
  }
  @media (min-width: $sm) {
    &__section {
      .a-text {
        display: block;
      }
    }
  }
}
</style>
