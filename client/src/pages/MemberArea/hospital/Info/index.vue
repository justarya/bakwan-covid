<template>
  <div class="p-hospital-info">
    <div class="p-hospital-info__title">
      <p>Informasi</p>
    </div>
    <div class="p-hospital-info__form">
      <FormHospital
        :form-data="formData"
      />
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
    this.fetchInfo();
  },
  methods: {
    fetchInfo() {
      this.$http.get(`/hospital/${this.id}`)
        .then(({ data }) => {
          const contactNumbers = data.contact_numbers.map((el) => ({ value: el }));
          this.formData = {
            ...data,
            contactNumbers,
          };
        })
        .catch(this.catchHandler);
    },
    saveInfo() {
      const contactNumbers = this.formData.contactNumbers.map((el) => el.value);
      const payload = {
        ...this.formData,
        contact_numbers: contactNumbers,
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
