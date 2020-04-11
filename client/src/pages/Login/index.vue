<template>
  <div class="p-login">
    <ACard color="blue" class="p-login__content">
      <AButtonNav go-back icon="chevron_left">
        Back
      </AButtonNav>
      <p class="p-login__title text-3xl">Masuk</p>
      <div class="p-login__form">
        <AInputText placeholder="Username"></AInputText>
        <AInputText type="password" placeholder="Password"></AInputText>
      </div>
      <a-button icon="arrow_forward">Kirim</a-button>
    </ACard>
  </div>
</template>

<script>
import ACard from '@/components/atoms/ACard';
import AButton from '@/components/atoms/AButton';
import AButtonNav from '@/components/atoms/AButtonNav';
import AInputText from '@/components/atoms/AInputText';

export default {
  name: 'Login',
  components: {
    ACard,
    AButton,
    AButtonNav,
    AInputText,
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
