<template>
  <div class="p-admin-create-user">
    <div class="p-admin-create-user__title">
      <p>Buat User</p>
    </div>
    <div class="p-admin-create-user__form">
      <div class="m-form-group">
        <p>Username</p>
        <AInputText
          v-model="formData.username"
        />
      </div>
      <div class="m-form-group">
        <p>Password</p>
        <AInputText
          v-model="formData.password"
          type="password"
        />
      </div>
      <div class="m-form-group">
        <p>Retype Password</p>
        <AInputText
          v-model="formData.repassword"
          type="password"
        />
      </div>
      <AButton
        type="submit"
        @click="createUser"
      >
        Buat
      </AButton>
    </div>
  </div>
</template>

<script>
import AInputText from '@/components/atoms/AInputText';
import AButton from '@/components/atoms/AButton';
import swalMixin from '@/mixins/swalMixin';

export default {
  name: 'adminInfo',
  mixins: [swalMixin],
  components: {
    AInputText,
    AButton,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    formData: {
      username: '',
      password: '',
      repassword: '',
    },
  }),
  methods: {
    reloadPage() {
      this.formData = {
        username: '',
        password: '',
        repassword: '',
      };
    },
    createUser() {
      if (this.validateForm()) {
        this.submitCreateUser();
      }
    },
    submitCreateUser() {
      const payload = {
        username: this.formData.username,
        password: this.formData.password,
      };
      this.$http.post('/user/signup', payload)
        .then(() => {
          this.successHandler('User berhasil terbuat!');
          this.reloadPage();
        })
        .catch(this.catchHandler);
    },
    validateForm() {
      const errorMessages = [];
      if (this.formData.password !== this.formData.repassword) {
        errorMessages.push('Password tidak sama');
      }
      if (this.formData.username === '') {
        errorMessages.push('Username tidak boleh kosong');
      }
      if (this.formData.password === '') {
        errorMessages.push('Password tidak boleh kosong');
      }
      if (this.formData.repassword === '') {
        errorMessages.push('Retype-password tidak boleh kosong');
      }
      if (errorMessages.length) this.errorHandler(errorMessages.join('<br>'));
      return !errorMessages.length;
    },
  },
};
</script>

<style lang="scss">
.p-admin-create-user {
  &__title {
    font-size: 30px;
    margin-bottom: 10px;
  }
  &__form {
    width: 100%;
    max-width: 350px;
  }
}
.m-form-group {
  margin-bottom: 20px;
}
</style>
