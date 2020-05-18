<template>
  <div class="p-admin-product">
    <div class="p-admin-product__title">
      <p>Produk</p>
      <ASearchBar
        v-model="filter.search.value"
        class="p-admin-product__search"
        :placeholder="filter.search.placeholder"
        @submit="submit"
      />
    </div>
    <div class="p-admin-product__content">
      <table class="p-admin-product__table">
        <thead>
          <tr>
            <th style="width: 500px">Nama Barang</th>
            <th width="150">Satuan</th>
            <th width="80" class="--action">
              <AButton
                size="small"
                :border="false"
                :disabled="loading || config.action !== null"
                @click="createRow"
              >
                + Buat
              </AButton>
            </th>
          </tr>
        </thead>
        <template v-if="!loading">
          <tbody>
            <tr
              class="p-admin-product__table--create-row"
              v-if="config.action === -1"
            >
              <td style="width: 500px">
                <AInputText
                  v-model="formData.create.name"
                  type="text"
                  min="0"
                />
              </td>
              <td width="150">
                <AInputText
                  v-model="formData.create.unit"
                  type="text"
                  min="0"
                />
              </td>
              <td width="80" class="--action">
                <template v-if="config.action === -1">
                  <AButton
                    :border="false"
                    size="small"
                    @click="saveCreateRow"
                  >
                    <i class="material-icons">save</i>
                  </AButton>
                  <AButton
                    :border="false"
                    size="small"
                    @click="cancelCreateRow"
                  >
                    <i class="material-icons">cancel</i>
                  </AButton>
                </template>
              </td>
            </tr>
            <tr
              class="p-admin-product__table--row"
              v-for="(data, index) in list"
              :key="index"
            >
              <td style="width: 500px">
                <AInputText
                  v-if="config.action === index"
                  v-model="formData.edit.name"
                  type="text"
                  min="0"
                />
                <span v-else>
                  {{ data.name }}
                </span>
              </td>
              <td width="150">
                <AInputText
                  v-if="config.action === index"
                  v-model="formData.edit.unit"
                  type="text"
                  min="0"
                />
                <span v-else>
                  {{ data.unit || '-' }}
                </span>
              </td>
              <td width="80" class="--action">
                <template v-if="config.action === null">
                  <AButton
                    :border="false"
                    size="small"
                    @click="editRow(index)"
                  >
                    <i class="material-icons">edit</i>
                  </AButton>
                  <AButton
                    :border="false"
                    size="small"
                    @click="promptDeleteRow(index)"
                  >
                    <i class="material-icons">delete</i>
                  </AButton>
                </template>
                <template v-if="config.action === index">
                  <AButton
                    :border="false"
                    size="small"
                    @click="saveEditRow(index)"
                  >
                    <i class="material-icons">save</i>
                  </AButton>
                  <AButton
                    :border="false"
                    size="small"
                    @click="cancelEditRow(index)"
                  >
                    <i class="material-icons">cancel</i>
                  </AButton>
                </template>
              </td>
            </tr>
            <tr
              class="p-admin-product__table--create-row"
              v-if="!list.length"
            >
              <td colspan="4" class="text-center">Data kosong</td>
            </tr>
          </tbody>
        </template>
        <TableLoader
          v-else
        />
      </table>
    </div>
  </div>
</template>

<script>
import AInputText from '@/components/atoms/AInputText';
import AButton from '@/components/atoms/AButton';
import ASearchBar from '@/components/atoms/ASearchBar';
import TableLoader from '@/components/molecules/table/Loader';

import swalMixin from '@/mixins/swalMixin';

export default {
  name: 'HospitalSupply',
  mixins: [swalMixin],
  components: {
    AButton,
    AInputText,
    ASearchBar,
    TableLoader,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    config: {
      action: null,
    },
    list: [],
    formData: {
      edit: {
        name: '',
        unit: '',
      },
      create: {
        name: '',
        unit: '',
      },
    },
    filter: {
      search: {
        value: '',
        placeholder: 'Cari pasokan (nama)',
      },
    },
    loading: false,
  }),
  created() {
    this.fetchSupply();
  },
  methods: {
    fetchSupply() {
      this.loading = true;
      const params = {
        search: this.filter.search.value,
      };
      this.$http.get('/product', { params })
        .then(({ data }) => {
          this.loading = false;
          this.list = data.map(this.translateDataFromServer);
        })
        .catch(this.catchHandler);
    },
    editRow(index) {
      this.config.action = index;
      this.formData.edit = {
        name: this.list[index].name,
        unit: this.list[index].unit,
      };
    },
    saveEditRow(index) {
      if (this.validateForm(this.formData.edit)) {
        const productId = this.list[index].id;
        const payload = this.formData.edit;
        this.$http
          .put(`/product/${productId}`, payload)
          .then(({ data }) => {
            this.successHandler('Ubah pasokan berhasil!');
            this.config.action = null;
            this.list[index] = {
              ...this.list[index],
              ...this.translateDataFromServer(data),
            };
          })
          .catch(this.catchHandler);
      }
    },
    cancelEditRow() {
      this.config.action = null;
    },
    promptDeleteRow(index) {
      this.askDelete()
        .then(() => {
          this.deleteRow(index);
        });
    },
    deleteRow(index) {
      const productId = this.list[index].id;
      this.$http
        .delete(`/product/${productId}`)
        .then(() => {
          this.successHandler('Hapus pasokan berhasil!');
          this.list.splice(index, 1);
        })
        .catch(this.catchHandler);
    },
    createRow() {
      this.formData.create = {
        name: '',
        unit: '',
      };
      this.config.action = -1;
    },
    saveCreateRow() {
      if (this.validateForm(this.formData.create)) {
        const payload = {
          name: this.formData.create.name,
          unit: this.formData.create.unit,
        };
        this.$http
          .post('/product', payload)
          .then(({ data }) => {
            this.successHandler('Buat pasokan baru berhasil!');
            this.list.push(this.translateDataFromServer(data));
            this.cancelCreateRow();
          })
          .catch(this.catchHandler);
      }
    },
    cancelCreateRow() {
      this.config.action = null;
    },
    submit() {
      this.fetchSupply();
      this.cancelEditRow();
      this.cancelCreateRow();
    },
    translateDataFromServer(val) {
      return {
        ...val,
        id: val._id,
      };
    },
    validateForm(data) {
      const errorMessages = [];
      if (!data.name) {
        errorMessages.push('Nama barang tidak boleh kosong');
      }
      if (errorMessages.length) this.errorHandler(errorMessages.join('<br>'));
      return !errorMessages.length;
    },
  },
};
</script>

<style lang="scss">
.p-admin-product {
  &__title {
    p {
      font-size: 30px;
      margin-bottom: 10px;
    }
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  &__search {
    font-size: 16px;
  }
  &__table {
    width: 100%;
    font-size: 14px;
    thead {
      th {
        text-align: left;
      }
    }
    tr {
      padding: 0;
      height: 45px;
      .a-input {
        margin: 0;
      }
    }
    .--action {
      width: 300px;
      text-align: right;
    }
  }
  @media (min-width: $sm) {
    &__title {
      p {
        margin-bottom: 0;
      }
      margin-bottom: 20px;
      flex-direction: row;
      justify-content: space-between;
    }
    &__table {
      font-size: 16px;
    }
  }
}
</style>
