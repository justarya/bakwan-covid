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
            <th width="500">Nama Barang</th>
            <th width="80">Butuh</th>
            <th width="150">Satuan</th>
            <th width="80" class="--action">
              <AButton
                size="small"
                :border="false"
                :disabled="config.action !== null"
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
              <td width="500">
                <AInputText
                  v-model="formData.create.name"
                />
              </td>
              <td width="80">
                <AInputText
                  v-model="formData.create.demand"
                  type="number"
                  min="0"
                />
              </td>
              <td width="150">
                <select
                  class="a-input"
                  v-model="formData.create.demandUnit"
                >
                  <option
                    v-for="(data, index) in config.demandUnit.list"
                    :value="data.value"
                    :key="index"
                  >
                    {{ data.label }}
                  </option>
                </select>
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
              <td width="500">
                <AInputText
                  v-if="config.action === index"
                  v-model="formData.edit.name"
                />
                <span v-else>
                  {{ data.name }}
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
                <select
                  class="a-input"
                  v-if="config.action === index"
                  v-model="formData.edit.demandUnit"
                >
                  <option
                    v-for="(unit, index) in config.demandUnit.list"
                    :value="unit.value"
                    :key="index"
                  >
                    {{ unit.label }}
                  </option>
                </select>
                <span v-else>
                  {{ getDemandUnitLabel(data.demandUnit) }}
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
      demandUnit: {
        list: [
          {
            value: '',
            label: '-',
          },
          {
            value: 'kg',
            label: 'Kilogram',
          },
          {
            value: 'L',
            label: 'Liter',
          },
        ],
      },
    },
    list: [],
    formData: {
      edit: {
        name: '',
        demandUnit: '',
        demand: '',
      },
      create: {
        name: '',
        demandUnit: '',
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
    editRow(index) {
      this.config.action = index;
      this.formData.edit = {
        name: this.list[index].name,
        demandUnit: this.list[index].demandUnit,
        demand: this.list[index].demand,
      };
    },
    saveEditRow(index) {
      const supplyId = this.list[index].id;
      const payload = {
        ...this.formData.edit,
        product_name: this.formData.edit.name,
        demand_unit: this.formData.edit.demandUnit,
      };
      this.$http
        .put(`/hospital/${this.id}/supplies/${supplyId}`, payload)
        .then(() => {
          this.successHandler('Ubah pasokan berhasil!');
          this.config.action = null;
          this.list[index] = {
            ...this.list[index],
            ...this.formData.edit,
          };
        })
        .catch(this.catchHandler);
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
        name: '',
        demandUnit: '',
        demand: 0,
      };
      this.config.action = -1;
    },
    saveCreateRow() {
      const payload = {
        ...this.formData.create,
        product_name: this.formData.create.name,
        demand_unit: this.formData.edit.demandUnit,
      };
      this.$http
        .post(`/hospital/${this.id}/supplies/`, payload)
        .then(({ data }) => {
          this.successHandler('Buat pasokan baru berhasil!');
          this.list.push(this.translateDataFromServer(data));
          this.cancelCreateRow();
        })
        .catch(this.catchHandler);
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
        name: val.product_name,
        demandUnit: val.demand_unit || '',
      };
    },
    getDemandUnitLabel(data) {
      const demandUnit = this.config.demandUnit.list
        .find((el) => el.value === data);
      if (demandUnit !== undefined) return demandUnit.label;
      return '';
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
