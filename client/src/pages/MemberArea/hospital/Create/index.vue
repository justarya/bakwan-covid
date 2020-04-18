<template>
  <div class="p-hospital-create">
    <div class="p-hospital-create__banner">
      <p class="text-xl font-bold">Selamat datang di Bakwan Covid!</p>
      <p>Satu langkah lagi, kamu bisa menggunakan sistem ini!</p>
    </div>
    <div class="p-hospital-create__title">
      <p>Buat Rumah Sakit</p>
    </div>
    <div class="p-hospital-create__form">
      <FormHospital
        :form-data="formData"
      />
      <AButton
        type="submit"
        @click="create"
      >
        Buat
      </AButton>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/AButton';
import FormHospital from '@/components/organisms/form/Hospital';
import swalMixin from '@/mixins/swalMixin';

export default {
  name: 'HospitalInfo',
  mixins: [swalMixin],
  components: {
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
      name: '',
      email: '',
      contactNumbers: [],
      location: '',
    },
  }),
  created() {
    this.checkExistingHospital();
  },
  methods: {
    create() {
      const payload = {
        ...this.formData,
        contact_numbers: this.formData.contactNumbers,
      };
      this.$http.post('/hospital', payload)
        .then(() => {
          this.successHandler('Buat rumah sakit berhasil!');
          return this.$store.dispatch('checkLogin');
        })
        .then(() => {
          this.$router.replace({ name: 'MemberArea' });
        })
        .catch(this.catchHandler);
    },
    checkExistingHospital() {
      if (this.$store.state.user.hospitals.length) {
        this.$router.replace({ name: 'MemberArea' });
      }
    },
  },
};
</script>

<style lang="scss">
.p-hospital-create {
  &__title {
    font-size: 30px;
    margin-bottom: 10px;
  }
  &__form {
    width: 100%;
    max-width: 350px;
  }
  &__banner {
    padding: 20px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: $dark-blue;
    background-color: $light-blue;
  }
}
.m-form-group {
  margin-bottom: 20px;
}
</style>
