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
      <AButton
        type="submit"
        @click="saveInfo"
      >
        Simpan
      </AButton>
    </div>
  </div>
</template>

<script>
import AInputText from '@/components/atoms/AInputText';
import AButton from '@/components/atoms/AButton';
import swalMixin from '@/mixins/swalMixin';

export default {
  name: 'HospitalInfo',
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
      name: '',
      email: '',
      contactNumber: '',
      location: '',
    },
  }),
  created() {
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      this.$http.get(`/hospital/${this.id}`)
        .then(({ data }) => {
          this.formData = {
            ...data,
            contactNumber: data.contact_number,
          };
        })
        .catch(this.catchHandler);
    },
    saveInfo() {
      const payload = {
        ...this.formData,
        contact_number: this.formData.contactNumber,
      };
      this.$http.put(`/hospital/${this.id}`, payload)
        .then(() => {
          this.successHandler('Update info berhasil!');
        })
        .catch(this.catchHandler);
    },
  },
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
