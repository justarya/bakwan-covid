<template>
  <div class="p-hospital-create">
    <div class="p-hospital-create__title">
      <p>Buat Rumah Sakit</p>
    </div>
    <div class="p-hospital-create__form">
      <div class="m-form-group">
        <p>
          Nama
          <i class="text-gray-500">
            (cth: RS Indonesia)
          </i>
        </p>
        <AInputText
          v-model="formData.name"
        />
      </div>
      <div class="m-form-group">
        <p>
          Email
          <i class="text-gray-500">
            (yang bisa dihubungi)
          </i>
        </p>
        <AInputText
          v-model="formData.email"
        />
      </div>
      <div class="m-form-group">
        <p>
          Telepon/Kontak
          <i class="text-gray-500">
            (yang bisa dihubungi)
          </i>
        </p>
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
        @click="create"
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
    this.checkExistingHospital();
  },
  methods: {
    create() {
      const payload = {
        ...this.formData,
        contact_number: this.formData.contactNumber,
      };
      this.$http.post('/hospital', payload)
        .then(() => {
          this.successHandler('Update info berhasil!');
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
}
.m-form-group {
  margin-bottom: 20px;
}
</style>
