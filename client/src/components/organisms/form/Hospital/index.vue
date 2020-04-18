<template>
  <div class="o-form-hospital">
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
      <div
        class="o-form-hospital__contact-number"
        v-for="(data, index) in formData.contactNumbers"
        :key="index"
      >
        <AInputText
          v-model="data.value"
          placeholder="cth: 0812345567 (Nama PIC)"
        />
        <AButton
          size="small"
          :border="false"
          icon="delete"
          icon-position="left"
          @click="deleteRow(index)"
        >
        </AButton>
      </div>
      <AButton
        size="small"
        :border="false"
        @click="createRow"
      >
        + Tambah kontak
      </AButton>
    </div>
    <div class="m-form-group">
      <p class="mb-2">
        Lokasi / Alamat Lengkap
      </p>
      <AInputText
        v-model="formData.location"
        type="textarea"
        rows="4"
      />
    </div>
  </div>
</template>

<script>
import AInputText from '@/components/atoms/AInputText';
import AButton from '@/components/atoms/AButton';

export default {
  name: 'FormHospital',
  components: {
    AInputText,
    AButton,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({
        name: '',
        email: '',
        contactNumbers: [
          {
            value: '',
          },
        ],
        location: '',
      }),
    },
  },
  methods: {
    createRow() {
      this.formData.contactNumbers.push({
        value: '',
      });
    },
    deleteRow(index) {
      this.formData.contactNumbers.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.o-form-hospital {
  &__contact-number {
    display: flex;
    align-items: flex-start;
    .a-input {
      margin-right: 10px;
    }
    .a-button {
      height: 30px;
      display: inline-block;
    }
  }
}
</style>
