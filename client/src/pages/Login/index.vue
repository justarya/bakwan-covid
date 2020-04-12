<template>
  <div class="p-login">
    <ACard color="blue" class="p-login__content">
      <AButtonNav go-back icon="chevron_left">
        Back
      </AButtonNav>
      <p class="p-login__title text-3xl">Masuk</p>
      <form @submit.prevent="login">
        <div class="p-login__form">
          <AInputText
            v-model="formData.username"
            placeholder="Username"
          />
          <AInputText
            v-model="formData.password"
            type="password"
            placeholder="Password"
          />
        </div>
        <a-button
          type="submit"
          icon="arrow_forward"
          @click="login"
        >
          Kirim
        </a-button>
      </form>
    </ACard>
  </div>
</template>

<script>
import ACard from '@/components/atoms/ACard';
import AButton from '@/components/atoms/AButton';
import AButtonNav from '@/components/atoms/AButtonNav';
import AInputText from '@/components/atoms/AInputText';

import swalMixin from '@/mixins/swalMixin';

export default {
  name: 'Login',
  mixins: [swalMixin],
  components: {
    ACard,
    AButton,
    AButtonNav,
    AInputText,
  },
  data: () => ({
    formData: {
      username: '',
      password: '',
    },
  }),
  methods: {
    login() {
      this.$store.dispatch('login', this.formData)
        .then(() => {
          this.$router.push({ name: 'MemberArea' });
        })
        .catch(this.catchHandler);
    },
  },
};
</script>

<style lang="scss">
.p-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  &__content {
    padding: 40px;
    width: 100%;
    max-width: 500px;
  }
  &__title {
    color: $blue;
    font-weight: 500;
    margin-bottom: 10px;
  }
  &__form {
    margin-bottom: 25px;
  }
}
</style>
