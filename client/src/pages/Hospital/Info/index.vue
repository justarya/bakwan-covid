<template>
  <div class="p-hospital-info">
    <div class="p-hospital-info__title">
      <p>Informasi</p>
    </div>
    <div class="p-hospital-info__form">
      <div class="m-form-group">
        <p>Nama</p>
        <AInputText
          v-model="formData.name"
        />
      </div>
      <div class="m-form-group">
        <p>Email</p>
        <AInputText
          v-model="formData.email"
        />
      </div>
      <div class="m-form-group">
        <p>Telepon/Kontak</p>
        <AInputText
          v-model="formData.contactNumber"
        />
      </div>
      <div class="m-form-group">
        <p class="mb-2">Lokasi</p>
        <AInputText
          v-model="formData.location"
          type="textarea"
          rows="4"
        />
      </div>
      <AButton>
        Simpan
      </AButton>
    </div>
  </div>
</template>

<script>
import AInputText from '@/components/atoms/AInputText';
import AButton from '@/components/atoms/AButton';

export default {
  name: 'HospitalInfo',
  components: {
    AInputText,
    AButton,
  },
  data: () => ({
    formData: {
      name: '',
      email: '',
      contactNumber: '',
      location: '',
    },
  }),
};
</script>

<style lang="scss">
.p-hospital-info {
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
