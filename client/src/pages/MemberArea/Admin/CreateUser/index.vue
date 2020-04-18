<template>
  <div class="p-admin-create-user">
    <div class="p-admin-create-user__title">
      <p>Buat User & RS</p>
    </div>
    <div class="p-admin-create-user__form">
      <div class="p-admin-create-user__form--user">
        <p class="text-2xl mb-3">User</p>
        <div class="m-form-group">
          <p>Username</p>
          <AInputText
            v-model="formData.user.username"
          />
        </div>
        <div class="m-form-group">
          <p>Password</p>
          <AInputText
            v-model="formData.user.password"
            type="password"
          />
        </div>
        <div class="m-form-group">
          <p>Retype Password</p>
          <AInputText
            v-model="formData.user.repassword"
            type="password"
          />
        </div>
      </div>
      <div class="p-admin-create-user__form--hospital">
        <p class="text-2xl mb-3">Rumah Sakit</p>
        <FormHospital
          :form-data="formData.hospital"
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
import FormHospital from '@/components/organisms/form/Hospital';
import swalMixin from '@/mixins/swalMixin';

export default {
  name: 'adminInfo',
  mixins: [swalMixin],
  components: {
    AInputText,
    AButton,
    FormHospital,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    formData: {
      user: {
        username: '',
        password: '',
        repassword: '',
      },
      hospital: {
        name: '',
        email: '',
        contactNumbers: [],
        location: '',
      },
    },
  }),
  methods: {
    reloadPage() {
      this.formData = {
        user: {
          username: '',
          password: '',
          repassword: '',
        },
        hospital: {
          name: '',
          email: '',
          contactNumbers: [],
          location: '',
        },
      };
    },
    createUser() {
      if (this.validateForm()) {
        this.submitCreateMember();
      }
    },
    async submitCreateMember() {
      try {
        const payloadUser = {
          username: this.formData.user.username,
          password: this.formData.user.password,
        };
        if (!this.formData.hospital.userId) {
          const { data } = await this.$http.post('/user/signup', payloadUser);
          this.formData.hospital.userId = data._id;
        }
        const contactNumbers = this.formData.hospital.contactNumbers.map((el) => el.value);
        const payloadHospital = {
          ...this.formData.hospital,
          contact_numbers: contactNumbers,
        };
        await this.$http.post('/hospital', payloadHospital);
        this.successHandler('Sukses buat user dan rumah sakit!');
        this.reloadPage();
      } catch (err) {
        this.catchHandler(err);
      }
    },
    validateForm() {
      const errorMessages = [];
      if (this.formData.user.password !== this.formData.user.repassword) {
        errorMessages.push('Password tidak sama');
      }
      if (this.formData.user.username === '') {
        errorMessages.push('Username tidak boleh kosong');
      }
      if (this.formData.user.password === '') {
        errorMessages.push('Password tidak boleh kosong');
      }
      if (this.formData.user.repassword === '') {
        errorMessages.push('Retype-password tidak boleh kosong');
      }
      if (this.formData.hospital.name === '') {
        errorMessages.push('Nama rumah sakit tidak boleh kosong');
      }
      const contactNumbers = this.formData.hospital.contactNumbers
        .map((el) => el.value).join('');
      if (
        !this.formData.hospital.contactNumbers.length
        || !contactNumbers
      ) {
        errorMessages.push('Telepon/Kontak rumah sakit tidak boleh kosong');
      }
      if (this.formData.hospital.location === '') {
        errorMessages.push('Lokasi rumah sakit tidak boleh kosong');
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
