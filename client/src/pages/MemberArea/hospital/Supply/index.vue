<template>
  <div class="p-hospital-supply">
    <div class="p-hospital-supply__title">
      <p>Pasokan</p>
      <ASearchBar
        v-model="filter.search.value"
        class="p-hospital-supply__search"
        :placeholder="filter.search.placeholder"
        @submit="submit"
      />
    </div>
    <div class="p-hospital-supply__content">
      <table class="p-hospital-supply__table">
        <thead>
          <tr>
            <th style="width: 500px">Nama Barang</th>
            <th width="80">Butuh</th>
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
              class="p-hospital-supply__table--create-row"
              v-if="config.action === -1"
            >
              <td style="width: 500px">
                <v-select
                  v-model="formData.create.product"
                  :searchable="true"
                  :filterable="true"
                  :options="config.product.options"
                  @search="fetchProductOptions"
                >
                  <template #no-options="{ search }">
                    <template v-if="!search">
                      Silahkan ketik nama barang
                    </template>
                    <template v-else>
                      Kata kunci "{{ search }}" tidak ditemukan
                    </template>
                  </template>
                </v-select>
              </td>
              <td width="80">
                <AInputText
                  v-model="formData.create.demand"
                  type="number"
                  min="0"
                />
              </td>
              <td width="150">
                {{
                  formData.create.product && formData.create.product.unit
                  ? formData.create.product.unit
                  : ''
                }}
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
              class="p-hospital-supply__table--row"
              v-for="(data, index) in list"
              :key="index"
            >
              <td style="width: 500px">
                <span>
                  {{ data.product ? data.product.name : data.product_name }}
                </span>
              </td>
              <td width="80">
                <AInputText
                  v-if="config.action === index"
                  v-model="formData.edit.demand"
                  type="number"
                  min="0"
                />
                <span v-else>
                  {{ data.demand }}
                </span>
              </td>
              <td width="150">
                <span v-if="config.action === index">
                  {{
                    formData.edit.product && formData.edit.product.unit
                      ? formData.edit.product.unit || '-'
                      : '-'
                  }}
                </span>
                <span v-else>
                  {{ data.product ? data.product.unit || '-' : '-' }}
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
              class="p-hospital-supply__table--create-row"
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
      product: {
        options: [],
      },
    },
    list: [],
    formData: {
      edit: {
        product: {},
        demand: '',
      },
      create: {
        product: {},
        demand: '',
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
    this.fetchProductOptions();
  },
  methods: {
    fetchSupply() {
      this.loading = true;
      const params = {
        search: this.filter.search.value,
      };
      this.$http.get(`/hospital/${this.id}/supplies`, { params })
        .then(({ data }) => {
          this.loading = false;
          this.list = data.map(this.translateDataFromServer);
        })
        .catch(this.catchHandler);
    },
    fetchProductOptions(search) {
      const params = {
        search,
      };
      this.$http.get('/product', { params })
        .then(({ data }) => {
          this.config.product.options = data.map((el) => ({
            label: el.name,
            value: el._id,
            unit: el.unit,
          }));
        })
        .catch(this.catchHandler);
    },
    editRow(index) {
      this.config.action = index;
      this.formData.edit = {
        demand: this.list[index].demand,
      };
      if (this.list[index].product) {
        this.formData.edit = {
          ...this.formData.edit,
          product: {
            label: this.list[index].product.name,
            value: this.list[index].product._id,
            unit: this.list[index].product.unit,
          },
        };
      } else {
        this.formData.edit = {
          ...this.formData.edit,
          product: {
            label: '',
            value: '',
            unit: '',
          },
        };
      }
    },
    saveEditRow(index) {
      if (this.validateForm(this.formData.edit)) {
        const supplyId = this.list[index].id;
        const payload = {
          ...this.formData.edit,
          productId: this.formData.edit.product.value,
        };
        this.$http
          .put(`/hospital/${this.id}/supplies/${supplyId}`, payload)
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
      const supplyId = this.list[index].id;
      this.$http
        .delete(`/hospital/${this.id}/supplies/${supplyId}`)
        .then(() => {
          this.successHandler('Hapus pasokan berhasil!');
          this.list.splice(index, 1);
        })
        .catch(this.catchHandler);
    },
    createRow() {
      this.formData.create = {
        product: {},
        demand: 0,
      };
      this.config.action = -1;
    },
    saveCreateRow() {
      if (this.validateForm(this.formData.create)) {
        const payload = {
          demand: this.formData.create.demand,
          productId: this.formData.create.product.value,
        };
        this.$http
          .post(`/hospital/${this.id}/supplies/`, payload)
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
        product_name: val.product_name,
        product: val.product,
      };
    },
    validateForm(data) {
      const errorMessages = [];
      if (!(data.product && data.product.value)) {
        errorMessages.push('Produk harus diisi');
      }
      if (!data.demand) {
        errorMessages.push('Demand wajib diisi');
      }
      if (errorMessages.length) this.errorHandler(errorMessages.join('<br>'));
      return !errorMessages.length;
    },
  },
};
</script>

<style lang="scss">
.p-hospital-supply {
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
