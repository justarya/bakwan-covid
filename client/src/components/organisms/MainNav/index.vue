<template>
  <div
    id="clickbox"
    class="o-main-nav"
  >
    <div class="o-main-nav__brand">
      <p class="a-text o-main-nav__title">
        Bakwan<b>Covid</b>
      </p>
      <button
        class="o-main-nav__menu-button"
        @click="toggleMenu"
      >
        <i class="material-icons">menu</i>
      </button>
    </div>
    <div
      class="o-main-nav__menu"
      v-if="window.width > 640 || menu.show"
    >
      <AButtonNav
        class="mr-2"
        href="https://forms.gle/QibTRX2h66zQVkqz8"
        target="_blank"
      >
        Buat Akun RS?
      </AButtonNav>
      <AButtonNav
        icon="keyboard_arrow_right"
        icon-position="right"
        :to="{ name: 'Login' }"
      >
        <span v-if="$store.state.isLogin">
          Dashboard
        </span>
        <span v-else>
          Masuk
        </span>
      </AButtonNav>
    </div>
  </div>
</template>

<script>
import AButtonNav from '@/components/atoms/AButtonNav';

export default {
  name: 'MainNav',
  components: {
    AButtonNav,
  },
  data: () => ({
    menu: {
      show: false,
    },
    window: {
      width: 0,
    },
  }),
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      window.addEventListener('click', this.closeMenu);
    });
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('click', this.closeMenu);
  },
  methods: {
    toggleMenu() {
      this.menu.show = !this.menu.show;
    },
    closeMenu(e) {
      if (!document.getElementById('clickbox').contains(e.target)) {
        this.menu.show = false;
      }
    },
    onResize() {
      this.window.width = window.innerWidth;
    },
  },
};
</script>

<style lang="scss">
.o-main-nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 25px;
  position: relative;
  &__brand {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: 25px;
    line-height: 1.25;
  }
  &__subtitle {
    text-align: center;
    color: #88959a;
    font-size: 14px;
    font-style: italic;
    line-height: 1.25;
  }
  &__menu {
    position: absolute;
    transform: translateY(100%);
    bottom: 0;

    padding: 0;
    padding-bottom: 20px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    background-color: white;
    box-shadow: 0 9px 12px rgba(179, 198, 222, 0.35);
  }
  @media (min-width: $sm) {
    margin-top: 30px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    &__brand {
      width: auto;
    }
    &__title {
      font-size: 35px;
    }
    &__subtitle {
      text-align: left;
    }
    &__menu {
      position: unset;
      transform: none;
      box-shadow: none;
      padding-bottom: 0;
      justify-content: flex-end;
      &-button {
        display: none;
      }
    }
  }
}
</style>
